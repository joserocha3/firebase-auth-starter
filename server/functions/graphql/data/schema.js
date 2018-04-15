import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const schema = `
  type User {
    id: String!
    role: String!
    email: String!
  }
  type Task {
    id: String!
    title: String!
    description: String!
    createdBy: User
    createdAt: String
  }
  type Query {
    user(id: String!): User
    users: [User]
    task(id: String!): Task
    tasks: [Task]
    tasksByUser(id: String!): [Task]
  }
`

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers
})