import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Heading, Text } from 'rebass'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

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

  _deleteUser = async (id) => {
    this.setState({error: null, busy: true})

    try {
      await deleteUser(id)
      this.setState({deleted: true})
    } catch (error) {
      this.setState({error})
    } finally {
      this.setState({busy: false})
    }
  }

  _assignRole = async (id, role) => {
    this.setState({error: null, busy: true, tempRole: role})

    try {
      await assignRole(id, role)
    } catch (error) {
      this.setState({error})
    } finally {
      await wait(200) // wait for users collection to update or we get a flash
      this.setState({busy: false})
    }
  }

  render () {
    const {error, busy, tempRole, deleted} = this.state
    const {user: {id, role, email}} = this.props

    const disabled = busy || deleted

    return (
      <Box mb={3}>
        <Text mb={3}>{email}</Text>
        <SelectRole
          disabled={disabled}
          value={busy ? tempRole : role}
          onChange={(event) => this._assignRole(id, event.target.value)}
        />
        {!!error && <Text color='red'>{error.message}</Text>}
        <Button
          mt={3}
          onClick={() => this._deleteUser(id)}
          disabled={disabled}>
          Delete
        </Button>
      </Box>
    )
  }
}

const UserList = () =>
  <React.Fragment>
    <Heading mb={3}>Existing Users</Heading>
    <Query query={query}>
      {({loading, error, data}) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>Error :(</Text>
        return data.users.map((user) =>
          <UserItem key={user.id} user={user} />
        )
      }}
    </Query>
  </React.Fragment>

const query = gql`
  {
    users {
      id
      email
      role
    }
  }
`

UserList.propTypes = {
  users: PropTypes.array
}

UserList.defaultProps = {
  users: []
}

export default UserList