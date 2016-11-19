import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import { renderTextField, renderTextEditor, renderDropzoneImage } from 'ui/backend/shared/utils'
import SocialAccount from 'ui/backend/components/Author/Form/SocialAccount'
import ErrorMessage from 'ui/shared/components/ErrorMessage'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import UpdateSocialAccountMutation from 'store/relay/mutations/social-account/UpdateSocialAccountMutation'

import * as authSelectors from 'store/selectors/auth'

const validate = (values) => {
  const errors = {}
  !values.name && (errors.name = 'Empty name')  
  return errors
}


const mapStateToProps = (state) => ({  
  user : authSelectors.getUser(state),
})

@reduxForm({
  form: 'AuthorForm',  
  validate,  
}, mapStateToProps)
class AuthorForm extends Component {

  constructor(props){
    super(props)
    // set from store
    props.relay.setVariables({ userId: props.user.id })
  }

  _handleSubmit = props => {
    console.log(props)
  }

  _handleUpdateSocialAccount = (sortRank, url) => {
    // this.props.updateSocialAccount(sortRank, url)
    this.props.relay.commitUpdate(
      new UpdateSocialAccountMutation({title, post:this.props.post}),
      {
        onSuccess:(res)=>console.log(res),
        // trigger redux-form validation
        onFailure:(trans) => this.setState({ errorMessage:trans.getError() }), 
      }
    )
  }

  renderSocialAccounts() {
    // some accounts may not be saved yet, so use index as key, instead of account id.
    return(
      this.props.viewer.detailAccount.social_accounts.map((account, index) => {
        return (
          <SocialAccount
            key={index}
            sortRank={index}
            accountType={account.accountType}
            url={account.url}
            handleUpdate={this._handleUpdateSocialAccount}
          />
        )
      })
    )
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
        <Field name="name" component={renderTextField} label="First Name"/>
        
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
          <Field name="image" component={renderDropzoneImage}/>
        </div>

        {this.renderSocialAccounts()}
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
        detailAccount(userId:$userId) {
          id
          introduction
          description
          social_accounts {
            id            
            url
            ${UpdateSocialAccountMutation.getFragment('social_account')
          }
        } 
      }      
    `
  },
})



