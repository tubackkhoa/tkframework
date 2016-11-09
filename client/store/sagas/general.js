import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'

import {     
  createRequestSaga
} from 'store/sagas/common'

import { replaceCommits } from 'store/actions/general'

const requestGetCommitsAsync = createRequestSaga({
  request: api.general.getCommits,
  key: 'general',
  success: [   
    (commits) => replaceCommits(commits)
  ],
})


// root saga reducer
const asyncGeneralFetchWatchers = [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  function* asyncGeneralFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/getCommits', requestGetCommitsAsync)
    ]
  }
]

export default asyncGeneralFetchWatchers