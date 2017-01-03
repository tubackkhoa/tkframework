import React, { PropTypes } from 'react'
import { Router, applyRouterMiddleware } from 'react-router'
import Relay from 'react-relay'
import { Provider } from 'react-redux'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import myTheme from 'ui/shared/theme'
// we can use many routes in this file
import { Routes } from './routes'
import useRelay from 'store/relay/router'

const muiTheme = getMuiTheme(myTheme)

const Root = ({ store, history }) => (
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
      <Router      
        environment={Relay.Store}
        history={history}
        render={applyRouterMiddleware(useRelay)} 
        children={Routes(store)}
      />    		
		</MuiThemeProvider>
	</Provider>
)

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
}

export default Root
