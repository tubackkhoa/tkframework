import { fork } from 'redux-saga/effects'

import asyncAuthWatchers from 'store/sagas/auth'
import asyncTagFetchWatchers from 'store/sagas/tag'
import asyncPostFetchWatchers from 'store/sagas/post'

import asyncSellPostFetchWatchers from 'store/sagas/sellpost'
import asyncServicePointFetchWatchers from 'store/sagas/service-point'
import asyncNewsPostFetchWatchers from 'store/sagas/newspost'
import asyncUserFetchWatchers from 'store/sagas/user'

// saga must be a function like generator of other functions
const rootSaga = function* () {
  yield [   
    // ...asyncNoteFetchWatchers.map(watcher => fork(watcher)),
    // we can use single generator, but we should use a collection for later usage
    // watchIncrementAsync(),    
    ...asyncAuthWatchers.map(watcher => fork(watcher)),    
    ...asyncTagFetchWatchers.map(watcher => fork(watcher)),
    ...asyncPostFetchWatchers.map(watcher => fork(watcher)),

    // make watcher for better groups of functions
    ...asyncSellPostFetchWatchers.map(watcher => fork(watcher)),
    ...asyncServicePointFetchWatchers.map(watcher => fork(watcher)),
    ...asyncNewsPostFetchWatchers.map(watcher => fork(watcher)),
    ...asyncUserFetchWatchers.map(watcher => fork(watcher)),
  ]
}

export default rootSaga