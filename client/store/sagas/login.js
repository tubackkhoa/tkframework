import { takeLatest, takeEvery } from 'redux-saga'
import {browserHistory} from 'react-router'

import api from 'store/api'
import { createRequestSaga } from 'store/sagas/common'
import { setToast, noop } from 'store/actions/common'

import { 
  setAuthState, 
  saveFacebookUser, 
  saveGoogleUser, 
  removeLoggedUser 
} from 'store/actions/login'

// Little helper function to abstract going to different pages
const forwardTo = (location) => {
  browserHistory.push(location)
  return noop(`Go to: ${location}`)
}

const requestLoginFacebookAsync = createRequestSaga({
  request: api.auth.loginFacebook,
  key: 'loginFacebook',
  cancel: 'app/logout',
  success: [   
    (data) => saveFacebookUser(data),       
    () => setAuthState(true),
    () => setToast('Logged successfully!!!'), 
    // () => forwardTo('/dashboard'),
  ],
  failure: [ 
    () => setToast('Couldn\'t login', 'error') 
  ],
})


const requestLoginGoogleAsync = createRequestSaga({
  request: api.auth.loginGoogle,
  key: 'loginGoogle',
  cancel: 'app/logout',
  success: [   
    (data) => saveGoogleUser(data),   
    () => setAuthState(true),    
    () => setToast('Logged successfully!!!'), 
    // () => forwardTo('/dashboard'), // action creator may return nothing to match
  ],
  failure: [ 
    () => setToast('Couldn\'t login', 'error') 
  ],
})


const requestLogoutAsync = createRequestSaga({
  request: api.auth.logout,
  key: 'logout',
  success: [       
    () => removeLoggedUser(),    
    () => setAuthState(false),  
    () => setToast('Logout successfully!!!'),  
    () => forwardTo('/'),
  ],
  failure: [ 
    () => setToast('Couldn\'t logout', 'error') 
  ],
})



// root saga reducer
const asyncLoginWatchers = [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  function* asyncLoginFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [      
      takeLatest('app/loginFacebook', requestLoginFacebookAsync),
      takeLatest('app/loginGoogle', requestLoginGoogleAsync),
    ]
  },

  function* asyncLogoutFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeLatest('app/logout', requestLogoutAsync),      
    ]
  }
]

export default asyncLoginWatchers

