import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import NavigationBar from 'ui/frontend/components/NavigationBar'
import Footer from 'ui/shared/components/Footer'
import Toasts from 'ui/shared/components/Toasts'

import * as authSelectors from 'store/selectors/auth'
import * as authCreators from 'store/actions/auth'

class App extends React.Component{

  render(){    
    const {children} = this.props
    return (
      <div className="container-fluid">      
        <NavigationBar/>            
        {children}
        <Toasts />
        <Footer/>

      </div>
    )
  }
} 

App.propTypes = {
  children: PropTypes.node // just a node
}

// store that this component will listen to, means that changing store cause render components
const mapStateToProps = (state) => ({
  token: authSelectors.getToken(state),
})
// // actions is map dispatch to props
export default connect(mapStateToProps, authCreators)(App)
