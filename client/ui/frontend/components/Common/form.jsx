import React, {Component} from 'react'
import ErrorMessage from './error_message'
import LoadingButton from './loading_button'
import RaisedButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'

import {changeForm} from 'store/actions/login'


const Form = ({ error, currentlySending, btnText, data, deleteNoteRequest, onLoginSubmit, changeFormCreator }) => (
  <form className='form' onSubmit={(event) =>{
    event.preventDefault()    
    onLoginSubmit(data.username, data.password)
  }}>
    {error ? <ErrorMessage error={error} /> : null}               
    <TextField      
      id='username'    
      value={data.username}
      hintText='username'
      onChange={(event) => changeFormCreator({...data, username: event.target.value})}       
    />      
    <br/>
    <TextField                
      type='password' id='password'
      value={data.password}
      onChange={(event) => changeFormCreator({...data, password: event.target.value})}
      hintText='••••••••••'  
    />                            
    <br/>
    {
      currentlySending 
      ? <LoadingButton />
      : <RaisedButton label={btnText} type='submit' />        
    }    
  </form>
)

Form.propTypes = {  
  data: React.PropTypes.object,
  onSubmit: React.PropTypes.func,  
  btnText: React.PropTypes.string,
  error: React.PropTypes.string,
  currentlySending: React.PropTypes.bool
}

// Which props do we want to inject, given the global state?
function select (state) {  
  return {
    data: state.loginReducer.formState
  }
}

const actions = {
  changeFormCreator: changeForm
}

// Wrap the component to inject dispatch and state into it
export default connect(select, actions)(Form)
