import { fork } from 'redux-saga/effects'
import asyncYoutubeWatchers from './youtube'

// saga must be a function like generator of other functions
const rootSaga = function* () {
  yield [       
    ...asyncYoutubeWatchers.map(watcher => fork(watcher)),
  ]
}

export default rootSaga