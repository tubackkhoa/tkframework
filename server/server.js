// now normal code
import path       from 'path'
import express   from'express'
import bodyParser from 'body-parser'
import cors  from 'cors'
import constants   from 'config/constants.json'
import expressJwt from 'express-jwt'
import passport from 'passport/local'

const publicPath = path.resolve(__dirname, '../public')
const authenticate = expressJwt({
  secret: constants.jwtSecret,
  credentialsRequired: false,
  userProperty: 'user',
})
const app = express()
// we use this to authenticate the specific router
app.set('port', (process.env.PORT || 3000))
app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())

// Additional middleware which will set headers that we need on each request.
app.use(cors())

/***** use require directly help use change only one line :D *****/

// we use normal authentication for universal access
app.use('/auth', require('./routes/auth').default)

// GraphQL
app.use('/graphql', authenticate, require('./routes/graphql').default)

// by default we can serve the public as standalone app
app.get('*', (req, res) => {
  res.sendFile(publicPath + '/index.html')
})

app.listen(app.get('port'), () => {
  //eslint-disable-next-line no-console
  console.log('Express is listening on port ' + app.get('port') + '!')
})
