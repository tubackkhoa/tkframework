import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'

import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'
import AVLibraryBooks from 'material-ui/svg-icons/av/library-books'
import ImageAudiotrack from 'material-ui/svg-icons/image/audiotrack'
import ActionDashboard from 'material-ui/svg-icons/action/dashboard'

import { GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } from 'store/constants/api'
import { GoogleLogin, FacebookLogin } from 'components/Login'

import { FacebookIcon, GoogleIcon } from 'components/Login/Icon'

import AvatarButton from 'components/AvatarButton'
import LoadingButton from 'components/Common/loading_button'
import * as authSelectors from 'store/selectors/auth'


class AppBar extends React.Component {

  renderLogged(){
    return (

      <div className="">
        <RaisedButton
          className="button primary mr-10"            
          label="Quà tặng"            
          primary={true}
          icon={<ActionCardGiftcard />}            
        >
        </RaisedButton>
        
        <RaisedButton            
          primary={true}
          className="button default"   
          label="Hiện có 5.000 MCoins"                                    
        >
          <img className="arrow" src="/images/button-arrow-right.png"/>
        </RaisedButton>
        
        <IconMenu iconButtonElement={
            <IconButton>
              <AvatarButton style="small" border="green" src={this.props.user.avatar}/>
            </IconButton>
          }                    
        >

          <MenuItem primaryText="Dashboard"
                      containerElement={<Link to='/'/>}
                      leftIcon={<ActionDashboard />}
            />
            <Divider />
            {this.props.currentlySending 
              ? <MenuItem containerElement={<LoadingButton />}/>              
              : <MenuItem primaryText="Logout" onTouchTap={this.logoutSocial.bind(this)}            
                leftIcon={<ActionExitToApp />}    
                />
            }
                          
        </IconMenu>
      </div>
    )
  }

  shouldComponentUpdate(nextProps, nextState){  
    // by default when store change, it will call this function
    // mark_request_pending + replace item + mark_request_success
    return this.props.loggedIn !== nextProps.loggedIn

  }

  renderLogin(){
    return (
      <div className="mt-20"> 
        <GoogleLogin socialId={GOOGLE_CLIENT_ID}
             className="google-login mr-10"
             scope="profile"
             icon={<GoogleIcon color="#FFFFFF" size="10" />}
             primary={true}
             responseHandler={me => this.loginSocial(me, 'google')}
             label="Google"/>

        <FacebookLogin socialId={FACEBOOK_APP_ID}
           icon={<FacebookIcon color="#FFFFFF" />}
           language="en_US"
           scope="public_profile"
           xfbml={true}
           secondary={true}
           version="v2.5"
           className="facebook-login"
           responseHandler={me => this.loginSocial(me, 'facebook')}
           label="Facebook"/>
      </div>
    )
  }

  loginSocial(me, provider){  
    this.props.onLoginSocial && this.props.onLoginSocial(me, provider)
  }

  logoutSocial(){    
    this.props.onLogoutSocial && this.props.onLogoutSocial()
  }

  render() {
    const {loggedIn} = this.props    
    const navButtons = loggedIn ? this.renderLogged() : this.renderLogin()
    
    return (
      <div className="app-bar row pl-20 pr-20">      
        <div className="pull-left">
          <Link to="/">
            <img className="mt-20" src="/images/logo.png" />
          </Link>
        </div>
        <div className="pull-right">
          
          {navButtons}
          

        </div>
      </div>
    )
  }

}


AppBar.propTypes = {
  loggedIn: React.PropTypes.bool,
  currentlySending: React.PropTypes.bool  
}

// actions is map dispatch to props, by default dispatch is pass to if there is no action creator
// and ofcourse don't listen to any store (part of the whole state)
// later information will be re-hygrate, but this first state is initial from localStorage 
const mapStateToProps = (state) => ({  
  loggedIn : authSelectors.isLogged(state),
  user: authSelectors.getUser(state)
})

export default connect(mapStateToProps)(AppBar)

