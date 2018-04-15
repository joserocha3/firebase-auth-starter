import React from 'react'
import { Button, Heading, Input, Text, Textarea } from 'rebass'

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

  componentDidMount () {
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
  title: '',
  description: '',
  error: null,
  busy: false,
  button: 'Create'
}

class CreateForm extends React.PureComponent {
  state = {...INITIAL_STATE}

  componentDidMount(){
    if (this.props.data) {
      this.setState({...this.props.data, button: 'Update'})
    }
  }

  _onSubmit = async (event) => {
    event.preventDefault()

    const {title, description} = this.state

    this.setState({error: null, busy: true})

    try {
      await db.createTask(title, description)
      this.setState(() => ({...INITIAL_STATE}))
    } catch (error) {
      this.setState({error, busy: false})
    }
  }

  _isValid = () =>
    this.state.title !== '' &&
    this.state.description !== ''

  render () {
    const {title, description, error, busy, button} = this.state

    return (
      <form onSubmit={this._onSubmit}>
        <Input
          mb={3}
          value={title}
          onChange={event => this.setState({title: event.target.value})}
          type='title'
          placeholder='Title'
          name='title'
        />
        <Textarea
          mb={3}
          value={description}
          onChange={event => this.setState({description: event.target.value})}
          type='description'
          placeholder='Description'
          name='description'
        />

        <Button mt={3} disabled={!this._isValid() || busy} type='submit'>
          {button}
        </Button>

        {error && <Text mt={3} color='error'>{error.message}</Text>}
      </form>
    )
  }
}

export default withAuthorization()(TasksPage)

export {
  CreateForm
}