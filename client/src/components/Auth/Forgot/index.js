import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Text } from 'rebass'

import { PageWrapper } from '../'
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
  error: null
}

class ForgotForm extends Component {
  state = {...INITIAL_STATE}

  onSubmit = (event) => {
    const {email} = this.state

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({...INITIAL_STATE}))
      })
      .catch(error => {
        this.setState({error})
      })

    event.preventDefault()
  }

  render () {
    const {email, error} = this.state
    const isInvalid = email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          mb={3}
          value={this.state.email}
          onChange={event => this.setState({email: event.target.value})}
          type='text'
          placeholder='Email Address'
        />
        <Button disabled={isInvalid} type='submit'>
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default ForgotPage

export {
  ForgotForm
}
