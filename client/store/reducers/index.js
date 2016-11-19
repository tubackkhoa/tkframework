import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { requests, toast } from './common'
import { reducer as form } from 'redux-form'

import authReducer from './auth'

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({
	routing: routerReducer,
  form, // for complex reducer, should put at root
  ui: combineReducers({
    // ui reducer should be placed here    
    toast,
  }),  
  requests,    
  authReducer,
})

export default rootReducer

