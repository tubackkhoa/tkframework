'use strict'

const Path = require('path')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const WebpackConfig = require('./webpack.config')

const DEV_SERVER_PORT = process.env.PORT;

new WebpackDevServer(Webpack(WebpackConfig), {
	publicPath: WebpackConfig.output.publicPath,
	hot: true,
	historyApiFallback: true,
	contentBase: Path.join(__dirname, 'public'),
	stats: {
		colors: true,
		chunks: false
	}
}).listen(DEV_SERVER_PORT, 'localhost', function (err, result) {
	if (err) {
		return console.log(err)
	}

	console.log('Listening at http://localhost:' + DEV_SERVER_PORT + '/')
	console.log('NODE_ENV=[' + process.env.NODE_ENV + ']')
	// watch files changed then call sass
	const exec = require('child_process').exec
	const watch = require('node-watch') 
	const colors = require('colors')

	watch('stylesheets', function(filename) {
		if (/\.(?:scss|sass)$/.test(filename)) {	  		  	
	  	// just output to console
	    exec('npm run sass --silent', function(error, stdout, stderr) {	    	
			  if (error) {
			    console.error(colors.red(error));
			    return;
			  } else {
			  	console.log(colors.green('Compiled: ' + filename));
			  }
			})
	  }
	})

})




