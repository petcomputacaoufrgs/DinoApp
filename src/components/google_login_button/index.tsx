import React, { useState, useContext } from 'react'
import { LanguageProviderContext } from '../language_provider'
import Button from '../button'
import AuthService from '../../services/AuthService'
import Loader from '../loader'
import GoogleSecret from '../../config/client_secret.json'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import GoogleLogo from '../../images/google_logo.png'
import LoginButtonProps from './props'
import LoginErrorTypes from '../../constants/LoginErrorTypes'
import './styles.css'

/**
 * @description Botão para login
 */
const GoogleLoginButton = (props: LoginButtonProps) => {
    
    const languageContext = useContext(LanguageProviderContext)

    const [loading, setLoading] = useState(false)

    /**
     * @description Função chamada após o login do usuário pela biblioteca de Login com o Google
     * @param response Objeto retornado pela biblioteca definidos na sua documentação,
     * para a configuração responseType = 'code'retornará sempre um GoogleLoginResponseOffline
     */
    const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        setLoading(true)

        AuthService.google_login(response as GoogleLoginResponseOffline)
            .catch((loginError: number) => {
                if (loginError === LoginErrorTypes.API_ERROR) {
                    props.onDinoAPIFail && props.onDinoAPIFail()
                } else if (loginError === LoginErrorTypes.EXTERNAL_SERVICE_ERROR) {
                    props.onGoogleFail && props.onGoogleFail()
                }

                setLoading(false)
            })
    }

    /**
     * @description Função chamada após falha no login do usuário com o Google
     * @param response Objeto retornado pela biblioteca definidos na sua documentação,
     * para a configuração responseType = 'code'retornará sempre um GoogleLoginResponseOffline
     */
    const loginFail = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {        
        if (props.onCancel) {
            props.onCancel()
        }

        setLoading(false)
    }

    /**
     * @description Retorna a URI apenas com o host e a porta
     */
    const getURIHost = () => {
        return window.location.protocol + '//' + window.location.host + '/'
    }

    return (
        <>
            <GoogleLogin
                clientId={GoogleSecret.web.client_id}
                scope={AuthService.getDefaultScopes()}
                onSuccess={responseGoogle}
                onFailure={loginFail}
                cookiePolicy={'single_host_origin'}
                redirectUri={getURIHost()}
                responseType={'code'}
                accessType={'offline'}
                render={renderProps => (
                    <Button size={props.size} imageSrc={GoogleLogo} imageAlt={props.buttonText} className='login_button__button' onClick={renderProps.onClick}>{props.buttonText}</Button>
                )}
            />
            <Loader alt={languageContext.LOADER_ALT} loading={loading} />
        </>
    )
}

export default GoogleLoginButton