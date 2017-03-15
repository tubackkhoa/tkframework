import { combineReducers } from 'redux'
import { requests, toast } from './common'
import { youtubeReducer as youtube } from './youtube'

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

