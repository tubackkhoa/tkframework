// now normal code
import path       from 'path'
import express   from 'express'
import bodyParser from 'body-parser'
import cors  from 'cors'
import { jwtSecret, publicPath }   from 'config/constants'
import expressJwt from 'express-jwt'
import passport from 'passport/local'
import compression from 'compression'
import http from 'http'
import StatusCode from 'routes/status'
import chatServer from './chat-server'

const authenticate = expressJwt({
  secret: jwtSecret,
  credentialsRequired: false,
  userProperty: 'user',
})
const app = express()
const server = http.Server(app)
const websocket = chatServer(server)

// we use this to authenticate the specific router
app.set('port', (process.env.PORT || 3333))
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(authenticate)
// Additional middleware which will set headers that we need on each request.
app.use(cors())

/***** use require directly help use change only one line :D *****/

// we use normal authentication for universal access
app.use('/auth', require('./routes/auth').default)
// api for client
app.use('/api', require('./routes/api').default)
// GraphQL
app.use('/graphql', require('./routes/graphql').default)

// static folder and file, you can use nginx to server, and override file path with public path
app.use(compression({level:9}))
app.use(express.static(publicPath))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath + '/index.html'))
})

// exception goes here, log here
app.use((err, req, res, next) => res.send({code:StatusCode.SERVER_ERROR, message: err.message}))

server.listen(app.get('port'), () => {
  //eslint-disable-next-line no-console
  console.log('Express is listening on port ' + app.get('port') + '!')
})



