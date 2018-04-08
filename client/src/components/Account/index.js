import React from 'react'

import AuthUserContext from '../Session/AuthUserContext'
import { ForgotForm } from '../Auth/Forgot'
import { PasswordChangeForm } from '../Auth/Password'
import withAuthorization from '../Session/withAuthorization'

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div>
        <h1>Account: {authUser.email}</h1>
        <ForgotForm />
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

export default withAuthorization()(AccountPage)