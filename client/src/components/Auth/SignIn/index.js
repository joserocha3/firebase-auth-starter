import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Input, Text } from 'rebass'

import { PageWrapper } from '../'
import { auth } from '../../../firebase/index'
import * as routes from '../../../constants/routes'

const SignInPage = ({history}) =>
  <PageWrapper
    heading='Sign In'
    footer={<Footer />}>
    <Text mb={3}>Enter your email address and password.</Text>
    <SignInForm history={history} />
  </PageWrapper>

const Footer = () =>
  <React.Fragment>
    <Text mb={3}>
      <Link to={routes.FORGOT}>Forgot Password?</Link>
    </Text>
    <Text>
      <Link to={routes.SIGN_UP}> Don't have an account?</Link>
    </Text>
  </React.Fragment>

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  busy: false
}

class SignInForm extends Component {
  state = {...INITIAL_STATE}

  _onSubmit = async (event) => {
    event.preventDefault()

    const {email, password} = this.state
    const {history} = this.props

    this.setState({busy: true})

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState(() => ({...INITIAL_STATE}))
      history.push(routes.HOME)
    } catch (error) {
      this.setState({error, busy: false})
    }
  }

  _isValid = () =>
    this.state.email !== '' &&
    this.state.password !== '' &&
    this.state.password.length > 5

  render () {
    const {email, password, error, busy} = this.state

    return (
      <form onSubmit={this._onSubmit}>
        <Input
          mb={3}
          value={email}
          onChange={event => this.setState({email: event.target.value})}
          type='text'
          placeholder='Email Address'
          name='email'
        />
        <Input
          mb={3}
          value={password}
          onChange={event => this.setState({password: event.target.value})}
          type='password'
          placeholder='Password'
        />

        <Button disabled={!this._isValid() || busy} type='submit'>
          Sign In
        </Button>

        {error && <Text color='error' mt={3}>{error.message}</Text>}
      </form>
    )
  }
}

export default withRouter(SignInPage)

export {
  SignInForm
}
