import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { requests, toast, relayStore } from './common'

import loginReducer from './login'
import generalReducer from './general'
import dashboardReducer from './dashboard'
import bookReducer from './book'


// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({
	routing: routerReducer,
  ui: combineReducers({
    // ui reducer should be placed here
    toast,
  }),
  relayStore,
  requests,    
  loginReducer,

  generalReducer,
  dashboardReducer,

  bookReducer,
})

export default rootReducer

