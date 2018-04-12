import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Heading, Text } from 'rebass'

import { SelectRole } from './'
import { assignRole } from '../../../firebase/auth'

// TODO: in functions update user collection at end of assignRole

class UserItem extends Component {
  state = {
    error: '',
    busy: false
  }

  _assignRole = async (uid, role) => {
    this.setState({busy: true})

    try {
      await assignRole(uid, role)
    } catch (error) {
      this.setState({error})
    } finally {
      this.setState({busy: false})
    }
  }

  render () {
    const {error, busy} = this.state
    const {user: {uid, role, email}} = this.props

    return (
      <Box mb={3}>
        <Text mb={3}>{email}</Text>
        <SelectRole
          disabled={busy}
          value={role || ''}
          onChange={(event) => this._assignRole(uid, event.target.value)}
        />
        {!!error && <Text color='red'>{error.message}</Text>}
      </Box>
    )
  }
}

const UserList = ({users}) =>
  <React.Fragment>
    <Heading mb={3}>Existing Users</Heading>
    {!users.keys
      ? <Text>Loading...</Text>
      : Object.keys(users).map((key, index) =>
        <UserItem key={index} user={users[key]} />
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
