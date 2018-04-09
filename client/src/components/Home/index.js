import React, { Component } from 'react'
import { Heading } from 'rebass'

import AuthUserContext from '../Session/AuthUserContext'
import withAuthorization from '../Session/withAuthorization'

class HomePage extends Component {

  render () {
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          <Heading is='h3'>Welcome, {authUser.email}</Heading>
        }
      </AuthUserContext.Consumer>
    )
  }
}

export default withAuthorization()(HomePage)