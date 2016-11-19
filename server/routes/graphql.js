import graphqlHTTP from 'express-graphql'
// import { graphqlExpress } from 'graphql-server-express'
import {Router} from 'express'
import schema from 'data/graphql/schema'
import { graphqlBatchHTTPWrapper } from 'react-relay-network-layer'
import multer from 'multer'

const router  = new Router()
const prodMode = process.env.NODE_ENV !== 'server'

// only allow upload one by one ?
const multerMiddleware = multer({
  storage: multer.memoryStorage()
}).fields([
  {name: 'avatar', maxCount: 1},
])

const uploadMiddleWare = (req, res, next) => {
  multerMiddleware(req, res, () => {
    if (!req.files || req.files.length === 0) {
      return next()      
    }
    // Parse variables so we can add to them. (express-graphql won't parse them again once populated)
    // if not use json
    // req.body.variables = JSON.parse(req.body.variables)
    req.files.forEach(file => 
      req.body.variables.input[file.fieldname] = file
    )
    next()
  })
}

// prepare `graphqlHTTP` express-middleware per request settings
const graphqlServer = graphqlHTTP((request) => ({
  schema,
  graphiql: !prodMode,
  formatError: (error) => ({ 
    message: error.message,
    // just return error message, by default, console return false
    stack: prodMode ? null : console.log(error.stack.split('\n')),
  }),
  pretty: !prodMode,
  context: {
    request, // pass request to context, so we will check request.user
    // dataLoaders: initDataLoaders(), by default we use loaders for finding item with id
  },
}))

// declare route for batch query, sub queries will be call first
router.use('/batch', uploadMiddleWare, graphqlBatchHTTPWrapper(graphqlServer))

// normal graphql, by default
router.use('/', uploadMiddleWare, graphqlServer)

// use this way we just comment out 1 line instead of import then add to code
export default router