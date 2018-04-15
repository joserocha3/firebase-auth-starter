import { https } from 'firebase-functions'
import setupGraphQLServer from './graphql'

const graphQLServer = setupGraphQLServer()
export const api = https.onRequest(graphQLServer)