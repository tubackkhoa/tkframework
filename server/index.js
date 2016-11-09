require('babel-register')
require('babel-polyfill')

const path       = require('path')
const express    = require('express')
const bodyParser = require('body-parser')
const app        = express()
const cors  = require('cors')
const publicPath = path.resolve(__dirname, '../public')

app.set('port', (process.env.PORT || 3000))
app.use(express.static(publicPath))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Additional middleware which will set headers that we need on each request.

// const bcrypt     = require('bcryptjs')
// const saltUtils = require('./salt')
// const salt = bcrypt.genSaltSync(10)
// users[username].password = bcrypt.hashSync(userPass, salt) 

app.use(cors())

app.use('/authors', require('./routes/authors'))

// GraphQL
app.use('/graphql', require('./routes/graphql'))

// by default we can serve the public as standalone app

app.get('*', (req, res) => {
  res.sendFile(publicPath + '/index.html')
})

app.listen(app.get('port'), () => {
  //eslint-disable-next-line no-console
  console.log('Express is listening on port ' + app.get('port') + '!')
})
