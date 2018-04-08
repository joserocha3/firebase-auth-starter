import React, { Component } from 'react'

import withAuthorization from '../Session/withAuthorization'

class HomePage extends Component {

  render () {
    return (
      <div>
        <h1>Home</h1>
      </div>
    )
  }
}

export default withAuthorization()(HomePage)