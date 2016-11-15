import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { PropTypes} from 'react'

export default class FacebookLogin extends React.Component { 

  componentDidMount() {
    (function (d, s, id, language) {
      const element = d.getElementsByTagName(s)[0]
      const fjs = element
      let js = element
      if (d.getElementById(id)) {return}
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/' + language + '/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk', this.props.language))

    window.fbAsyncInit = () => {
      FB.init({
        appId: this.props.socialId,
        xfbml: this.props.xfbml,
        cookie: this.props.cookie,
        version: this.props.version,
      })
    }    
  }

  responseApi (authResponse) {
    FB.api('/me', { fields: this.props.fields }, (me) => {
      me.accessToken = authResponse.accessToken      
      this.props.responseHandler && this.props.responseHandler(me)

    })
  }

  checkLoginState (response) {

    if (response.authResponse) {
      this.responseApi(response.authResponse)
    } else {      
      this.props.responseHandler && this.props.responseHandler({ status: response.status })      
    }
  }

  clickHandler () {
    FB.login(this.checkLoginState.bind(this), { scope: this.props.scope })
  }

  render() {
    const{language, scope, responseHandler, xfbml, version, socialId, ...props} = this.props
    return (      
        <RaisedButton {...props} onClick={this.clickHandler.bind(this)} />
    )
  }
}

FacebookLogin.propTypes = {
  socialId: PropTypes.string.isRequired,
  responseHandler: PropTypes.func,
}

FacebookLogin.defaultProps = {
  language       : 'en_US',
  scope          : 'public_profile,email',
  responseHandler: null,
  xfbml          : true,
  version        : 'v2.5'
}