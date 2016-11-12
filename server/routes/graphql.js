import GraphHTTP from 'express-graphql'
// import { graphqlExpress } from 'graphql-server-express'
import {Router} from 'express'
import schema from 'schema'
import { graphqlBatchHTTPWrapper } from 'react-relay-network-layer'

const router  = new Router()

const graphQLServer = GraphHTTP((req, res)=> ({
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

// normal graphql
router.use('/', graphQLServer)

// declare route for batch query
router.use('/batch', graphqlBatchHTTPWrapper(graphQLServer))

// use this way we just comment out 1 line instead of import then add to code
export default router