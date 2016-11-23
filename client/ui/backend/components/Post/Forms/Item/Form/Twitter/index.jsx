import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ContentSave from 'material-ui/svg-icons/content/save'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import { 
  renderTextField, 
} from 'ui/backend/shared/utils'

function validate(values) {
  const errors = {}
  const urlRegexp = /https?:\/\/twitter.com\/[\w]+\/status\/[\d]+$/ig
  const idRegexp = /[\d]+$/ig

  if (!urlRegexp.test(values.twitter_id) && !idRegexp.test(values.twitter_id)) {
    errors.twitter_id = 'Enter Valid Twitter URL or Twitter ID'
  }

  return errors
}

@reduxForm({form: 'ItemFormTwitter', validate})
class Twitter extends Component {

  _handleUpdateItem = (props) => {
    const regexp = /https?:\/\/twitter.com\/[\w]+\/status\/([\d]+)$/i
    const twitter_id = regexp.test(props.twitter_id) ? props.twitter_id.match(regexp)[1] : props.twitter_id
    this.props.handleUpdateItem({ twitter_id })
  }

  render() {
    const { handleSubmit, submitting, cancelButton, deleteButton } = this.props
    return (
      <div className='twitter-item'> 
          
        <Field label="Enter the twitter URL or ID" name="twitter_id" component={renderTextField}/>

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

export default Twitter


