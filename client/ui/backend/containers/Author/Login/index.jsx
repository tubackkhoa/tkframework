import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import ErrorMessage from 'ui/shared/components/ErrorMessage'
import TextField from 'material-ui/TextField'
import inlineStyles from 'ui/shared/styles/MaterialUI'
import { login } from 'store/actions/auth'
import * as commonSelectors from 'store/selectors/common'
import * as authSelectors from 'store/selectors/auth'
import RaisedButton from 'material-ui/FlatButton'
// import { withRouter } from 'react-router'

import { 
  renderTextField, 
  renderCheckbox, 
} from 'ui/backend/shared/utils'

const validate = (values) => {
  const errors = {}
  // first time it is empty
  if(!values) return errors
  if (!values.username) errors.username = 'Enter username'
  if (!values.password) errors.password = 'Enter password'

  return errors
}

const mapStateToProps = (state) => ({  
  initialValues: {remember: false},
  loginRequest: commonSelectors.getRequest(state, 'login'),
  loggedIn : authSelectors.isLogged(state),
})

// @withRouter
@connect(mapStateToProps, { login })
@reduxForm({ form: 'AuthLoginForm', validate })
export default class AuthorLogin extends Component {

  // or you can use @withRouter
  static contextTypes = {
    router: PropTypes.object
  }

  _handleSubmit = ({username, password, remember}) => {
    this.props.login(username, password, remember)
  }

  componentWillMount() {
    if (this.props.loggedIn) {
      this.context.router.push('/')
    }
  }

  render() {    
    const { handleSubmit, submitting, loginRequest } = this.props
    return (
      <form className="form col-md-6 col-md-offset-3" onSubmit={handleSubmit(this._handleSubmit)} >        
        <h2>Sign In</h2>
        <Field name="username" label="Enter username" component={renderTextField} />
        <Field name="password" label="Enter password" component={renderTextField} />
        <Field name="remember" label="Remember" component={renderCheckbox} />
        <div className="text-center">
          {loginRequest.status === 'failure' &&
            <ErrorMessage message={loginRequest.error.message} />
          }        
          <RaisedButton label='Login' type='submit' disabled={submitting}  />    
        </div>    
      </form>
    )
  }
}

