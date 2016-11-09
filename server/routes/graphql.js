import GraphHTTP from 'express-graphql'
// import { graphqlExpress } from 'graphql-server-express'
import express from 'express'
import Schema from 'schema'

// GraphQL
module.exports = GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true,
})