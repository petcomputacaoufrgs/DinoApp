import GoogleSecrets from '../../../environment/client_secret.json'
import GoogleAuthScopes from '../../../constants/google/GoogleAuthScopes'

/* eslint-disable no-undef */

class GoogleOAuth2Service {
  initClient = async (callback) => {
    gapi.load('client:auth2', async () => {
      try {
        await gapi.client.init({
          client_id: GoogleSecrets.client_id,
          api_key: GoogleSecrets.api_key,
          scope: GoogleAuthScopes.SCOPE_PROFILE
        })

        callback(gapi.auth2)
      } catch {
        callback(undefined)
      }
    })
  }

  requestLogin = async (googleOAuth2) => {
    const response = await googleOAuth2.client.getAuthInstance().signIn()
    return response
  }

  requestGrant = async (googleOAuth2, scopeList) => {
    const scopeString = scopeList.join(' ')
    const response = await googleOAuth2.client.currentUser
      .get().grantOfflineAccess({ 
        scope: scopeString
      })

    return response.code
  } 
}

export default new GoogleOAuth2Service()
