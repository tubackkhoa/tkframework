import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

const initialState = {}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

if (__DEV__) {
  // we use require for dynamic import  
  const loggerMiddleware = require('./logger').default
  // add logger for development
  middleware.push(loggerMiddleware)  
}


// mount it on the Store
export const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)




