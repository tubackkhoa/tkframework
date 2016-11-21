import { call, put, take, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { 
  markRequestPending,
  markRequestSuccess,
  markRequestCancelled,
  markRequestFailed
} from 'store/actions/common'

import {  
  API_TIMEOUT
} from 'store/constants/api'

// create saga here
// convenient way: [] instead of polymorph, such as item is not array then [item]
// because later changes to code will be so easy, just add new row
export const createRequestSaga = ({request, key, start, stop, success, failure, cancelled, timeout, cancel}) => {

  // when we dispatch a function, redux-thunk will give it a dispatch
  // while redux-saga will give it an action instead, good for testing
  // we may not needs this if we use redux-saga, of course we can use both
  return function* (action) {    
    const requestKey = (typeof key === 'function') ? key(...action.args) : key
    // for key, we render unique key using action.args
    // but for actionCreator when callback, we should pass the whole action
    // so on event such as success, we can use action.type or action.args to 
    // do next, example: addBook => success : (data, {args:[token]}) => loadBooks(token) 
    if(start) for(let actionCreator of start){      
      yield put(actionCreator())
    }    
    // mark pending
    yield put(markRequestPending(requestKey))        
    try {

      // this is surely Error exception, assume as a request failed
      if(!request){
        throw new Error("Api method not found!!!")
      }

      // we do not wait forever for whatever request !!!
      // timeout is 0 mean default timeout, so default is 0 in case user input 0 
      let raceOptions = {
        data: call(request, ...action.args),
        isTimeout: call(delay, timeout || API_TIMEOUT)
      }

      if(cancel) {
        raceOptions.cancelRet = take(cancel)
      }

      const{data, isTimeout, cancelRet} = yield race(raceOptions)
      
      if(isTimeout){
        throw new Error(`Api method is timeout after ${timeout} ms!!!`)
      } else if(cancelRet){
        // callback on success
        if(cancelled) for(let actionCreator of cancelled){          
          yield put(actionCreator(cancelRet, action))
        }
        // mark cancelled request
        yield put(markRequestCancelled(cancelRet, requestKey))
      } else {
        // callback on success
        if(success) for(let actionCreator of success){          
          yield put(actionCreator(data, action))
        }        
        yield put(markRequestSuccess(requestKey))
      }            
      
    } catch (reason) {
      if(failure) for(let actionCreator of failure){          
        yield put(actionCreator(reason, action))
      }        
      yield put(markRequestFailed(reason, requestKey))
    } finally {
      if(stop) for(let actionCreator of stop){          
        yield put(actionCreator(reason, action))
      } 
    }
  }
}