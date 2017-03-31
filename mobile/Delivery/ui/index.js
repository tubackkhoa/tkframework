import React, { Component } from 'react'
// import Relay, {
//   DefaultNetworkLayer,
// } from 'react-relay'

// import { API_BASE } from 'Delivery/store/constants/api'

import App from './containers/App'
import { Provider } from 'react-redux'
import configureStore from 'Delivery/store/config'

// Relay.injectNetworkLayer(
//   new DefaultNetworkLayer(`${API_BASE}/graphql`)
// )

export default class Delivery extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      store: null,
    }    
    configureStore(store=> this.setState({store}))
  }

  render() {    
    const {store} = this.state
    // should have a pre-load page
    if(!store)
      return false

    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
} 