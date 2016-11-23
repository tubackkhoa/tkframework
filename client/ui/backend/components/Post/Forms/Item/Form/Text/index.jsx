import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import IconButton from 'material-ui/IconButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import ErrorMessage from 'ui/shared/components/ErrorMessage'

import { 
  renderTextEditor, 
} from 'ui/backend/shared/utils'

function validate(values) {
  const errors = {}
  if (!values.description) {
    errors.description = 'Enter description'
  }

  return errors
}


@reduxForm({form: 'ItemTextForm', validate})
class Text extends Component {

  state = {
    errorMessage: null,  
  }

  _handleUpdateItem = (props) => {
    this.props.handleUpdateItem({ description: props.description })
  }


  renderErrorMessage() {
    return (this.state.errorMessage &&
      <ErrorMessage message={this.state.errorMessage} />
    )
  }

  render() {
    const { handleSubmit, submitting, cancelButton, deleteButton } = this.props
    return (
      <div className='text-item'>                
        <label>Text</label>
        <Field name="description" component={renderTextEditor}/>

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

export default Text


