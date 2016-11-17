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

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    
    return (
      <AppBar
        showMenuIconButton={false}
        title={config.authorName}
        style={inlineStyles.appBar.root}
        titleStyle={inlineStyles.appBar.title}        
        zDepth={0}
        onTitleTouchTap={()=> this.context.router.push('/')}
        iconStyleRight={inlineStyles.appBar.elementRight}
        iconElementRight={
            <div>
                <Link to="/about" >
                    <IconButton name="about-button" disableTouchRipple={true} >
                        <SocialPerson color={inlineStyles.iconColor} />
                    </IconButton>
                </Link>
                <Link to="/posts" >
                    <IconButton name="post-button" disableTouchRipple={true} >
                        <ActionDescription color={inlineStyles.iconColor} />
                    </IconButton>
                </Link>
                <Link to="/projects" >
                    <IconButton name="project-button" disableTouchRipple={true} >
                        <AvWeb color={inlineStyles.iconColor} />
                    </IconButton>
                </Link>
                <a href={config.gitHubUrl} >
                    <IconButton
                    iconStyle={inlineStyles.appBar.gitHubButton}
                    name="git-hub-button"
                    disableTouchRipple={true}
                    >
                      <FontIcon className="muidocs-icon-custom-git-hub" style={inlineStyles.appBar.iconStyles} />
                    </IconButton>
                </a>

                <div className="pull-right"> 
                  <Link to="/login">         
                    <div className="mt-5"> 
                      <RaisedButton primary={true} label="Login"/>        
                    </div>
                  </Link>          
                </div>

            </div>

        }
      />

    )
  }
}

export default NavigationBar
