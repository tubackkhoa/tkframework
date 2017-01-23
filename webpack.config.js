'use strict'
require('babel-polyfill')
const Path = require('path')
const Webpack = require('webpack')

const DEV_SERVER_PORT = process.env.PORT = process.env.PORT || 7000
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development'
const MODE_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') > -1 ? true : false
const FAIL_ON_ERROR = process.env.FAIL_ON_ERROR ? JSON.parse(process.env.FAIL_ON_ERROR) : !MODE_DEV_SERVER // disabled on dev-server mode, enabled in build mode
const OPTIMIZE = process.env.OPTIMIZE ? JSON.parse(process.env.OPTIMIZE) : NODE_ENV === 'production'
const context = Path.resolve(__dirname, 'client');
const appEntry = Path.join(context, 'index')

const plugins = [
	new Webpack.DefinePlugin({
		'process.env': {
			// Necessary for applying the correct environment everywhere
			'NODE_ENV': JSON.stringify(NODE_ENV)
		}
	})
]

if (!FAIL_ON_ERROR) {
	plugins.push(new Webpack.NoEmitOnErrorsPlugin())
}

if (OPTIMIZE) {
	plugins.push(new Webpack.optimize.OccurrenceOrderPlugin())
	plugins.push(new Webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			unused: true,
      dead_code: true,
      drop_console: true,
      // screw_ie8: true,
		},

		output: {
      comments: false
    },
    // turn off mangling entirely in case of variable rename
    sourceMap: false,
    // with module = false, no need to set this one
 		// mangle: true,
	}))
}

const conf = {
	output: {
		path: Path.join(__dirname, 'public/assets'),
		filename: 'bundle.js',
		publicPath: '/assets/'
	},
	stats: 'minimal',
	module: {
		rules: [
			// if we have many code then use cacheDirectory, but this time almost code is on node_modules
			// ?cacheDirectory=true
			{ 
				test: /\.jsx?$/, 
				loader: 'babel-loader', 
				exclude: /node_modules/, 
				query:{
					cacheDirectory: true,					
				} 
			},
			{ 
				test: /\.css$/, 				
				loaders: [
          'style-loader',
          'css-loader',
        ],
			},
			{ test: /\.json$/, loader: 'json-loader'},
			{ test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=public/fonts/[name].[ext]' },   
			// inline file as base64       
			{ test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=10000' }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: ['node_modules', './client']
	},
	plugins: plugins
}

// webpack-dev-server mode
if (MODE_DEV_SERVER) {
	plugins.push(new Webpack.NamedModulesPlugin())
	plugins.push(new Webpack.HotModuleReplacementPlugin())
	plugins.push(new Webpack.SourceMapDevToolPlugin({
		filename: '[file].map'
	}))
	conf.entry = [
	 	'babel-polyfill', //ie
		'react-hot-loader/patch', // this has to be the first loaded plugin in order to work properly!
		'webpack-dev-server/client?http://0.0.0.0:' + DEV_SERVER_PORT, // WebpackDevServer host and port
		'webpack/hot/only-dev-server', // 'only' prevents reload on syntax errors
		appEntry // appʼs entry point
	]
} else {
	conf.entry = [appEntry]
}

module.exports = conf
