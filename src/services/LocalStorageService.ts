import LocalStorageKeysConstants from "../constants/LocalStorageKeysConstants"


/**
 * @description Auxilia a gravar e ler valores do local storage
 */
class LocalStorageService {
    private get = (key: string) : string | null => {
        return localStorage.getItem(key)
    }

    private set = (key: string, value: string) => {
        if (!key) {
            throw Error("Chave inválida!")
        } else {
            return localStorage.setItem(key, value)
        } 
    }

    private remove = (key: string) => {
        if (!key) {
            throw Error("Chave inválida!")
        } else {
            return localStorage.setItem(key, '')
        } 
    }

    /**
     * @description Retorna o código de autenticação se houver
     */
    getAuthToken = () : string => {
        const authToken = this.get(LocalStorageKeysConstants.AUTH_TOKEN)
        
        return this.stringOrNullToString(authToken)
    }

    /**
     * @description Salva um novo valor como código de autenticação
     * @param accessToken valor do token de acesso a ser salvo
     */
    setAuthToken = (accessToken: string) => {
        this.set(LocalStorageKeysConstants.AUTH_TOKEN, accessToken)
    }

    /**
     * @description Limpa o token de autenticação
     */
    removeAuthToken = () => {
        this.remove(LocalStorageKeysConstants.AUTH_TOKEN)
    }

    /**
     * @description Busca o token de acesso do Google
     */
    getGoogleAccessToken = (): string | null => {
        return this.get(LocalStorageKeysConstants.GOOGLE_ACCESS_TOKEN)
    }

    /**
     * @description Salva um token de acesso do Google
     */
    setGoogleAccessToken = (googleAccessToken: string) => {
        this.set(LocalStorageKeysConstants.GOOGLE_ACCESS_TOKEN, googleAccessToken)
    }

    /**
     * @description Limpa o token de acesso do google
     */
    removeGoogleAccessToken = () => {
        this.remove(LocalStorageKeysConstants.GOOGLE_ACCESS_TOKEN)
    }

    /**
     * @description Retorna o email do usuário caso esteja salvo
     */
    getEmail = () : string | null => {
        return this.get(LocalStorageKeysConstants.EMAIL)
    }

    /**
     * @description Salva o email do usuário para acesso futuro
     * @param email email do usuário a ser salvo
     */
    setEmail = (email: string) => {
        this.set(LocalStorageKeysConstants.EMAIL, email)
    }

    /**
     * @description Remove o email salvo
     */
    removeEmail = () => {
        this.remove(LocalStorageKeysConstants.EMAIL)
    }

    /**
     * @description Retorna o nome do usuário atual
     */
    getName = (): string | null => {
        return this.get(LocalStorageKeysConstants.NAME)
    }

    /**
     * @description Salva o nome do usuário atual
     */
    setName = (name: string) => {
        this.set(LocalStorageKeysConstants.NAME, name)
    } 

    /**
     * @description Remove o nome salvo
     */
    removeName = () => {
        this.remove(LocalStorageKeysConstants.NAME)
    }

    /**
     * @description Salva a imagem do usuário (url)
     */
    getPictureUrl = (): string | null => {
        return this.get(LocalStorageKeysConstants.PICTURE_URL)
    }
    
    /**
     * @description Retorna a imagem do usuário (url) caso esteja salva
     */
    setPictureUrl = (pictureUrl: string) => {
        this.set(LocalStorageKeysConstants.PICTURE_URL, pictureUrl)
    }

    /**
     * @description Remove a URL da foto salva
     */
    removePictureUrl = () => {
        this.remove(LocalStorageKeysConstants.PICTURE_URL)
    }


    /**
     * @description Recebe um valor do tipo string ou null e retorna uma string sempre.
     * Caso o valor seja null retorna uma string vazia
     */
    private stringOrNullToString = (nullableString: string | null): string => {
        return nullableString ? nullableString : ''
    }


}

export default new LocalStorageService()