import createLogger from 'redux-logger'

const loggerMiddleware = createLogger({     
  diff: true,
  duration: true,
  collapsed: (getState, { type }) => type !== 'MARK_REQUEST_FAILED',
  level: {
    prevState: () => `log`,
    action: ({ type }) => type === 'MARK_REQUEST_FAILED' ? `error` : `info`,
    error: () => `error`,
    nextState: () => `log`,
  },
  // we use this for better debug the status of request
  titleFormatter: (action, time, took) => {    
    let msg = `action @ ${time} ${action.type}`    
    if(/^MARK_REQUEST_.*$/.test(action.type)) {
      msg += `[${action.meta.key}]`    
    }
    msg += ` (in ${took.toFixed(2)} ms)`    
    return msg     
  },
  colors: {     
    prevState: () => `#777777`,
    action: ({ type }) => type === 'MARK_REQUEST_FAILED' ? `#d9534f` : `#5bc0de`,  
    nextState: () => `#449d44`,    
  },
  predicate: (getState, {type}) => type !== 'app/saveAudioTrack' && type !== 'app/log', 
})

export default loggerMiddleware