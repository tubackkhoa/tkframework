import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import AppBar from 'components/AppBar'
import Footer from 'components/Footer'
import Toasts from 'components/Toasts'

import * as loginSelectors from 'store/selectors/login'
import * as loginCreators from 'store/actions/login'

class App extends React.Component{


  onLoginSocial(me, provider){
    // const facebookToken = 'EAAZAxesz19iUBABqfgBTw1qlhZARofpCUXpnTd9PnlG5qUIOOj9vxxx0Qfps16LatTAsfrHhOXOXshJh3ZCDDOqKZAZBfq7uFTKZAu3d38wmuWNq57SXzgdEgffSonZC8BofrDb3Ivf2LT2vxOvKpiv1ZAZAZByi96YZBE1wrZBZAH3RzTgZDZD'    
    if(provider === 'facebook'){
      this.props.loginFacebook(me.accessToken)
    } else {
      this.props.loginGoogle(me.accessToken)
    }
  }

  onLogoutSocial(){    
    this.props.logout(this.props.token.accessToken)
  }

  render(){    
    const {children} = this.props
    return (
      <div className="container-fluid">      
        <AppBar 
          onLoginSocial={this.onLoginSocial.bind(this)} 
          onLogoutSocial={this.onLogoutSocial.bind(this)} 
        />        
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
  token: loginSelectors.getToken(state),
})
// // actions is map dispatch to props
export default connect(mapStateToProps, loginCreators)(App)
