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
          scope: GoogleAuthScopes.SCOPE_PROFILE,
          cookiepolicy: 'single_host_origin'
        })

        callback(gapi.auth2)
      } catch {
        callback(undefined)
      }
    })
  }

  requestLogin = async (googleOAuth2) => {
    const response = await googleOAuth2.client.getAuthInstance().signIn({
      "prompt": "consent"
    })
    return response
  }


  requestLogout = async () => {
    const authInstance = gapi.auth2.getAuthInstance()

    if (authInstance && authInstance.isSignedIn.get()) {
      await authInstance.signOut()
    }
  }

  getAccessToken = () => {
    const authInstance = gapi.auth2.getAuthInstance()

    if (authInstance && authInstance.currentUser) {
      console.log(authInstance)
      const currentUser = authInstance.currentUser.get()
      
      if (currentUser) {
        const authResponse = currentUser.getAuthResponse()

        if (authResponse) {
          return authResponse.access_token
        }
      }
    }
    return null
  }


  requestGrant = async (scopeList) => {
    const authInstance = gapi.auth2.getAuthInstance()

    if (authInstance && authInstance.currentUser) {
      const currentUser = authInstance.currentUser.get()
      const scopeString = scopeList.join(' ')

      const response = await currentUser.grant({
        scope: scopeString,
        prompt: "consent",
        approval_prompt: 'force'
      })

      console.log(response)
    }
  } 
}

export default new GoogleOAuth2Service()
