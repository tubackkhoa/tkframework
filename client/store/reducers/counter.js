import { takeEvery, takeLatest, delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { actions } from '../../store/actions/counter'

// Our worker Saga: will perform the async increment task
// this will run in sequence and wait until the last yield completed, it may be normal action
export function* incrementAsync() {
  yield call(delay, 1000) // return as plain object when call next()
  yield put(actions.onIncrement())
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC action type
// we can use take last.v..v
export function* watchIncrementAsync() {
  yield [
    takeLatest('INCREMENT_ASYNC', incrementAsync)
  ]
}

// the normal reducer which takes input state and action then return the next state
// it does not matter the reducer function name, it will be combined
// we just care about action type
export function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return Math.max(0, state - 1)
    default:
      return state
  }
}