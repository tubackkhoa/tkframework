import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'

import inlineStyles from 'ui/shared/styles/MaterialUI'

import { getSellPost, updateSellPost, replaceSellPost } from 'store/actions/sellpost'

import * as authSelectors from 'store/selectors/auth'
import * as sellPostSelectors from 'store/selectors/sellpost'


import { 
  renderTextField, 
  renderDropzoneImage, 
} from 'ui/backend/shared/utils'

const validate = (values) => {
  const errors = {}
  // first time it is empty
  if(!values) return errors
  if (!values.title) {
    errors.title = 'Enter title'
  } 

  return errors
}

const mapStateToProps = (state) => ({  
  initialValues: sellPostSelectors.getSellPost(state),
  token: authSelectors.getToken(state)
})

@connect(mapStateToProps, {getSellPost, updateSellPost, replaceSellPost})
@reduxForm({ form: 'SellPostForm', validate, enableReinitialize:true })
export default class SellPostEdit extends Component {

  _handleSubmit = (props) => {    
    // call update, after that return to list page
    this.props.updateSellPost(this.props.token, this.props.params.id, props)
  }

  componentDidMount(){
    if(this.props.params.id){
      this.props.getSellPost(this.props.params.id)
      document.title = 'Edit SellPost'
    } else {
      document.title = 'Create SellPost'  
      this.props.replaceSellPost({})
    }
    
  }
  
  render() {    
    const { params:{id}, handleSubmit, submitting } = this.props    
    const submitLabel = !id ? 'Create' : 'Update'    
    return (

      <form onSubmit={handleSubmit(this._handleSubmit)} >
      
        <h2>{submitLabel} Post</h2>
        <Field name="title" label="Enter Title" component={renderTextField} />
        <Field name="description" label="Description" component={renderTextField} />
        <Field name="phone" label="Phone" component={renderTextField} />
        <Field name="image" label="Image" component={renderDropzoneImage} base64={true} />

        <FloatingActionButton label={submitLabel} type="submit"
          style={inlineStyles.floatButton} disabled={submitting} disableTouchRipple={true}>
          <ContentSave />
        </FloatingActionButton>

      </form>

    )
  }
}


