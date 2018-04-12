import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Tab, Tabs } from 'rebass'

import withAuthorization from '../Auth/Session/withAuthorization'
import SignOutButton from '../Auth/SignOut'
import * as routes from '../../constants/routes'

const Navigation = ({uid, admin}) =>
  uid
    ? <NavigationAuth admin={!!admin} />
    : <NavigationNonAuth />

const NavigationAuth = ({admin}) =>
  <Tabs mb={3}>
    <Item to={routes.HOME}>Home</Item>
    <Item to={routes.ACCOUNT}>Account</Item>
    {admin && <Item to={routes.USERS}>Users</Item>}
    <SignOutButton ml='auto' />
  </Tabs>

const Item = withRouter(({to, children, location: {pathname}}) =>
  <Tab is='span' borderColor={pathname === to ? 'primary' : 'white'}>
    <Link to={to}>{children}</Link>
  </Tab>
)

const NavigationNonAuth = () => null

export default withAuthorization()(Navigation)
