import Superagent, { Response } from 'superagent'
import AuthService from './AuthService'
import HttpStatus from 'http-status-codes'
import HistoryService from './HistoryService'
import PathConstants from '../constants/PathConstants'
import DinoHeaderConstants from '../constants/DinoHeaderConstants'
import LocalStorageService from './LocalStorageService'

class HttpAgent {

    /**
     * @description Cria uma requisição do tipo PUT com autenticação se houver e com filtro para erro de acesso negado
     * @param url URL da entrada de comunicação com a API
     */
    put = (url: string) : Superagent.SuperAgentRequest => {
        return Superagent.put(url).set(this.getHeader()).on('error', this.onError).on('response', this.onResponse)
    }

    /**
     * @description Cria uma requisição do tipo POST com autenticação se houver e com filtro para erro de acesso negado
     * @param url URL da entrada de comunicação com a API
     */
    post = (url: string) : Superagent.SuperAgentRequest => {
        return Superagent.post(url).set(this.getHeader()).on('error', this.onError).on('response', this.onResponse)
    }

    /**
     * @description Cria uma requisição do tipo GET com autenticação se houver e com filtro para erro de acesso negado
     * @param url URL da entrada de comunicação com a API
     */
    get = (url: string) : Superagent.SuperAgentRequest => {
        return Superagent.get(url).set(this.getHeader()).on('error', this.onError).on('response', this.onResponse)
    }

    /**
     * @description Retorna o header da autenticação se houver
     */
    private getHeader = () : object => {
        if (AuthService.isAuthenticated()) {
            const authorizationHeader = 'Bearer '.concat(AuthService.getAuthenticationToken())

            return {[DinoHeaderConstants.AUTHORIZATION]: authorizationHeader}
        }
        
        return {}
    }

    /**
     * @description Trata erros nas requisições
     * @param erro Objeto contendo informações sobre o erro
     */
    private onError = (err: any) => {
        if (err.status === HttpStatus.FORBIDDEN || err.status === HttpStatus.UNAUTHORIZED) {
            HistoryService.push(PathConstants.LOGIN)

            alert('Erro na autenticação com o servidor.')
        }
    }

    /**
     * @description Trata filtros na resposta da requisição
     * @param response Objeto contendo a resposta do servidor
     */
    private onResponse = (response: Response) => {
        /* Verifica se o token de autorização foi renovado */
        const newToken = response.get(DinoHeaderConstants.REFRESH_TOKEN)

        if (newToken) {
            /* Salva o novo token de autenticação, remove os 7 primeiros digitos correspondentes ao código 'Bearer ' */
            LocalStorageService.setAuthToken(newToken.substring(7))
        }
    }
}

export default new HttpAgent()

