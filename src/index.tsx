import React from 'react'
import ReactDOM from 'react-dom'
import * as ServiceWorker from './serviceWorker'
import AlertProvider from './context/alert'
import EventService from './services/events/EventService'
import GoogleOAuth2Provider from './context/google_oauth2'
import LanguageProvider from './context/language'
import LogoutService from './services/auth/LogoutService'
import App from './App'
import './Var.css'


window.addEventListener('load', () => {
	EventService.whenStart()
	LogoutService.start()
})

ReactDOM.render(
	<GoogleOAuth2Provider>
		<AlertProvider>
			<LanguageProvider>
				<App />
			</LanguageProvider>
		</AlertProvider>
	</GoogleOAuth2Provider>,
	document.getElementById('root'),
)

ServiceWorker.unregister()
