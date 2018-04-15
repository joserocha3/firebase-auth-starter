import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Heading, Text } from 'rebass'

import { SelectRole } from './'
import { assignRole, deleteUser } from '../../../firebase/auth'
import { wait } from '../../../utilities'

class UserItem extends Component {
  state = {
    error: null,
    busy: false,
    tempRole: '',
    deleted: false
  }

  _deleteUser = async (uid) => {
    this.setState({error: null, busy: true})

    try {
      await deleteUser(uid)
      this.setState({deleted: true})
    } catch (error) {
      this.setState({error})
    } finally {
      this.setState({busy: false})
    }
  }

  _assignRole = async (uid, role) => {
    this.setState({error: null, busy: true, tempRole: role})

    try {
      await assignRole(uid, role)
    } catch (error) {
      this.setState({error})
    } finally {
      await wait(200) // wait for users collection to update or we get a flash
      this.setState({busy: false})
    }
  }

  render () {
    const {error, busy, tempRole, deleted} = this.state
    const {user: {uid, role, email}} = this.props

    const disabled = busy || deleted

    return (
      <Box mb={3}>
        <Text mb={3}>{email}</Text>
        <SelectRole
          disabled={disabled}
          value={busy ? tempRole : role}
          onChange={(event) => this._assignRole(uid, event.target.value)}
        />
        {!!error && <Text color='red'>{error.message}</Text>}
        <Button
          mt={3}
          onClick={() => this._deleteUser(uid)}
          disabled={disabled}>
          Delete
        </Button>
      </Box>
    )
  }
}

const UserList = ({users}) =>
  <React.Fragment>
    <Heading mb={3}>Existing Users</Heading>
    {!users.keys
      ? <Text>Loading...</Text>
      : Object.keys(users).map(key =>
        <UserItem key={key} user={users[key]} />
      )
    }
  </React.Fragment>

UserList.propTypes = {
  users: PropTypes.array
}

UserList.defaultProps = {
  users: []
}

export default UserList