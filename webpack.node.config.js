const Path = require('path')
const Webpack = require('webpack')
const OPTIMIZE = true

const appEntry = Path.join(__dirname, 'server/server')

const plugins = []

if (OPTIMIZE) {
  plugins.push(new Webpack.optimize.OccurrenceOrderPlugin(true))
  plugins.push(new Webpack.optimize.DedupePlugin())  
  plugins.push(new Webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      unused: true,
      dead_code: true,
      drop_console: true,
    },
    output: {
      comments: false
    },
    // turn off mangling entirely in case of variable rename
    sourceMap: false,
    // mangle can make node stop working because of some global variables
    // mangle: true
  }))
}

const conf = {
  target: 'node',
  output: {
    path: Path.join(__dirname, 'build/node'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },  
  externals: [
      // these modules will be included because of dynamic resolvers
      /^(?:express|graphql|sequelize|bindings|multer|isomorphic-fetch)/i,
  ],
  module: {
    rules: [
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
