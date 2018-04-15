import { makeExecutableSchema } from 'graphql-tools'

import resolvers from '../resolvers'
import User from './User.graphql'
import Task from './Task.graphql'
import Query from './Query.graphql'

export default makeExecutableSchema({
  typeDefs: [User, Task, Query],
  resolvers
})