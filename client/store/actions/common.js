import { v4 } from 'uuid'
import { browserHistory } from 'react-router'

import {  
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS, 
  MARK_REQUEST_FAILED,
  MARK_REQUEST_CANCELLED
} from 'store/constants/actions'

// do nothing
export const noop = (explanation) => ({
  type: 'app/noop',
  payload: explanation,
})

// do callback and get result as paload
export const invokeCallback = (callback, ...args) => ({
  type: 'app/invokeCallback',
  payload: callback && callback.call(null, ...args),
})

export const log = (data, type='table') => {    
  console[type](data) 
  return {
    type: 'app/log',
    payload: data,
  }
}

// Little helper function to abstract going to different pages
export const forwardTo = (location) => {
  browserHistory.push(location)
  return noop(`Go to: ${location}`)
}

// mark request for later checking
export const markRequestPending = (key) => ({
  type: MARK_REQUEST_PENDING,
  meta: { key },
})

export const markRequestSuccess = (key) => ({
  type: MARK_REQUEST_SUCCESS,
  meta: { key },
})

export const markRequestCancelled = ({type, reason}, key) => ({
  type: MARK_REQUEST_CANCELLED,
  payload: `${type}: ${reason || 'called'}`,
  meta: { key },
})

// failed need a reason, because we do not know why !!!
export const markRequestFailed = (reason, key) => ({
  type: MARK_REQUEST_FAILED,
  payload: reason,
  meta: { key },
})

// show toast => we can use kind of alerts, stackbar to notify user
// with dynamic id force update everytime
export const setToast = (message, level = 'info', duration = 3000, id = v4() ) => ({
  type: 'app/setToast',
  payload: {
    id,
    message,
    level,
    duration,
  },
})

export const clearToast = () => ({
  type: 'app/clearToast',
})