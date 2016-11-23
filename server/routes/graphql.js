import graphqlHTTP from 'express-graphql'
// import { graphqlExpress } from 'graphql-server-express'
import {Router} from 'express'
import schema from 'data/graphql/schema'
import { graphqlBatchHTTPWrapper } from 'react-relay-network-layer'
import multer from 'multer'

const router  = new Router()
const prodMode = process.env.NODE_ENV !== 'server'

// field name => max count
const fieldMaxcountOptions = {
  'avatar': 1,
  'images': 10,
  'full_src': 1,
}

// extend here
const fieldOptions = Object.keys(fieldMaxcountOptions).map(name => ({
  name,
  maxCount: fieldMaxcountOptions[name]
}))

// only allow upload one by one ?
const multerMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 }, // 1m
}).fields(fieldOptions)

const uploadMiddleWare = (req, res, next) => {
  multerMiddleware(req, res, () => {

    const names = req.files ? Object.keys(req.files) : null
    if (!names || names.length === 0) {
      return next()      
    }

    // Parse variables so we can add to them. (express-graphql won't parse them again once populated)
    // json paser will run later
    req.body.variables = JSON.parse(req.body.variables)
    names.forEach(name => { 
      // add files to graphql input. we only support single images here    
      const maxCount = fieldMaxcountOptions[name]
      // we only process at top input, then using mapping args to map images to field
      // if user want to use embed File, they should use base64 instead, but it will reduce the performance        
      req.body.variables.input_0[name] = maxCount === 1 ? req.files[name][0] : req.files[name]
            
    })
    // go next
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