import React, { Component } from 'react'
import { Button, Heading, Input, Select, Text } from 'rebass'

import withAuthorization from '../../Session/withAuthorization'
import { auth, db } from '../../../firebase/index'

class UsersPage extends Component {
  state = {
    users: {}
  }

  componentDidMount () {
    db.getAllUsers().then(users =>
      this.setState(() => ({users}))
    )
  }

  render () {
    const {users} = this.state

    return (
      <React.Fragment>
        {!!users && <UserList users={users} />}
        <UserCreate />
      </React.Fragment>
    )
  }
}

const UserList = ({users}) =>
  <React.Fragment>
    <Heading mb={3}>Existing Users</Heading>
    {Object.keys(users).map(key =>
      <Text key={key}>{users[key].email}</Text>
    )}
  </React.Fragment>

const UserCreate = () =>
  <React.Fragment>
    <Heading my={3}>Create a User</Heading>
    <CreateForm />
  </React.Fragment>

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: '',
  error: null
}

class CreateForm extends Component {
  state = {...INITIAL_STATE}

  _onSubmit = async (event) => {
    event.preventDefault()

    const {email, passwordOne, role} = this.state

    try {
      await auth.createUser(email, passwordOne, role)
      this.setState(() => ({...INITIAL_STATE}))
    } catch (error) {
      console.log(error)
      this.setState({error})
    }
  }

  render () {
    const {email, passwordOne, passwordTwo, role, error} = this.state
    const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            role === '' ||
            passwordOne.length < 6

    return (
      <form onSubmit={this._onSubmit}>
        <Input
          mb={3}
          value={email}
          onChange={event => this.setState({email: event.target.value})}
          type='email'
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

        <Select
          value={role}
          onChange={event => this.setState({role: event.target.value})}>
          <option value='' disabled selected>Select your option</option>
          <option>client</option>
          <option>admin</option>
        </Select>

        <Button mt={3} disabled={isInvalid} type='submit'>
          Sign Up
        </Button>

        {error && <Text mt={3} color='error'>{error.message}</Text>}
      </form>
    )
  }
}

export default withAuthorization()(UsersPage)