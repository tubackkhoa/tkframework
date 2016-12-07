import React, { Component } from 'react'
import Relay, {
  DefaultNetworkLayer,
} from 'react-relay'

import { SERVER_BASE } from 'ReactNotes/constants'

import App from './containers/App'

Relay.injectNetworkLayer(
  new DefaultNetworkLayer(`${SERVER_BASE}/graphql`)
)

export default props => (
  <App/>
)