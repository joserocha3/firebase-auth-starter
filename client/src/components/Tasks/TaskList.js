import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Heading, Text } from 'rebass'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

import { CreateForm } from './'
import { db } from '../../firebase'

class TaskItem extends Component {
  state = {
    error: null,
    busy: false,
    deleted: false
  }

  _deleteTask = async (uid) => {
    this.setState({error: null, busy: true})

    try {
      await db.deleteTask(uid)
      this.setState({deleted: true})
    } catch (error) {
      this.setState({error})
    } finally {
      this.setState({busy: false})
    }
  }

  render () {
    const {error, busy, deleted} = this.state
    const {task: {id, title, description}} = this.props

    const disabled = busy || deleted

    return (
      <Box mb={3}>
        <CreateForm data={{title, description}} />
        {!!error && <Text color='red'>{error.message}</Text>}
        <Button
          mt={3}
          onClick={() => this._deleteTask(id)}
          disabled={disabled}>
          Delete
        </Button>
      </Box>
    )
  }
}

const TaskList = () =>
  <React.Fragment>
    <Heading mb={3}>Existing Tasks</Heading>
    <Query query={query}>
      {({loading, error, data}) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>Error :(</Text>
        return data.tasks.map((task) =>
          <TaskItem key={task.id} task={task} />
        )
      }}
    </Query>
  </React.Fragment>

const query = gql`
  {
    tasks {
      id
      title
      description
    }
  }
`

TaskList.propTypes = {
  tasks: PropTypes.array
}

TaskList.defaultProps = {
  tasks: []
}

export default TaskList