import React from 'react'
import { Button, Heading, Input, Text } from 'rebass'

import withAuthorization from '../Auth/Session/withAuthorization'
import TaskList from './TaskList'
import { db } from '../../firebase'

class TasksPage extends React.PureComponent {
  state = {
    tasks: []
  }

  unsubscribe = null

  _setTasks = (tasks) =>
    this.setState({tasks})

  componentDidMount() {
    this.unsubscribe = db.subscribeToTasks(this._setTasks)
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render () {
    const {tasks} = this.state

    return (
      <React.Fragment>
        <TaskList tasks={tasks} />
        <TaskCreate />
      </React.Fragment>
    )
  }
}

const TaskCreate = () =>
  <React.Fragment>
    <Heading my={3}>Create a Task</Heading>
    <CreateForm />
  </React.Fragment>

const INITIAL_STATE = {
  description: '',
  error: null,
  busy: false
}

class CreateForm extends React.PureComponent {
  state = {...INITIAL_STATE}

  _onSubmit = async (event) => {
    event.preventDefault()

    const {description} = this.state

    this.setState({error: null, busy: true})

    try {
      await db.createTask(description)
      this.setState(() => ({...INITIAL_STATE}))
    } catch (error) {
      this.setState({error, busy: false})
    }
  }

  _isValid = () =>
    this.state.description !== ''

  render () {
    const {description, error, busy} = this.state

    return (
      <form onSubmit={this._onSubmit}>
        <Input
          mb={3}
          value={description}
          onChange={event => this.setState({description: event.target.value})}
          type='description'
          placeholder='Description'
          name='description'
        />

        <Button mt={3} disabled={!this._isValid() || busy} type='submit'>
          Create
        </Button>

        {error && <Text mt={3} color='error'>{error.message}</Text>}
      </form>
    )
  }
}

export default withAuthorization()(TasksPage)