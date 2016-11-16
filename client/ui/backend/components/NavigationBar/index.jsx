import React, { PropTypes, Component } from 'react'
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

import * as authSelectors from 'store/selectors/auth'

import AppBar  from 'material-ui/AppBar'
import AvWeb from 'material-ui/svg-icons/av/web'
import ActionDescription from 'material-ui/svg-icons/action/description'
import SocialPerson from 'material-ui/svg-icons/social/person'

import AvatarButton from 'ui/shared/components/AvatarButton'
import config from 'ui/shared/config'
import inlineStyles from 'ui/shared/styles/MaterialUI'


class NavigationBar extends Component {

  _handleLogout = (e) => {
    e.preventDefault()
    this.props.onLogout && this.props.onLogout()
  }

  render() {
    const {user} = this.props
    const avatar = `/uploads/author/image/${user.id}/${user.image}`
    const anchorOrigin = {horizontal: 'left', vertical: 'bottom'}
    const targetOrigin = {horizontal: 'left', vertical: 'top'}
    return (
      <AppBar
        showMenuIconButton={false}
        title={config.authorName}
        style={inlineStyles.appBar.root}
        titleStyle={inlineStyles.appBar.title}        
        zDepth={0}
        iconStyleRight={inlineStyles.appBar.elementRight}
        iconElementRight={
            <div>                

                <Link to="/cms/posts" >
                    <IconButton name="post-button" disableTouchRipple={true} >
                        <ActionDescription color={inlineStyles.iconColor} />
                    </IconButton>
                </Link>

                <IconMenu
                  iconButtonElement={
                    <IconButton name="project-button" disableTouchRipple={true} >
                      <AvWeb color={inlineStyles.iconColor}/>
                    </IconButton>
                  }
                  anchorOrigin={anchorOrigin}
                  targetOrigin={targetOrigin}
                >
                  
                    <MenuItem primaryText="Edit" 
                      containerElement={<Link to="/cms/projects" />}
                    />
                  
                    <MenuItem primaryText="Preview" 
                      containerElement={<Link to="/cms/projects/preview" />}
                    />
                </IconMenu>            

                                        
                <IconMenu iconButtonElement={
                    <IconButton disableTouchRipple={true}>
                      <AvatarButton size={24} src={avatar}/>
                    </IconButton>
                  }
                  anchorOrigin={anchorOrigin}
                  targetOrigin={targetOrigin}                   
                >

                  <MenuItem primaryText="Edit"
                              containerElement={<Link to='/cms/about/edit'/>}
                              leftIcon={<SocialPerson />}
                  />
                  
                  <Divider />             
                  <MenuItem primaryText="Logout" onTouchTap={this._handleLogout}            
                    leftIcon={<ActionExitToApp />}    
                  />
                    
                                  
                </IconMenu>
                

            </div>

        }
      />

    )
  }
}

// actions is map dispatch to props, by default dispatch is pass to if there is no action creator
// and ofcourse don't listen to any store (part of the whole state)
// later information will be re-hygrate, but this first state is initial from localStorage 
const mapStateToProps = (state) => ({  
  user: authSelectors.getUser(state)
})

export default connect(mapStateToProps)(NavigationBar)
