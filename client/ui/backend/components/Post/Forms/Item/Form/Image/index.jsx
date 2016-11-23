import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import DropzoneImage from 'ui/backend/components/shared/DropzoneImage'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import { 
  renderDropzoneImage, 
  renderTextField,
} from 'ui/backend/shared/utils'

import ErrorMessage from 'ui/shared/components/ErrorMessage'

function validate(values) {
  const errors = {}
  if (!values.image) {
    errors.image = 'Entry image'
  }

  return errors
}

@reduxForm({form: 'ItemImageForm', validate})
class Image extends Component {

  state = {
    errorMessage: null,  
  }

  _handleUpdateItem = (props) => {
    // this will trigger update for the whole form
    this.props.handleUpdateItem({ full_src: props.full_src, caption: props.caption })    
    // but we will save this one
    // and not save the whole post 
  }

  renderErrorMessage() {
    return (this.state.errorMessage &&
      <ErrorMessage message={this.state.errorMessage} />
    )
  }

  render() {
    const { handleSubmit, submitting, cancelButton, deleteButton } = this.props

    return (
      <div className='image-item'>
        <label >Image</label>
        <Field name="full_src" component={renderDropzoneImage}/>        

        <Field label="Enter the caption" name="caption" component={renderTextField}/>
        {this.renderErrorMessage()}
        
        <div>
          {cancelButton}
          {deleteButton}
          <IconButton
            disabled={submitting}
            tooltip="Save"
            tooltipPosition="bottom-center"
            name="save-item-button"
            disableTouchRipple
            onClick={handleSubmit(this._handleUpdateItem)}
          >
            <ContentSave color={inlineStyles.iconColor} />
          </IconButton>
        </div>
      </div>
    )
  }
}


export default Image

