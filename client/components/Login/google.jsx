import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { PropTypes} from 'react'

export default class GoogleLogin extends React.Component{

  componentDidMount () {
    (function(d, s, id){
    const gs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {return}
    let js = d.createElement(s) 
    js.id = id
    js.src = 'https://apis.google.com/js/platform.js'
    gs.parentNode.insertBefore(js, gs)
   }(document, 'script', 'google-platform'))    
  }  

  clickHandler () {  

    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: this.props.socialId,
        fetch_basic_profile: false,
        scope: this.props.scope
      })
      auth2.signIn().then((user) => {
        // for convenient way to access directly
        user.accessToken = user.getAuthResponse().id_token
        this.props.responseHandler && this.props.responseHandler(user)
      })
    })
  }

  render () {
    const {socialId, scope, responseHandler, ...props} = this.props    
    return (
      <RaisedButton {...props} onClick={this.clickHandler.bind(this)} />
    )
  }
}

GoogleLogin.propTypes = {
  socialId: PropTypes.string.isRequired
}

GoogleLogin.defaultProps = {
  scope          : 'profile',
  responseHandler: null,
}