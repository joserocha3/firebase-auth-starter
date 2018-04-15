import bodyParser from 'body-parser'
import express from 'express'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { printSchema } from 'graphql/utilities/schemaPrinter'
import { renderPlaygroundPage } from 'graphql-playground-html'

import schema from './schemas'

const playgroundExpress = (options) => {
  const middlewareOptions = {
    ...options,
    version: '1.5.6'
  }

  return (req, res, next) => {
    res.setHeader('Content-Type', 'text/html')
    const playground = renderPlaygroundPage(middlewareOptions)
    res.write(playground)
    res.end()
    next()
  }
}

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

  // /api/playground
  graphQLServer.use(
    '/playground',
    playgroundExpress({endpoint: 'graphql'})
  )

  // /api/schema
  graphQLServer.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(printSchema(schema))
  })

  return graphQLServer
}

export default setupGraphQLServer