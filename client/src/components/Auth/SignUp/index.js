import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Input, Text } from 'rebass'

import { PageWrapper } from '../'
import { auth } from '../../../firebase/index'
import * as routes from '../../../constants/routes'

const SignUpPage = ({history}) =>
  <PageWrapper
    heading='Sign Up'
    footer={<Footer />}>
    <Text mb={3}>Enter an email address and password.</Text>
    <SignUpForm history={history} />
  </PageWrapper>

const Footer = () =>
  <Text>
    <Link to={routes.LOGIN}>Nevermind, I remember.</Link>
  </Text>

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class SignUpForm extends Component {
  state = {...INITIAL_STATE}

  _onSubmit = async (event) => {
    event.preventDefault()

    const {email, passwordOne} = this.state
    const {history} = this.props

    try {
      await auth.createUserWithEmailAndPassword(email, passwordOne)
      this.setState(() => ({...INITIAL_STATE}))
      history && history.push(routes.HOME)
    } catch (error) {
      this.setState({error})
    }
  }

  render () {
    const {email, passwordOne, passwordTwo, error} = this.state
    const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            passwordOne.length < 6

    return (
      <form onSubmit={this._onSubmit}>
        <Input
          mb={3}
          value={email}
          onChange={event => this.setState({email: event.target.value})}
          type='text'
          placeholder='Email Address'
        />
        <Input
          mb={3}
          value={passwordOne}
          onChange={event => this.setState({passwordOne: event.target.value})}
          type='password'
          placeholder='Password'
        />
        <Input
          mb={3}
          value={passwordTwo}
          onChange={event => this.setState({passwordTwo: event.target.value})}
          type='password'
          placeholder='Confirm Password'
        />
        <Button disabled={isInvalid} type='submit'>
          Sign Up
        </Button>

        {error && <Text mt={3} color='error'>{error.message}</Text>}
      </form>
    )
  }
}

export default withRouter(SignUpPage)

export {
  SignUpForm
}