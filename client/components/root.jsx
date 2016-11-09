import React, { PropTypes } from 'react'
import { Router} from 'react-router'
import Relay from 'react-relay'
import { Provider } from 'react-redux'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Routes } from './routes'

const muiTheme = getMuiTheme({});

const getRouter = (store, history) => {

  return (
    <Router
      createElement={(Route, props) => {
        if (Relay.isContainer(Route)) {               

          // pending like start, success, failure corresponding to renderFetched and renderFailure
          // while onChange is onReadyStateChange       
          const {
            params, 
            route:{
              component, queries={viewer: () => Relay.QL`query { viewer }`}, 
              prepareParams, forceFetch, pending, success, failure, onChange
            }
          } = props          
                  
          return (
            <Relay.RootContainer
              Component={Route}
              forceFetch={forceFetch}
              renderLoading={pending}
              renderFetched={success}
              renderFailure={failure}
              onReadyStateChange={onChange}
              route={{
                name: component.displayName,
                queries: queries,
                params: (prepareParams ? prepareParams(params) : params)
              }} 
            />
          )          
        }
        return (
          <Route {...props} />
        )
      }}
      children={Routes(store)}
      history={history} 
    />
  )
}

const Root = ({ store, history }) => (
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			{getRouter(store, history)}
		</MuiThemeProvider>
	</Provider>
)

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
}

export default Root
