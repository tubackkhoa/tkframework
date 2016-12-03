import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentSave from 'material-ui/svg-icons/content/save'

import inlineStyles from 'ui/shared/styles/MaterialUI'

import { getNewsPost, updateNewsPost, replaceNewsPost } from 'store/actions/newspost'

import * as authSelectors from 'store/selectors/auth'
import * as newsPostSelectors from 'store/selectors/newspost'


import { 
  renderTextField, 
  renderDropzoneImage, 
  renderTextEditor,
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
  initialValues: newsPostSelectors.getNewsPost(state),
  token: authSelectors.getToken(state)
})

@connect(mapStateToProps, {getNewsPost, updateNewsPost, replaceNewsPost})
@reduxForm({ form: 'NewsPostForm', validate, enableReinitialize:true })
export default class NewsPostEdit extends Component {

  _handleSubmit = (props) => {    
    // call update, after that return to list page
    this.props.updateNewsPost(this.props.token, this.props.params.id, props)
  }

  componentDidMount(){
    if(this.props.params.id){
      this.props.getNewsPost(this.props.params.id)
      document.title = 'Edit NewsPost'
    } else {
      document.title = 'Create NewsPost'  
      this.props.replaceNewsPost({})
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
        <Field name="content" label="Content" mode="html" component={renderTextEditor} />
        <Field name="image" label="Image" component={renderDropzoneImage} base64={true} />

        <FloatingActionButton label={submitLabel} type="submit"
          style={inlineStyles.floatButton} disabled={submitting} disableTouchRipple={true}>
          <ContentSave />
        </FloatingActionButton>

      </form>

    )
  }
}


