/**
 * @description Valores de URL da API para conexão
 */
class DinoAPIURLConstants {
    private URL: string = 'https://pet-dino-server.herokuapp.com/'
    private PATH_AUTH: string = 'auth/'
    private PATH_GLOSSARY: string = 'glossary/'

    /**
     * @description URL para autenticação com o Google na API
     */
    PATH_AUTH_GOOGLE: string = this.URL + this.PATH_AUTH + 'google/login'

    /**
     * @description URL para sair com a autenticação da API
     */
    PATH_SIGNOUT_GOOGLE: string = this.URL + this.PATH_AUTH + 'google/logout'

    /**
    * @description 
    */
   PATH_GLOSSARY_LIST: string = this.URL + this.PATH_GLOSSARY

    /**
     * @description 
     */
    PATH_GLOSSARY_VERSION: string = this.URL + this.PATH_GLOSSARY + 'version/'
}

export default new DinoAPIURLConstants()