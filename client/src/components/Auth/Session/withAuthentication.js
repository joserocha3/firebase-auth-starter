import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthContext from './AuthContext'
import { firebase } from '../../../firebase/index'
import * as routes from '../../../constants/routes'

const INITIAL_STATE = {
  uid: '',
  email: '',
  verified: '',
  admin: false,
  client: false,
  loaded: false
}

const withAuthentication = (Component) => {
  return class WithAuthentication extends React.Component {
    state = INITIAL_STATE

    _b64DecodeUnicode = (str) =>
      decodeURIComponent(Array.prototype.map.call(atob(str), (c) =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''))

    componentDidMount () {
      firebase.auth.onAuthStateChanged(async user => {
        if (!user) return this.setState({...INITIAL_STATE, loaded: true})

        try {
          const idToken = await firebase.auth.currentUser.getIdToken()
          const payload = await JSON.parse(this._b64DecodeUnicode(idToken.split('.')[1]))
          this.setState({
            uid: user.uid,
            email: user.email,
            verified: !!payload['email_verified'],
            admin: !!payload['admin'],
            client: !!payload['client'],
            loaded: true
          })
        } catch (error) {
          console.log(error)
        }
      })
    }

    render () {
      return (
        <AuthContext.Provider value={this.state}>
          <Component {...this.state} />
        </AuthContext.Provider>
      )
    }
  }
}

export default withAuthentication