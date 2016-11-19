import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

const accountTypeMap = ['Github', 'Facebook', 'Twitter', 'LinkedIn']
class SocialAccount extends Component {

  render() {
    const {url, accountType, handleUpdate} = this.props
    return (
      <TextField
        value={url}
        name="url"
        floatingLabelText={`${accountTypeMap[accountType]} URL`}
        hintText="Enter URL"
        fullWidth
        onChange={e=>handleUpdate(e.target.value)}
      />
    )
  }
}

export default SocialAccount
