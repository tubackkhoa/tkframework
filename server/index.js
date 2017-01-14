require('source-map-support').install()
// help using babel syntax
require('babel-register')({
  sourceMaps: true
})
require('./server')