import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'rebass'
import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'

import Navigation from '../Navigation'
import SignUpPage from '../Auth/SignUp'
import SignInPage from '../Auth/SignIn'
import PasswordForgetPage from '../Auth/Forgot'
import HomePage from '../Home'
import UsersPage from '../Users'
import AccountPage from '../Account'
import withAuthentication from '../Session/withAuthentication'
import theme from '../../theme'
import * as routes from '../../constants/routes'

injectGlobal`
  ${reset}
  
  html {
    height: 100%;
    box-sizing: border-box; 
  }
  
  #root, body {
    height: 100%;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
`

const App = () =>
  <Router>
    <Provider theme={theme}>
      <Navigation />

      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.LOGIN} component={() => <SignInPage />} />
      <Route exact path={routes.FORGOT} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.USERS} component={() => <UsersPage />} />

    </Provider>
  </Router>

export default withAuthentication(App)