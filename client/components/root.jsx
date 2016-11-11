import React, { PropTypes } from 'react'
import { Router, applyRouterMiddleware } from 'react-router'
import Relay from 'react-relay'
import { Provider } from 'react-redux'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { Routes } from './routes'

import useRelay from 'store/relay/router'

const muiTheme = getMuiTheme({})

// const getRouter = (store, history) => {

//   return (
//     <Router
//       createElement={(Component, props) => {
//         if (Relay.isContainer(Component)) {               

//           // pending like start, success, failure corresponding to renderFetched and renderFailure
//           // while onChange is onReadyStateChange       
//           const {
//             params, 
//             route:{              
//               name, component, queries={viewer: () => Relay.QL`query { viewer }`}, 
//               prepareParams, forceFetch, pending, success, failure, onChange
//             }
//           } = props          
                  
//           return (
//             <Relay.RootContainer
//               Component={Component}
//               forceFetch={forceFetch}
//               renderLoading={pending}
//               renderFetched={success}
//               renderFailure={failure}
//               onReadyStateChange={onChange}
//               route={{
//                 name: name || component.displayName,
//                 queries: queries,
//                 params: (prepareParams ? prepareParams(params) : params)
//               }} 
//             />
//           )          
//         }
//         return (
//           <Component {...props} />
//         )
//       }}
//       children={Routes(store)}
//       history={history} 
//     />
//   )
// }

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
