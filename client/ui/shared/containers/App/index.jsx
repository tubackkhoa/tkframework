import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import LoginNavigationBar from 'ui/frontend/components/NavigationBar'
import LoggedNavigationBar from 'ui/backend/components/NavigationBar'
import LinearProgress from 'material-ui/LinearProgress'
import inlineStyles from 'ui/shared/styles/MaterialUI/index'
import Footer from 'ui/shared/components/Footer'
import Toasts from 'ui/shared/components/Toasts'

import * as authSelectors from 'store/selectors/auth'
import * as commonSelectors from 'store/selectors/common'
import * as authCreators from 'store/actions/auth'

// this helps changing one line to modify logic
@connect(state => ({
  loggedIn        : authSelectors.isLogged(state),
  requestsPending : commonSelectors.areRequestsPending(state),
}), authCreators)
export default class extends React.Component{

  render(){    
    const {children, loggedIn, requestsPending, logout} = this.props
    return (
      <div className="container-fluid p-0">     

        {requestsPending && // if there were some requests pending
          <LinearProgress
            mode="indeterminate"
            min={70} max={75}
            color={inlineStyles.progressColor}
            style={inlineStyles.progressBar}
          />
        }

        {loggedIn // check login
          ? <LoggedNavigationBar onLogout={logout} />
          : <LoginNavigationBar/>
        }
        <div className="container">
          {children}
        </div>
        <Toasts />
        <Footer/>

      </div>
    )
  }
} 
