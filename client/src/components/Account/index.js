import React from 'react'
import { Heading, Text } from 'rebass'

import AuthUserContext from '../Session/AuthUserContext'
import { PasswordChangeForm } from '../Auth/PasswordChange'
import withAuthorization from '../Session/withAuthorization'

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <Heading mb={3} is='h3'>Profile</Heading>
        <Text>Email: {authUser.email}</Text>
        <Heading my={3} is='h3'>Change Password</Heading>
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

export default withAuthorization()(AccountPage)