import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'
import { setToast, forwardTo, invokeCallback } from 'store/actions/common'
import { replaceUser, replaceUsers } from 'store/actions/user'


import {     
  createRequestSaga
} from 'store/sagas/common'


const requestGetUserAsync = createRequestSaga({
  request: api.user.getUser,
  key: 'getUser',
  success: [   
    (data) => replaceUser(data),    
    (data, {args:[id, callback]}) => invokeCallback(callback, data),
  ],
  failure: [
    (data, {args:[id, callback, error]}) => invokeCallback(error, data),
  ]
})

const requestGetUsersAsync = createRequestSaga({
  request: api.user.getUsers,
  key: 'getUsers',
  success: [   
    (data) => replaceUsers(data),        
  ],
})

const requestToggleBlockUsersAsync = createRequestSaga({
  request: api.user.toggleBlockUser,
  key: 'toggleBlockUser',
  success: [   
    // you can return other action from callback, such as getPage
    (data, {args:[token, id, callback]}) => invokeCallback(callback, data),    
  ],
  failure: [
    (data, {args:[token, id, callback, error]}) => invokeCallback(error, data),
  ]
})

// root saga reducer
export default [
  // watcher for schedule, define term here
  function* asyncUserFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeLatest('app/getUser', requestGetUserAsync),
      takeLatest('app/getUsers', requestGetUsersAsync),
      takeEvery('app/toggleBlockUser', requestToggleBlockUsersAsync),
    ]
  }
]

