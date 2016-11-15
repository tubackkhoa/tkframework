// React
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import Root from './ui/root'
import configureStore from './store/config'
import { configureRelayWithStore } from './store/relay/config'
const rootElement = document.getElementById('root')

// config for store
configureStore(store => {

	// sync relay with store, for watching action, update to reducer
	configureRelayWithStore(store)
	
	const history = syncHistoryWithStore(browserHistory, store)
	
	// ready to render
	render(<Root store={store} history={history}/>, rootElement)

	// enable hot reload for react code
	if (module.hot) {
		// tracking css changes
		require('../public/assets/main.css')
		// tracking code changes
		module.hot.accept('./ui/root', () => {
			// if we use es2015 => this is native so there will be cache, we have to use another instance
			// to force rebuild, other wise just use prev Root
			// this NextRoot is other Component to render, start tracking with inside AppContainer
			const NextRoot = require('./ui/root').default			
			render (
				<AppContainer>
					<NextRoot store={store} history={history}/>
				</AppContainer>, rootElement
			)
		})					
	} 

	if (process.env.NODE_ENV === 'development') {
		// when in development, this code will be run, 
  	// check module.hot is also compiled time checking, it is not from this javascript but node env
  	window.Perf = require('react-addons-perf')	
	}

}, err => {
	render(<h1 style={{color:'red'}}>{err}</h1>, rootElement)
})

// hot fix for better output	
console.error = (logError => (msg, ...args) => 
    msg.indexOf('You cannot change <Router routes>;') === -1 
    // not React route changed
    && logError.call(console, msg, ...args)	      	      	    	  
)(console.error) 
 
// Needed for onTouchTap
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin()
