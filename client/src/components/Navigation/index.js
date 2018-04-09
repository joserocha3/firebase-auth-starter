import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Tab, Tabs } from 'rebass'

import AuthUserContext from '../Session/AuthUserContext'
import SignOutButton from '../Auth/SignOut'
import * as routes from '../../constants/routes'

const Navigation = () =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <Tabs mb={3}>
    <Item to={routes.HOME}>Home</Item>
    <Item to={routes.ACCOUNT}>Account</Item>
    <Item to={routes.USERS}>Users</Item>
    <SignOutButton ml='auto' />
  </Tabs>

const Item = withRouter(({to, children, location: {pathname}}) =>
  <Tab is='span' borderColor={pathname === to ? 'primary' : 'white'}>
    <Link to={to}>{children}</Link>
  </Tab>
)

const NavigationNonAuth = () => null

export default Navigation
