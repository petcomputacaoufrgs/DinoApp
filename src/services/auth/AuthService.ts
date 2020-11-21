import GoogleAuthRequestModel from '../../types/auth/google/GoogleAuthRequestModel'
import HttpStatus from 'http-status-codes'
import DinoAPIURLConstants from '../../constants/dino_api/DinoAPIURLConstants'
import AuthLocalStorage from '../../local_storage/auth/AuthLocalStorage'
import AuthResponseModel from '../../types/auth/AuthResponseModel'
import GoogleAuthScopes from '../../constants/google/GoogleAuthScopes'
import LoginStatusConstants from '../../constants/login/LoginErrorConstants'
import UserService from '../user/UserService'
import DinoAgentService from '../../agent/DinoAgentService'
import EventService from '../events/EventService'
import LogAppErrorService from '../log_app_error/LogAppErrorService'
import WebSocketAuthResponseModel from '../../types/auth/web_socket/WebSocketAuthResponseModel'
import GoogleOAuth2Service from './google/GoogleOAuth2Service'
import GoogleOAuth2ContextType from '../../types/context_provider/GoogleOAuth2ContextType'

class AuthService {
  cleanLoginGarbage = () => {
    AuthLocalStorage.cleanLoginGarbage()
  }

  getDefaultScopes = (): string => {
    return GoogleAuthScopes.SCOPE_PROFILE
  }

  requestGoogleLogin = async (googleAuth2: GoogleOAuth2ContextType): Promise<number> => {
    try {
      const response = await GoogleOAuth2Service.requestLogin(googleAuth2)
      return this.completeLoginWithDinoAPI(response)
    } catch (e) {
      return LoginStatusConstants.LOGIN_CANCELED
    }
  }

  requestGoogleGrant = async (googleAuth2: GoogleOAuth2ContextType): Promise<number> => {
    try {
      const authCode = await GoogleOAuth2Service.requestLogin(googleAuth2)
      return this.completeLoginWithDinoAPI(authCode)
    } catch (e) {
      return LoginStatusConstants.LOGIN_CANCELED
    }
  }

  requestWebSocketAuthToken = async (): Promise<
    WebSocketAuthResponseModel | undefined
  > => {
    const request = await DinoAgentService.get(
      DinoAPIURLConstants.WEB_SOCKET_AUTH
    )
    if (request.canGo) {
      try {
        const response = await request.authenticate().go()
        return response.body
      } catch (e) {
        LogAppErrorService.saveError(e)
      }
    } else {
      return undefined
    }
  }

  googleLogout = () => {
    const authToken = this.getAuthToken()

    this.serverLogout(authToken)

    GoogleOAuth2Service.requestLogout()

    EventService.whenLogout()
  }

  serverLogout = async (authToken: string): Promise<boolean> => {
    try {
      const request = await DinoAgentService.put(DinoAPIURLConstants.LOGOUT)

      if (request.canGo) {
        await request.authenticate().go()

        return true
      }
    } catch (e) {
      LogAppErrorService.saveError(e)
    }

    return false
  }

  isAuthenticated = (): boolean => Boolean(AuthLocalStorage.getAuthToken())

  getGoogleAccessToken = (): string | null => {
    return GoogleOAuth2Service.getAccessToken()
  }

  getAuthToken = (): string => {
    return AuthLocalStorage.getAuthToken()
  }

  setAuthToken = (token: string) => {
    AuthLocalStorage.setAuthToken(token)
  }

  getAuthTokenExpiresDate = (): number =>
    AuthLocalStorage.getAuthTokenExpiresDate()

  setAuthTokenExpiresDate = (authTokenExpiresDate: number) => {
    AuthLocalStorage.setAuthTokenExpiresDate(authTokenExpiresDate)
  }

  removeUserData = () => {
    AuthLocalStorage.removeUserData()
  }

  isRefreshingAccessToken = (): boolean =>
    AuthLocalStorage.isRefreshingAccessToken()

  startRefreshingAccessToken = () => {
    AuthLocalStorage.removeSuccessRefreshingAccessToken()
    AuthLocalStorage.setRefreshingAccessToken(true)
  }

  successRefreshingAccessToken = (): boolean => {
    return AuthLocalStorage.successRefreshingAccessToken()
  }

  stopRefreshingAccessToken = (success: boolean) => {
    AuthLocalStorage.setSuccessRefreshingAccessToken(success)
    AuthLocalStorage.setRefreshingAccessToken(false)
  }

  private completeLoginWithDinoAPI = async (
    googleResponse: any
  ): Promise<number> => {
    if (googleResponse) {
      const authRequestModel = new GoogleAuthRequestModel(googleResponse)

      try {
        const request = await DinoAgentService.post(
          DinoAPIURLConstants.AUTH_GOOGLE
        )

        if (request.canGo) {  
          const response = await request.setBody(authRequestModel).go()

          if (response.status === HttpStatus.OK) {
            return this.handleLoginSuccess(response)
          }

          if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            return LoginStatusConstants.UNKNOW_API_ERROR
          }
        }

        return LoginStatusConstants.DISCONNECTED
      } catch (e) {
        LogAppErrorService.saveError(e)
        return LoginStatusConstants.UNKNOW_ERROR
      }
    }

    return LoginStatusConstants.EXTERNAL_SERVICE_ERROR
  }

  private handleLoginSuccess = (apiResponse): number => {
    AuthLocalStorage.cleanLoginGarbage()

    this.saveUserDataFromAPIResponse(apiResponse.body)

    EventService.whenLogin()

    return LoginStatusConstants.SUCCESS
  }

  private saveUserDataFromAPIResponse(response: AuthResponseModel) {
    AuthLocalStorage.setAuthToken(response.accessToken)
    AuthLocalStorage.setAuthTokenExpiresDate(response.expiresDate)
    UserService.saveUserDataFromModel(response.user)
  }
}

export default new AuthService()
