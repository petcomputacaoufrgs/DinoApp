class GoogleAuthRequestModel {
  idToken: string
  name: string
  email: string
  pictureUrl: string

  constructor(googleResponse) {
    const authData = googleResponse.getAuthResponse()
    const userData = googleResponse.getBasicProfile()
    this.idToken = authData.id_token
    this.name = userData.getName()
    this.email = userData.getEmail()
    this.pictureUrl = userData.getImageUrl()
  }
}

export default GoogleAuthRequestModel
