require('babel-register')
require('babel-polyfill')

const path       = require('path')
const express    = require('express')
const bodyParser = require('body-parser')
const app        = express()
const cors  = require('cors')

const constants   = require('config/constants.json')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const graphQLServer = require('./routes/graphql')
const publicPath = path.resolve(__dirname, '../public')

app.set('port', (process.env.PORT || 3000))
app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Additional middleware which will set headers that we need on each request.
app.use(cors())

app.use(expressJwt({
  secret: constants.jwtSecret,
  credentialsRequired: false,
  userProperty: 'user',
}))

app.get('/users', (req, res) => {
  const token = jwt.sign({
    id: 12,
    name: 'thanhtu',    
  }, constants.jwtSecret)  
  res.send(token)
})

app.get('/info', (req, res) => {
  res.send(req.user)
})

// we use normal authentication for universal access
app.use('/authors', require('./routes/authors'))

// GraphQL
app.use('/graphql', graphQLServer.GraphHTTP)

// declare route for batch query
app.use('/graphql/batch', bodyParser.json(), graphQLServer.GraphBatchHTTP)

// by default we can serve the public as standalone app

app.get('*', (req, res) => {
  res.sendFile(publicPath + '/index.html')
})

app.listen(app.get('port'), () => {
  //eslint-disable-next-line no-console
  console.log('Express is listening on port ' + app.get('port') + '!')
})
