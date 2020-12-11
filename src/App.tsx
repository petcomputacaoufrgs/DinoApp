import React, { useEffect, useState } from 'react'
import './App.css'
import AuthService from './services/auth/AuthService'
import Login from './views/login'
import Main from './views/main'
import PrivateRouterContextProvider from './context/provider/private_router'
import PrivateRoute from './components/private_route'
import LoginRoute from './components/login_route/index'
import PathConstants from './constants/app/PathConstants'
import HistoryService from './services/history/HistoryService'
import { Switch, Route } from 'react-router'
import NotFound from './views/not_found/index'
import UserContextProvider from './context/provider/user'
import Load from './views/load'
import ViewportService from './services/viewport/ViewportService'
import DataThemeUtils from './utils/DataThemeUtils'
import TermsOfUse from './views/terms_of_use'
import PrivacyPolicy from './views/privacy_policy'
import { useCurrentColorTheme, useCurrentFontSize } from './context/provider/app_settings'
import DataFontSizeUtils from './utils/DataFontSizeUtils'

const LOAD_SCREEN_TIME = 2250

const App = (): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState(true)
  const [showLoadScreen, setShowLoadScreen] = useState(false)

  const colorThemeName = useCurrentColorTheme()
  DataThemeUtils.setBodyDataTheme(colorThemeName)

  const fontSizeName = useCurrentFontSize()
  DataFontSizeUtils.setBodyDataFontSize(fontSizeName)

  useEffect(() => {
    DataThemeUtils.setBodyDataTheme(colorThemeName)
  }, [colorThemeName])

  useEffect(() => {
    DataFontSizeUtils.setBodyDataFontSize(fontSizeName)
  }, [fontSizeName])

  useEffect(() => {
    if (firstLoad) {
      ViewportService.maximizeViewport()
      setFirstLoad(false)
    }
  }, [firstLoad])

  useEffect(() => {
    if (showLoadScreen) {
      const interval = setInterval(
        () => setShowLoadScreen(false),
        LOAD_SCREEN_TIME
      )
      const cleanBeforeUpdate = () => {
        clearInterval(interval)
      }

      return cleanBeforeUpdate
    }
  }, [showLoadScreen])

  const renderApp = (): JSX.Element => (
    <PrivateRouterContextProvider
      loginPath={PathConstants.LOGIN}
      homePath={PathConstants.HOME}
      isAuthenticated={AuthService.isAuthenticated}
      browserHistory={HistoryService}
    >
      <Switch>
        <LoginRoute exact path={PathConstants.LOGIN} component={Login} />
        <PrivateRoute
          path={PathConstants.USER}
          component={() => (
            <UserContextProvider>
              <Main />
            </UserContextProvider>
          )}
        />
        <Route path={PathConstants.TERMS_OF_USE} component={TermsOfUse} />
        <Route path={PathConstants.PRIVACY_POLICY} component={PrivacyPolicy} />
        <Route path={'/'} component={NotFound} />
      </Switch>
    </PrivateRouterContextProvider>
  )

  const renderLoad = (): JSX.Element => <Load />

  return (
    <div className="app">{showLoadScreen ? renderLoad() : renderApp()}</div>
  )
}

export default App
