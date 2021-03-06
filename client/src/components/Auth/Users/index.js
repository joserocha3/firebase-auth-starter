import React from 'react'
import { Button, Heading, Input, Select, Text } from 'rebass'

import withAuthorization from '../Session/withAuthorization'
import UserList from './UserList'
import { auth } from '../../../firebase/index'

const UsersPage = () =>
  <React.Fragment>
    <UserList />
    <UserCreate />
  </React.Fragment>

const UserCreate = () =>
  <React.Fragment>
    <Heading my={3}>Create a User</Heading>
    <CreateForm />
  </React.Fragment>

const SelectRole = ({value, onChange, disabled}) =>
  <Select
    disabled={!!disabled}
    value={value}
    onChange={onChange}>
    <option value='' disabled defaultValue>Select a role</option>
    <option>client</option>
    <option>admin</option>
  </Select>

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: '',
  error: null,
  busy: false
}

class CreateForm extends React.PureComponent {
  state = {...INITIAL_STATE}

  _onSubmit = async (event) => {
    event.preventDefault()

    const {email, passwordOne, role} = this.state

    this.setState({error: null, busy: true})

    try {
      await auth.createUser(email, passwordOne, role)
      this.setState(() => ({...INITIAL_STATE}))
    } catch (error) {
      this.setState({error, busy: false})
    }
  }

  _isValid = () =>
    this.state.email !== '' &&
    this.state.passwordOne !== '' &&
    this.state.passwordOne === this.state.passwordTwo &&
    this.state.passwordOne.length > 5 &&
    this.state.role !== ''

  render () {
    const {email, passwordOne, passwordTwo, role, error, busy} = this.state

    return (
      <form onSubmit={this._onSubmit}>
        <Input
          mb={3}
          value={email}
          onChange={event => this.setState({email: event.target.value})}
          type='email'
          placeholder='Email Address'
          name='email'
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

        <SelectRole
          value={role}
          onChange={event => this.setState({role: event.target.value})}
        />

        <Button mt={3} disabled={!this._isValid() || busy} type='submit'>
          Create
        </Button>

        {error && <Text mt={3} color='error'>{error.message}</Text>}
      </form>
    )
  }
}

const condition = (user) => user.admin

export default withAuthorization(condition)(UsersPage)

export {
  SelectRole
}