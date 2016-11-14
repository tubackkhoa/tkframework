import graphqlHTTP from 'express-graphql'
// import { graphqlExpress } from 'graphql-server-express'
import {Router} from 'express'
import schema from 'graphql/schema'
import DataLoader from 'dataloader'
import { graphqlBatchHTTPWrapper } from 'react-relay-network-layer'

const router  = new Router()

// prepare `graphqlHTTP` express-middleware per request settings
const graphqlServer = graphqlHTTP((request) => ({
  schema,
  graphiql: true,
  formatError: (error) => ({ 
    message: error.message,
    stack: error.stack.split('\n'),
  }),
  pretty: true,
  context: {
    request, // pass request to context, so we will check request.user
    // dataLoaders: initDataLoaders(), by default we use loaders for finding item with id
  },
}))

// declare route for batch query, sub queries will be call first
router.use('/batch', graphqlBatchHTTPWrapper(graphqlServer))

// normal graphql, by default
router.use('/', graphqlServer)

// use this way we just comment out 1 line instead of import then add to code
export default router