import {REHYDRATE} from 'redux-persist/constants'

/*
 * The reducer takes care of state changes in our app through actions
 */

// The initial application state, we need to store it in localStorage for later reload
// this is called static, later all state will be re-hydrate, but first time we need to know
// if this user is logged before
const initialState = {  
  loggedIn: false
}

// Takes care of changing the application state
// state is previous state, 
const loginReducer = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/setAuthState':
      return {...state, loggedIn: payload}
    case 'app/saveFacebookUser':
      return {...state, ...payload}   // {user,token}
    case 'app/saveGoogleUser':
      return {...state, ...payload}  // {user,token}
    case 'app/removeLoggedUser':
      return {...state, user: null, token: null}

    case REHYDRATE:      
      const incoming = payload.loginReducer      
      if (incoming) {
        console.log('Updated loginReducer for all!!!')
        // even return the whole payload, redux still does not update the left parts
        // and transform help to convert between two sides
        return {...state, ...incoming}
      }
      return state

    default:
      return state
  }
}

export default loginReducer