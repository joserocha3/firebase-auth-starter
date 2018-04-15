import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'rebass'
import { injectGlobal } from 'styled-components'
import { normalize } from 'styled-normalize'

import Navigation from '../Navigation'
import HomePage from '../Home'
import AccountPage from '../Account'
import TasksPage from '../Tasks'
import UsersPage from '../Auth/Users'
import SignUpPage from '../Auth/SignUp'
import SignInPage from '../Auth/SignIn'
import PasswordForgetPage from '../Auth/Password/Forgot'
import NoMatchPage from '../NoMatch'
import Loading from '../Loading'
import withAuthentication from '../Auth/Session/withAuthentication'
import theme from '../../theme'
import * as routes from '../../constants/routes'

// noinspection CssUnknownTarget
injectGlobal`
  ${normalize}
  
  @import url('https://fonts.googleapis.com/css?family=Nunito');
  
  html {
    box-sizing: border-box; 
    font-family: 'Nunito', sans-serif;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`

const Loaded = () =>
  <Router>
    <React.Fragment>
      <Navigation />
      <Switch>
        <Route strict exact path={routes.HOME} component={HomePage} />
        <Route strict path={routes.ACCOUNT} component={AccountPage} />
        <Route strict path={routes.USERS} component={UsersPage} />
        <Route strict path={routes.TASKS} component={TasksPage} />
        <Route strict path={routes.SIGN_UP} component={SignUpPage} />
        <Route strict path={routes.LOGIN} component={SignInPage} />
        <Route strict path={routes.FORGOT} component={PasswordForgetPage} />
        <Route component={NoMatchPage} />
      </Switch>
    </React.Fragment>
  </Router>

const App = ({loaded}) =>
  <Provider theme={theme}>
    {!loaded
      ? <Loading>Loading...</Loading>
      : <Loaded />
    }
  </Provider>

export default withAuthentication(App)