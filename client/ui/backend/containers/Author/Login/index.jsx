import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ErrorMessage from 'ui/shared/components/ErrorMessage'
import TextField from 'material-ui/TextField'
import inlineStyles from 'ui/shared/styles/MaterialUI'
import { login } from 'store/actions/auth'
import * as commonSelectors from 'store/selectors/common'
import * as authSelectors from 'store/selectors/auth'
import RaisedButton from 'material-ui/FlatButton'
import { withRouter } from 'react-router'


@withRouter
class AuthorLogin extends Component {

  _handleSubmit = (e) => {
    // this.props.login()
    const username = this.refs.username.input.value.trim()
    const password = this.refs.password.input.value.trim()
    this.props.login(username, password)
    e.preventDefault()
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.props.router.push('/')
    }
  }

  renderErrorMessage() {
    if(this.props.loginRequest.status === 'failure') {
      return <ErrorMessage message={this.props.loginRequest.error.message} />
    }
  }

  render() {    
    return(
      <form className="form" onSubmit={this._handleSubmit} >
        <div className="text-center">
          <h2>Sign In</h2>
          <TextField      
            ref='username'              
            hintText='username'                 
          />      
          <br/>
          <TextField                
            type='password' ref='password'                  
            hintText='••••••••••'  
          />                            
          <br/>
          {this.renderErrorMessage()}
          <RaisedButton label={'Login'} type='submit' />    
        </div>    
      </form>)
  }
}

const mapStateToProps = (state) => ({  
  loginRequest: commonSelectors.getRequest(state, 'login'),
  loggedIn : authSelectors.isLogged(state),
})

export default connect(mapStateToProps, { login })(AuthorLogin)
