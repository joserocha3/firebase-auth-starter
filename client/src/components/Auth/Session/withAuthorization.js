import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthContext from './AuthContext'
import NoMatch from '../../NoMatch'
import { firebase } from '../../../firebase/index'
import * as routes from '../../../constants/routes'

const withAuthorization = (condition = () => true) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount () {
      firebase.auth.onAuthStateChanged(user =>
        !user ? this.props.history.push(routes.LOGIN) : null
      )
    }

    render () {
      return (
        <AuthContext.Consumer>
          {user => user && condition && condition(user) ? <Component {...user} /> : <NoMatch />}
        </AuthContext.Consumer>
      )
    }
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization