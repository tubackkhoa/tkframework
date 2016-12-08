import React, { Component } from 'react'
import Relay, {
  DefaultNetworkLayer,
} from 'react-relay'

import { API_BASE } from 'ReactNotes/store/constants/api'

import App from './containers/App'

import { Provider } from 'react-redux'

import { store } from 'ReactNotes/store/config'

Relay.injectNetworkLayer(
  new DefaultNetworkLayer(`${API_BASE}/graphql`)
)

export default props => (
  <Provider store={store}>
    <App/>
  </Provider>
)