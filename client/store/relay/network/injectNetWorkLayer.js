import Relay from 'react-relay'

import {
  RelayNetworkLayer, retryMiddleware, urlMiddleware, authMiddleware, loggerMiddleware,
  perfMiddleware, gqErrorsMiddleware
} from 'react-relay-network-layer'

import {API_BASE} from 'store/constants/api'
// import api from 'store/api'
import * as authSelectors from 'store/selectors/auth'
// import {saveRefreshToken} from 'store/actions/auth'

const injectNetWorkLayer = (store) => {

  const relayMiddlewares = [
    urlMiddleware({
      url: (req) => API_BASE + '/graphql',
      batchUrl: (req) => API_BASE + '/graphql/batch', // <--- route for batch queries
    }),    
    retryMiddleware({
      fetchTimeout: 15000,
      // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
      retryDelays: (attempt) => Math.pow(2, attempt + 4) * 100, 
      forceRetry: (cb, delay) => { 
        window.forceRelayRetry = cb
        console.log('call `forceRelayRetry()` for immediately retry! Or wait ' + delay + ' ms.')
      },
      statusCodes: [500, 503, 504],
    }),
    authMiddleware({
      // we will refresh token in config, to log messages in more detail
      token: () => {
        // each time it will return as header
        const token = authSelectors.getToken(store.getState())  
        return token ? token.accessToken : null
      },
      allowEmptyToken: true,
      // tokenRefreshPromise: (req) => {
      //   console.log('[client.js] resolve token refresh', req)
      //   if(!token){
      //     return new Promise((resolve, reject)=>resolve(null))
      //   }
      //   // call refresh token action here
      //   return api.auth.refreshAccessToken(token.refreshToken)          
      //     .then(newToken => {
      //       const accessToken = newToken.accessToken
      //       // call action creator to update
      //       store.dispatch(saveRefreshToken(newToken))
      //       // then return accessToken
      //       return accessToken
      //     })
      //     .catch(err => console.log('[client.js] ERROR can not refresh token', err))
      // },
    }),

    // example of the custom inline middleware
    // next => req => next(req),
  ]

  if (process.env.NODE_ENV === 'development') {
    relayMiddlewares.push(...[
      loggerMiddleware(),
      gqErrorsMiddleware(),
      perfMiddleware(),
    ])    
  }

  // use selector to get token, later we can use selector library for smaller state
  Relay.injectNetworkLayer(new RelayNetworkLayer(relayMiddlewares, { 
    disableBatchQuery: false 
  }))  // enable batch query for the future

}

export default injectNetWorkLayer

