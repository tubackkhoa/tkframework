import React, {Component} from 'react'
import {connect} from 'react-redux'

// local import
// we should use ./ first, then absolute import, do not use ../ for ugly and hard to maintain
import Form from 'components/Common/form'
// these functions should be import all for later retrieve :D
// if we import one, we have to rename it, because the same name can cause the problem
import { loginRequest } from 'store/actions/login'

class Login extends Component {

  render () {    
    const {data:{currentlySending, error}, loginRequestCreator} = this.props     
    return (
      <div className='form-page__wrapper'>
        <div className='form-page__form-wrapper'>
          <div className='form-page__form-header'>
            <h2 className='form-page__form-heading'>Login here</h2>
          </div>
          <Form 
          onLoginSubmit={(username, password) => loginRequestCreator({username, password})} 
          btnText={'Login'} error={error} 
          currentlySending={currentlySending} />
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  data: React.PropTypes.object,    
}

// Which props do we want to inject, given the global state?
function select (state) {
  return {
    data: state.loginReducer
  }
}

const actionCreators = {
  loginRequestCreator: loginRequest
}

// Wrap the component to inject dispatch and state into it
export default connect(select, actionCreators)(Login)