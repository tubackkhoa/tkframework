import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'

import {     
  createRequestSaga
} from 'store/sagas/common'

import { setToast, log } from 'store/actions/common'
import { replaceAudio, replaceBook, replaceBooks } from 'store/actions/book'

// means users should not import this file directly
import { requestGetScheduleAsync } from './_schedule'

const requestGetAudioAsync = createRequestSaga({
  request: api.book.getAudio,
  key: 'getBookAudio',
  success: [   
    (data) => log(data.audio.cc),
    (data) => replaceAudio(data),    
  ],
})


const requestGetBookAsync = createRequestSaga({
  request: api.book.getBook,
  key: 'getBook',
  success: [   
    (data) => replaceBook(data),    
  ],
})


const requestGetBooksAsync = createRequestSaga({
  request: api.book.getBooks,
  cancel: ['app/cancelGetBooks'],
  key: 'getBooks',
  success: [   
    (data) => replaceBooks(data),    
  ],
})

const requestAddBookAsync = createRequestSaga({
  request: api.book.addBook,
  key: 'addBook',
  success: [   
    (data) => setToast(typeof data.message === 'string' ? data.message : data.message[0]),    
  ],
  failure: [
    (data) => setToast("Thử lại")
  ],
})

//--------------------------

const requestSetCommitmentAsync = createRequestSaga({
  request: api.book.setCommit,
  cancel: ['app/cancelSetCommit'],
  key: 'setCommit',
  success: [   
    (data) => replaceBooks(data),    
  ],
})


const requestSetLastReadAsync = createRequestSaga({
  request: api.book.setLastRead,
  key: 'setLastRead',
  success: [   
    (data) => replaceBooks(data),    
  ],
})


const requestSetProcessAsync = createRequestSaga({
  request: api.book.setProcess,
  key: 'setProcess',
  success: [   
    (data) => replaceBooks(data),    
  ],
})



// root saga reducer
const asyncBookFetchWatchers = [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  function* asyncBookFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [      
      takeLatest('app/getBook', requestGetBookAsync),
      takeEvery('app/getBooks', requestGetBooksAsync),
      takeLatest('app/addBook', requestAddBookAsync),
    ]
  },

  function* asyncBookAudioFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/getAudio', requestGetAudioAsync),      
    ]
  },

  // watcher for schedule, define term here
  function* asyncScheduleFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/getSchedule', requestGetScheduleAsync),      
    ]
  }
]

export default asyncBookFetchWatchers