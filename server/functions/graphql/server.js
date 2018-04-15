import bodyParser from 'body-parser'
import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { printSchema } from 'graphql/utilities/schemaPrinter'

import schema from './data/schema'

const setupGraphQLServer = () => {
  // setup server
  const graphQLServer = express()

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

  // /api/schema
  graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(printSchema(schema))
  })


  return graphQLServer
}

export default setupGraphQLServer