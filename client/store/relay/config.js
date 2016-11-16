import Relay from 'react-relay'
import {
  markRequestPending,
  markRequestSuccess, 
  markRequestFailed,
} from 'store/actions/common'

// import DefaultNetworkLayer from 'react-relay/lib/RelayDefaultNetworkLayer'
import injectNetworkLayer from './network/injectNetworkLayer'

import { setToast, forwardTo } from 'store/actions/common'

import api from 'store/api'
import {saveRefreshToken} from 'store/actions/auth'

/**
 * Get the promise from the request and
 * register a dispatch event for when it
 * resolves.
 * @param  {RelayQuery|RelayMutation} request
 * @param  {String} type    action type
 */
function registerResponseDispatch(request, requestKey, dispatch, token) {
  request.getPromise().then(({response}) => {
    console.log('[RELAY-NETWORK] Response:', response)
    dispatch(markRequestSuccess(requestKey))
  }).catch(err=>{
    dispatch(markRequestFailed(err.message, requestKey))
    // user has signed in
    if(token){
      // tell user to wait
      dispatch(setToast('Refreshing token... You should reload page for sure!'))
      // try refresh token, then reload page ?
      api.auth.refreshAccessToken(token.refreshToken)          
        .then(newToken => {          
          // call action creator to update
          dispatch(saveRefreshToken(newToken.accessToken))            
        })
        .catch(err => console.log('[client.js] ERROR can not refresh token', err))
    }    
    
  })
}

/**
 * Parses the data from the request and builds
 * an FSA-compliant action. Also registers
 * a dispatch event with the response.
 * @param  {RelayQuery|RelayMutation} request
 * @param  {String} type    action type
 * @return {Object}         FSA
 */
function createRequestAction(request, type, dispatch, token) {  
  const payload = parseRequestData(request)
  const requestKey = type + '_' + (payload.ID || payload.name)
  registerResponseDispatch(request, requestKey, dispatch, token)
  return markRequestPending(requestKey)
}


/**
 * Queries metadata from mutations and
 * queries, returns an object containing
 * those values.
 * @param  {RelayQuery|RelayMutation} request
 * @return {Object}        request data
 */
function parseRequestData(request) {
  const queryString = request.getQueryString()
  const variables = request.getVariables()
  let data = {
    request,
    queryString,
    variables
  }

  if (request._mutation) {
    data = {
      ...data,
      files: request.getFiles(),
      name: request.getMutation().getCall().name
    }
  }

  if (request._query) {
    data = {
      ...data,
      ID: request.getID(),
      name: request.getDebugName()
    }
  }
  return data
}

/**
 * Calls addNetworkSubscriber to register dispatchers
 * when a mutation or query is processed in the
 * network layer.
 * @param {Relay.Environment} environment
 * @param {Function}          dispatch    Store.dispatch
 * we call this internal so no need to publish as sagas
 */
export function configureRelayWithStore(store) {
  const {dispatch} = store
  window.store = store
  if (typeof dispatch !== 'function') {
    throw new Error(
      'RelayNetworkDispatch(...): you did not pass a dispatch function ' +
      'as the second argument. RelayNetworkDispatch will be unable ' +
      'to dispatch actions to your Redux store.'
    )
  }
  // inject network
  // Relay.injectNetworkLayer(new DefaultNetworkLayer(GRAPHQL_ENDPOINT))
  const {token} = injectNetworkLayer(store)

  Relay.Store.addNetworkSubscriber(
    query => dispatch(
      createRequestAction(query, 'relay_query', dispatch, token)
    ),
    mutation => dispatch(
      createRequestAction(mutation, 'relay_mutation', dispatch, token)
    ),
  )
}

