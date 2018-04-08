import React, { Component } from 'react'
import { Button, Input } from 'rebass'

import { auth } from '../../../firebase/index'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
}

class PasswordChangeForm extends Component {
  state = {...INITIAL_STATE}

  onSubmit = (event) => {
    const {passwordOne} = this.state

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({...INITIAL_STATE}))
      })
      .catch(error => {
        this.setState({error})
      })

    event.preventDefault()
  }

  render () {
    const {passwordOne, passwordTwo, error} = this.state
    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''

    return (
      <form onSubmit={this.onSubmit}>
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
        <Button disabled={isInvalid} type='submit'>
          Reset My Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export { PasswordChangeForm }