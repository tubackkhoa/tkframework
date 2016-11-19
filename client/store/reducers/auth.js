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
export const authReducer = (state = initialState, {type, payload}) => {
  switch (type) {   
    case 'app/setAuthState':
      return {...state, loggedIn: payload}
    case 'app/saveLoggedUser':
      return {...state, ...payload}   // {user,token}
    case 'app/removeLoggedUser':
      return {...state, user: null, token: null}
    case 'app/saveRefreshToken':
      // payload is access token
      return {...state, token: {...state.token, ...payload} }   
    case 'app/updateAuthor':
      // do not store this, it is global id
      const { __dataID__, id, ...author } = payload
      return { ...state, user: {...state.user, ...author } } 
    case 'app/updateSocialAccount':
      // copy then update url
      const social_accounts = state.user.social_accounts.slice(0)
      social_accounts[payload.sortRank].url = payload.url
    return { ...state, user: {...state.user,  social_accounts} }
    
    case REHYDRATE:      
      // save reject token do nothing
      const incoming = payload.auth
      if (incoming) {
        console.log('Updated authReducer for all!!!', incoming)
        // even return the whole payload, redux still does not update the left parts
        // and transform help to convert between two sides
        return {...state, ...incoming}
      }
      return state

    default:
      return state
  }
}

