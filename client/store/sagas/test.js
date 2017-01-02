import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'
import { setToast, forwardTo, invokeCallback } from 'store/actions/common'
import { replaceTest, replaceTests } from 'store/actions/test'


import {     
  createRequestSaga
} from 'store/sagas/common'


const requestGetTestAsync = createRequestSaga({
  request: api.test.getTest,
  key: 'getTest',
  success: [   
    (data) => replaceTest(data),    
  ],
})

const requestGetTestsAsync = createRequestSaga({
  request: api.test.getTests,
  key: 'getTests',
  success: [   
    (data) => replaceTests(data),    
    // reset to empty for later edit
    (data) => replaceTest({}),
  ],
})

const requestDeleteTestsAsync = createRequestSaga({
  request: api.test.deleteTest,
  key: 'deleteTest',
  success: [   
    // you can return other action from callback, such as getPage
    (data, {args:[token, id, callback]}) => invokeCallback(callback, data),
  ],
  failure: [
    (data, {args:[token, id, callback, error]}) => invokeCallback(error, data),
  ]
})

const requestUpdateTestAsync = createRequestSaga({
  request: api.test.updateTest,
  key: 'updateTest',
  success: [   
    () => setToast('Update sell post successfully!!!'),     
    ({id}) => forwardTo('/cms/tests'),        
  ],
  failure: [
    (error) => setToast(error.message)
  ]
})

// root saga reducer
export default [
  // watcher for schedule, define term here
  function* asyncTestFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/updateTest', requestUpdateTestAsync),      
      takeLatest('app/getTest', requestGetTestAsync),
      takeLatest('app/getTests', requestGetTestsAsync),
      takeEvery('app/deleteTest', requestDeleteTestsAsync),
    ]
  }
]

