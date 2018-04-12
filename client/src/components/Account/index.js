import React from 'react'
import { Heading, Text } from 'rebass'

import { PasswordChangeForm } from '../Auth/Password/Change'
import withAuthorization from '../Auth/Session/withAuthorization'

const AccountPage = ({email}) =>
  <div>
    <Heading mb={3} is='h3'>Profile</Heading>
    <Text>Email: {email}</Text>
    <Heading my={3} is='h3'>Change Password</Heading>
    <PasswordChangeForm />
  </div>

export default withAuthorization()(AccountPage)