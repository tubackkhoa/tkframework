// Redux
import { applyMiddleware, compose, createStore } from 'redux'

import createSagaMiddleware from 'redux-saga'
import SagaManager from './sagas/saga-manager'

import { persistStore, createTransform } from 'redux-persist'

import rootReducer from './reducers'
import rootSaga from './sagas'

// set default values for state here
const initialState = {}

const sagaMiddleware = createSagaMiddleware()
// we use redux-saga and redux-logger for development env
const middleware = [sagaMiddleware]

if (process.env.NODE_ENV === 'development') {
  // we use require for dynamic import  
  const loggerMiddleware = require('./logger').default
  // add logger for development
  middleware.push(loggerMiddleware)  
}

// saga is just a watcher for reducer, no persistent state at all
const configureStore = (callback, failure) => {
  
  // const reference
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      // if you use getStoredState then no need to use auto hydrate to get state back
      // autoRehydrate(),
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : x => x
    )
  )

  // run saga after store is created, via saga manager with action checking
  SagaManager.startSagas(sagaMiddleware, [rootSaga])

  // when this file changed, we replace all reducers
  // no way webpack can help
  if (module.hot) {
    
    // Enable Webpack hot module replacement for reducers
    // for ES2015 we have to re-import, because it is native in browser
    // so re-import will help webpack replace the old one
    // with babel transform, it is automatically replace via transforming code
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default     
      store.replaceReducer(nextRootReducer)

    })
    module.hot.accept('./sagas', () => {
      // cancel old sagas then start new sagas
      const nextRootSaga = require('./sagas').default
      SagaManager.cancelSagas(store)
      SagaManager.startSagas(sagaMiddleware, [nextRootSaga])

    })
  }
  
  // persist this store, each time state change it will rehydrate the store
  // use localforage wrapper when WEBSQL is ready on all browsers
  // we save only audioTrack from bookReducer and all from loginReducer
  const authTransform = createTransform(
    // transform state coming form redux on its way to being serialized and stored
    // such as {key1}=>{key1.tolower} means store into localStorage as lower case
    inboundState => inboundState,
    // transform state coming from storage, on its way to be rehydrated into redux 
    // such as {key1}=>{key1:key1.toupper} means get from localStorage and transform it to uppercase in store
    outboundState => outboundState,      
    {whitelist: ['auth']}
  )

  // persist Store tell redux to store only some attribute from state to local storage
  // why in each reducer, we should implement rehydrate to restore back the state
  // this will trigger save to local each updated event 
  persistStore(store, {
    whitelist: ['auth'],
    keyPrefix: 'tk:',
    transforms: [authTransform]
  }, ()=>{
    // log to know
    // console.log('rehydration complete')
    // to make sure we have restore fully state 
    callback(store)
  })
  // pure store to test
    // .purge(['bookReducer'])
    // .purgeAll()
  // callback function when store is ready  
  
}

export default configureStore