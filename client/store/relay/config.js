import Relay from 'react-relay'


// import DefaultNetworkLayer from 'react-relay/lib/RelayDefaultNetworkLayer'
import injectNetworkLayer from './network/injectNetworkLayer'

const SUCCESS_MODIFIER = '_SUCCESS'
const RESPONSE_MODIFIER = '_RESPONSE'
export const RELAY_QUERY = 'RELAY_QUERY'
export const RELAY_MUTATION = 'RELAY_MUTATION'
export const RELAY_MUTATION_SUCCESS = RELAY_MUTATION + SUCCESS_MODIFIER
export const RELAY_QUERY_SUCCESS = RELAY_QUERY + SUCCESS_MODIFIER

/**
 * Get the promise from the request and
 * register a dispatch event for when it
 * resolves.
 * @param  {RelayQuery|RelayMutation} request
 * @param  {String} type    action type
 */
function registerResponseDispatch(request, type, dispatch) {
  request.getPromise().then(({response}) => {
    dispatch({
      type,
      payload: response
    })
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
function createRequestAction(request, type, dispatch) {
  const RESPONSE_TYPE = type + RESPONSE_MODIFIER
  const payload = parseRequestData(request)
  registerResponseDispatch(request, RESPONSE_TYPE, dispatch)
  return { type, payload }
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
  injectNetworkLayer(store)

  Relay.Store.addNetworkSubscriber(
    query => dispatch(
      createRequestAction(query, RELAY_QUERY, dispatch)
    ),
    mutation => dispatch(
      createRequestAction(mutation, RELAY_MUTATION, dispatch)
    ),
  )
}

