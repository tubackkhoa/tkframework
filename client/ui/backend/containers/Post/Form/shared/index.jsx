import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'

import RaisedButton from 'material-ui/FlatButton'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import * as tagSelectors from 'store/selectors/tag'
import * as postSelectors from 'store/selectors/post'

import { 
  renderTextField, 
  renderDatePicker, 
  renderTagField,
  renderPostFormItems,
} from 'ui/backend/shared/utils'

function validate(values) {
  const errors = {}
  if (!values.title) {
    errors.title = 'Enter title'
  }

  return errors
}

const mapStateToProps = (state) => ({  
  tagSuggestions: tagSelectors.getTagSuggestions(state),
})

@connect(mapStateToProps)
@reduxForm({ form: 'PostForm', validate })
class PostForm extends Component {

  _handleSubmit = (props) => {    
    this.props.savePost && this.props.savePost(props)
  }
  
  render() {    
    const { handleSubmit, submitting, isNew, tagSuggestions } = this.props
    const submitLabel = isNew ? 'Create' : 'Update'

    return (
      <form onSubmit={handleSubmit(this._handleSubmit)} >
        <h2>{submitLabel} Post</h2>
        <Field name="title" label="Enter Title" component={renderTextField} />
        <Field name="lead_sentence" label="Lead Sentence" component={renderTextField} />
        <div>
          <label>Published At</label>
          <Field name="published_at" label="PublishedAt" component={renderDatePicker} />          
        </div>
        <Field name="tags" suggestions={tagSuggestions} component={renderTagField} />        
        <FieldArray name="items" component={renderPostFormItems} />        
                
        <RaisedButton label={submitLabel} type="submit"
                disabled={submitting} />
      </form>
    )
  }
}

export default PostForm

