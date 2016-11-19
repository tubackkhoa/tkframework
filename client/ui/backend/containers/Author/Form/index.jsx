import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { Field, FieldArray, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import { 
  renderTextField, 
  renderTextEditor, 
  renderDropzoneImage, 
  renderSocialAccounts,
} from 'ui/backend/shared/utils'

import ErrorMessage from 'ui/shared/components/ErrorMessage'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import * as authSelectors from 'store/selectors/auth'
import { updateSocialAccount } from 'store/actions/auth'

// higher order function for redux form and connect to store
const validate = (values) => {
  const errors = {}
  !values.name && (errors.name = 'Empty name')  
  return errors
}

const mapStateToProps = (state) => ({  
  initialValues: authSelectors.getUser(state),
})

@connect(mapStateToProps, { updateSocialAccount })
@reduxForm({ form: 'AuthorForm', validate })
class AuthorForm extends Component {

  state = {
    errorMessage: null,  
  }

  _handleSubmit = props => {
    console.log(props)
    // 
    // this.props.relay.commitUpdate(
    //   new UpdateAuthorMutation({title, post:this.props.post}),
    //   {
    //     onSuccess:(res)=>console.log(res),
    //     // trigger redux-form validation
    //     onFailure:(trans) => this.setState({ errorMessage:trans.getError() }), 
    //   }
    // )
  }

  handleUpdateSocialAccount(input, sortRank, url) {
    // update to form state so we can get via handle_submit
    // this.props.updateSocialAccount(sortRank, url)
    // clone current value, then update it, finally call onchange
    const newValue = input.value.slice(0)
    newValue[sortRank].url = url
    input.onChange(newValue)
  }

  renderErrorMessage() {
    return (this.state.errorMessage &&
      <ErrorMessage message={this.state.errorMessage} />
    )
  }

  render() { 
    const { handleSubmit, submitting } = this.props

    return (
      <form onSubmit={handleSubmit(this._handleSubmit)}>
        <h2 >Update About</h2>
        <Field name="name" component={renderTextField} label="Name"/>
        
        
        <div className="form-group">
          <label>Description</label>
          <Field name="description" component={renderTextEditor}/>
        </div>

        <div className="form-group">
          <label>Introduction</label>
          <Field name="introduction" component={renderTextEditor}/>
        </div>

        <div className="form-group">
          <label>Image</label>
          <Field name="avatar" component={renderDropzoneImage}/>
        </div>
        
        <FieldArray name="social_accounts" component={renderSocialAccounts} />

        {this.renderErrorMessage()}

        <RaisedButton label='Update' type='submit' disabled={submitting} />

      </form>

    )
  }

}

export default Relay.createContainer(AuthorForm, {
  initialVariables: {
    userId: null,      
  },

  fragments: {

    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        detailAuthor(userId: $userId) {
          id
          
        } 
      }      
    `
  },
})





