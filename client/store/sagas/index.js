import { fork } from 'redux-saga/effects'

import asyncAuthWatchers from 'store/sagas/auth'
import asyncGeneralFetchWatchers from 'store/sagas/general'
import asyncBookFetchWatchers from 'store/sagas/book'

// saga must be a function like generator of other functions
const rootSaga = function* () {
  yield [   
    // ...asyncNoteFetchWatchers.map(watcher => fork(watcher)),
    // we can use single generator, but we should use a collection for later usage
    // watchIncrementAsync(),    
    ...asyncAuthWatchers.map(watcher => fork(watcher)),    
    ...asyncGeneralFetchWatchers.map(watcher => fork(watcher)),
    ...asyncBookFetchWatchers.map(watcher => fork(watcher)),
  ]
}

export default rootSaga