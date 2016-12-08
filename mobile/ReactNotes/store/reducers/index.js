import { combineReducers } from 'redux'
import { youtubeReducer as youtube } from './youtube'
import { requests, toast } from './common'

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({
  youtube,
  ui: combineReducers({
    // ui reducer should be placed here    
    toast,
  }),  
  requests, 
})

export default rootReducer

