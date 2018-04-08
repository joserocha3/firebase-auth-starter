import React, { Component } from 'react'

import withAuthorization from '../Session/withAuthorization'
import { db } from '../../firebase'

class UsersPage extends Component {
  state = {
    users: {}
  }

  componentDidMount () {
    db.getAllUsers().then(users => {
      this.setState(() => ({users}))
    })
  }

  render () {
    const {users} = this.state

    return (
      <div>
        <h1>Users</h1>
        {!!users && <UserList users={users} />}
      </div>
    )
  }
}

const UserList = ({users}) =>
  <div>
    <h2>List of email addresses of users</h2>
    {Object.keys(users).map(key =>
      <div key={key}>{users[key].email}</div>
    )}
  </div>

export default withAuthorization()(UsersPage)