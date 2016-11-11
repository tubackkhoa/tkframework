import Relay from 'react-relay'

import {
  RelayNetworkLayer, retryMiddleware, urlMiddleware, authMiddleware, loggerMiddleware,
  perfMiddleware, gqErrorsMiddleware
} from 'react-relay-network-layer'

import {API_BASE} from 'store/constants/api'

const injectNetWorkLayer = (store) => {
  const state = store.getState()
  // use selector to get token, later we can use selector library for smaller state
  Relay.injectNetworkLayer(new RelayNetworkLayer([
    urlMiddleware({
      url: (req) => API_BASE + '/graphql',
      batchUrl: (req) => API_BASE + '/graphql/batch', // <--- route for batch queries
    }),
    loggerMiddleware(),
    gqErrorsMiddleware(),
    perfMiddleware(),
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
      token: () => 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5hbWUiOiJ0aGFuaHR1IiwiaWF0IjoxNDc4ODQxNTM3fQ.codNq-eiN0i300WFajkLw5HQhsIltbvgL6AZJIvA02Q',
      tokenRefreshPromise: (req) => {
        console.log('[client.js] resolve token refresh', req)
        // call refresh token action here
      },
    }),

    // example of the custom inline middleware
    next => req => next(req),

  ], { disableBatchQuery: false }))  // enable batch query for the future
}

export default injectNetWorkLayer

