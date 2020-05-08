import React from 'react'
import AppProvider from './provider/app_provider'
import AuthService from './services/auth/AuthService'
import Login from './views/login'
import Main from './views/main'
import PrivateRouter from './provider/private_router_provider'
import PrivateRoute from './components/private_route'
import LoginRoute from './components/login_route/index'
import PathConstants from './constants/PathConstants'
import HistoryService from './services/history/HistoryService'
import { Switch, Route } from 'react-router'
import NotFound from './views/not_found/index'
import UpdaterService from './services/updater/UpdaterService'
import './App.css'

const App = (): JSX.Element => {
  UpdaterService.checkUpdates()

  return (
    <div className="app">
      <AppProvider>
        <PrivateRouter
          loginPath={PathConstants.LOGIN}
          homePath={PathConstants.HOME}
          isAuthenticated={AuthService.isAuthenticated}
          browserHistory={HistoryService}
        >
          <Switch>
            <LoginRoute exact path={PathConstants.LOGIN} component={Login} />
            <PrivateRoute path={PathConstants.APP} component={Main} />
            <Route path={'/'} component={NotFound} />
          </Switch>
        </PrivateRouter>
      </AppProvider>
    </div>
  )
}

export default App
