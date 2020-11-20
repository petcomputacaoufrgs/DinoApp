import Superagent from 'superagent'
import AuthService from '../services/auth/AuthService'
import GoogleAPIHeaderConstants from '../constants/google/GoogleAPIHeaderConstants'
import BaseAgent from './BaseAgent'

class GoogleAgentService extends BaseAgent {
  protected addAuth = (
    request: Superagent.SuperAgentRequest
  ): Superagent.SuperAgentRequest => {
    const token = this.getGoogleAccessToken()

    request.set(GoogleAPIHeaderConstants.AUTHORIZATION, `Bearer ${token}`)

    return request
  }

  private getGoogleAccessToken = (): string | null =>
    AuthService.getGoogleAccessToken()
}

export default new GoogleAgentService()
