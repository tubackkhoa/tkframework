import GraphHTTP from 'express-graphql'
// import { graphqlExpress } from 'graphql-server-express'
import express from 'express'
import schema from 'schema'
import { graphqlBatchHTTPWrapper } from 'react-relay-network-layer'

const graphqlServer = GraphHTTP((req, res)=> ({
  schema: schema,
  pretty: true,
  rootValue: {user: req.user},
  graphiql: true,
  // better errors for development. `stack` used in `gqErrors` middleware
  formatError: (error) => ({ 
    message: error.message,
    stack: error.stack.split('\n'),
  }),
}))

// GraphQL
module.exports = {
  GraphHTTP: graphqlServer,
  GraphBatchHTTP: graphqlBatchHTTPWrapper(graphqlServer)
}