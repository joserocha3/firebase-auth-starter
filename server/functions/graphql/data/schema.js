import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

const schema = `
type User {
  uid: String!
  role: String!
  email: String!
}
type Task {
  uid: String!
  title: String!
  description: String!
  owner: User!
}
type Query {
  user(uid: String!): User
  users: [User]
  task(uid: String!): Task
  tasks: [Task]
}
`

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers
})