import { takeLatest, takeEvery } from 'redux-saga'

import api from 'ReactNotes/store/api'
import { replaceYoutube } from 'ReactNotes/store/actions/youtube'
import { setToast, invokeCallback, log } from 'ReactNotes/store/actions/common'

import {     
  createRequestSaga
} from './common'


const requestSearchAsync = createRequestSaga({
  request: api.youtube.search,
  key: 'searchYoutube',
  success: [   
    (data) => replaceYoutube(data),    
    (data) => setToast('Loading successfully!!!')
  ],
  failure: [
    (data) => log(data)
  ]
})

// root saga reducer
export default [
  // watcher for schedule, define term here
  function* asyncYoutubeWatchers() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeLatest('app/searchYoutube', requestSearchAsync),      
    ]
  }
]

