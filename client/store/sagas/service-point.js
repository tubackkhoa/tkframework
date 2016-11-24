import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'
import { setToast, forwardTo, noop } from 'store/actions/common'
import { replaceServicePoint, replaceServicePoints } from 'store/actions/service-point'


import {     
  createRequestSaga
} from 'store/sagas/common'


const requestGetServicePointAsync = createRequestSaga({
  request: api.servicePoint.getServicePoint,
  key: 'getServicePoint',
  success: [   
    (data) => replaceServicePoint(data),    
  ],
})

const requestGetServicePointsAsync = createRequestSaga({
  request: api.servicePoint.getServicePoints,
  key: 'getServicePoints',
  success: [   
    (data) => replaceServicePoints(data),    
    // reset to empty for later edit
    (data) => replaceServicePoint({}),
  ],
})

const requestDeleteServicePointAsync = createRequestSaga({
  request: api.servicePoint.deleteServicePoint,
  key: 'deleteServicePoint',
  success: [   
    // you can return other action from callback, such as getPage
    (data, {args:[token, id, callback]}) => (callback && callback(data)) || noop('invoke success callback'),    
  ],
  failure: [
    (data, {args:[token, id, callback, error]}) => (error && error(data)) || noop('invoke error callback'),
  ]
})

const requestUpdateServicePointAsync = createRequestSaga({
  request: api.servicePoint.updateServicePoint,
  key: 'updateServicePoint',
  success: [   
    () => setToast('Update service point successfully!!!'),     
    ({id}) => forwardTo('/cms/servicepoints'),        
  ],
  failure: [
    (error) => setToast(error.message)
  ]
})

// root saga reducer
export default [
  // watcher for schedule, define term here
  function* asyncServicePointFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/updateServicePoint', requestUpdateServicePointAsync),      
      takeLatest('app/getServicePoint', requestGetServicePointAsync),
      takeLatest('app/getServicePoints', requestGetServicePointsAsync),
      takeEvery('app/deleteServicePoint', requestDeleteServicePointAsync),
    ]
  }
]

