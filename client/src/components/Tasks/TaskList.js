import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Heading, Text } from 'rebass'

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
    const {task: {uid, title, description}} = this.props

    const disabled = busy || deleted

    return (
      <Box mb={3}>
        <CreateForm data={{title, description}} />
        {!!error && <Text color='red'>{error.message}</Text>}
        <Button
          mt={3}
          onClick={() => this._deleteTask(uid)}
          disabled={disabled}>
          Delete
        </Button>
      </Box>
    )
  }
}

const TaskList = ({tasks}) =>
  <React.Fragment>
    <Heading mb={3}>Existing Tasks</Heading>
    {!tasks.keys
      ? <Text>Loading...</Text>
      : Object.keys(tasks).map(key =>
        <TaskItem key={key} task={tasks[key]} />
      )
    }
  </React.Fragment>

TaskList.propTypes = {
  tasks: PropTypes.array
}

TaskList.defaultProps = {
  tasks: []
}

export default TaskList