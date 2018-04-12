import React, { Component } from 'react'
import { Button, Input, Text } from 'rebass'

import { auth } from '../../../firebase/index'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  busy: false
}

class PasswordChangeForm extends Component {
  state = {...INITIAL_STATE}

  _onSubmit = async (event) => {
    event.preventDefault()

    const {passwordOne} = this.state

    this.setState({busy: true})

    try {
      await auth.passwordUpdate(passwordOne)
      this.setState(() => ({...INITIAL_STATE}))
    } catch (error) {
      this.setState({error, busy: true})
    }
  }

  _isValid = () =>
    this.state.passwordOne !== '' &&
    this.state.passwordOne === this.state.passwordTwo

  render () {
    const {passwordOne, passwordTwo, error, busy} = this.state

    return (
      <form onSubmit={this._onSubmit}>
        <Input
          mb={3}
          value={passwordOne}
          onChange={event => this.setState({passwordOne: event.target.value})}
          type='password'
          placeholder='New Password'
        />
        <Input
          mb={3}
          value={passwordTwo}
          onChange={event => this.setState({passwordTwo: event.target.value})}
          type='password'
          placeholder='Confirm New Password'
        />

        <Button disabled={!this._isValid() || busy} type='submit'>
          Reset My Password
        </Button>

        {error && <Text color='error' mt={3}>{error.message}</Text>}
      </form>
    )
  }
}

export { PasswordChangeForm }