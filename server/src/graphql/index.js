import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { printSchema } from 'graphql/utilities/schemaPrinter'
import expressPlayground from 'graphql-playground-middleware-express'

import schema from './schemas'

const setupGraphQLServer = () => {
  // setup server
  const graphQLServer = express()

  graphQLServer.use(cors())

  // /api/graphql
  graphQLServer.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress({schema, context: {}})
  )

  // /api/graphiql
  graphQLServer.use(
    '/graphiql',
    graphiqlExpress({endpointURL: 'graphql'})
  )

  // /api/playground
  graphQLServer.use(
    '/playground',
    expressPlayground({endpoint: 'graphql'})
  )

  // /api/schema
  graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(printSchema(schema))
  })

  return graphQLServer
}

export default setupGraphQLServer