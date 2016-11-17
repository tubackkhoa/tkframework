const Path = require('path')
const Webpack = require('webpack')
const OPTIMIZE = true

const appEntry = Path.join(__dirname, 'server/server')

const plugins = []

if (OPTIMIZE) {
  plugins.push(new Webpack.optimize.OccurrenceOrderPlugin(true))
  plugins.push(new Webpack.optimize.DedupePlugin())  
}

const conf = {
  target: 'node',
  output: {
    path: Path.join(__dirname, 'build/node'),
    filename: 'bundle.js',
  },  
  module: {
    loaders: [
      // if we have many code then use cacheDirectory, but this time almost code is on node_modules
      // ?cacheDirectory=true
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query:{cacheDirectory: true} },
      { test: /\.json$/, loader: 'json-loader'},
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', './server'],
  },
  plugins: plugins,
}

conf.entry = [appEntry]

module.exports = conf
