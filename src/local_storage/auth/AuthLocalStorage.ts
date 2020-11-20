import BaseLocalStorage from '../BaseLocalStorage'
import LS_Constants from '../../constants/local_storage/LocalStorageKeysConstants'

class AuthLocalStorage extends BaseLocalStorage {
  getAuthToken = (): string => {
    const authToken = this.get(LS_Constants.AUTH_TOKEN)

    return this.convertStringOrNullToString(authToken)
  }

  setAuthToken = (accessToken: string) => {
    this.set(LS_Constants.AUTH_TOKEN, accessToken)
  }

  removeAuthToken = () => {
    this.remove(LS_Constants.AUTH_TOKEN)
  }

  getAuthTokenExpiresDate = (): number => {
    const expiresDate = this.get(LS_Constants.AUTH_TOKEN_EXPIRES_DATE)

    if (expiresDate) {
      return JSON.parse(expiresDate)
    }

    return 0
  }

  setAuthTokenExpiresDate = (expiresDate: number) => {
    this.set(LS_Constants.AUTH_TOKEN_EXPIRES_DATE, JSON.stringify(expiresDate))
  }

  removeAuthTokenExpiresDate = () => {
    this.remove(LS_Constants.AUTH_TOKEN_EXPIRES_DATE)
  }

  getGoogleAccessToken = (): string | null => {
    return this.get(LS_Constants.GOOGLE_ACCESS_TOKEN)
  }

  setGoogleAccessToken = (googleAccessToken: string) => {
    this.set(LS_Constants.GOOGLE_ACCESS_TOKEN, googleAccessToken)
  }

  removeGoogleAccessToken = () => {
    this.remove(LS_Constants.GOOGLE_ACCESS_TOKEN)
  }

  isRefreshingAccessToken = (): boolean => {
    const value = this.get(LS_Constants.IS_REFRESHING_ACCESS_TOKEN)

    if (value !== null) {
      return JSON.parse(value)
    }

    return false
  }

  setRefreshingAccessToken = (value: boolean) => {
    this.set(LS_Constants.IS_REFRESHING_ACCESS_TOKEN, JSON.stringify(value))
  }

  removeRefreshingAccessToken = () => {
    this.remove(LS_Constants.IS_REFRESHING_ACCESS_TOKEN)
  }

  successRefreshingAccessToken = (): boolean => {
    const value = this.get(LS_Constants.SUCCESS_REFRESHING_ACCESS_TOKEN)

    if (value === null) {
      return true
    }

    return JSON.parse(value)
  }

  setSuccessRefreshingAccessToken = (value: boolean) => {
    this.set(
      LS_Constants.SUCCESS_REFRESHING_ACCESS_TOKEN,
      JSON.stringify(value)
    )
  }

  removeSuccessRefreshingAccessToken = () => {
    this.remove(LS_Constants.SUCCESS_REFRESHING_ACCESS_TOKEN)
  }

  removeUserData = () => {
    this.removeAuthToken()
    this.removeAuthTokenExpiresDate()
    this.removeGoogleAccessToken()
    this.removeRefreshingAccessToken()
    this.removeSuccessRefreshingAccessToken()
  }

  cleanLoginGarbage = () => {
    this.removeRefreshingAccessToken()
    this.removeSuccessRefreshingAccessToken()
  }
}

export default new AuthLocalStorage()
