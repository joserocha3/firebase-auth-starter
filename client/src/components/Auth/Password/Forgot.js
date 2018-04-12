import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Text } from 'rebass'

import { PageWrapper } from '../index'
import { auth } from '../../../firebase/index'
import * as routes from '../../../constants/routes'

const ForgotPage = () =>
  <PageWrapper
    heading='Forgot Password'
    footer={<Footer />}>
    <Text mb={3}>Enter your email address.</Text>
    <ForgotForm />
  </PageWrapper>

const Footer = () =>
  <Text>
    <Link to={routes.LOGIN}>Nevermind, I remember.</Link>
  </Text>

const INITIAL_STATE = {
  email: '',
  error: null,
  busy: false
}

class ForgotForm extends Component {
  state = {...INITIAL_STATE}

  _onSubmit = async (event) => {
    event.preventDefault()

    const {email} = this.state

    this.setState({busy: true})

    try {
      await auth.passwordReset(email)
      this.setState({...INITIAL_STATE})
    } catch (error) {
      this.setState({error, busy: false})
    }
  }

  _isValid = () => this.state.email !== ''

  render () {
    const {email, error, busy} = this.state

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

        <Button disabled={!this._isValid() || busy} type='submit'>
          Reset My Password
        </Button>

        {error && <Text mt={3} color='error'>{error.message}</Text>}
      </form>
    )
  }
}

export default ForgotPage

export {
  ForgotForm
}
