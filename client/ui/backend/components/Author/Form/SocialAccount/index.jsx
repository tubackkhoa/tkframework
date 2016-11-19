import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

class SocialAccount extends Component {

  render() {
    const {url, accountType, sortRank, handleUpdate} = this.props
    return (
      <TextField
        value={url}
        name="url"
        floatingLabelText={`${accountType} URL`}
        hintText="Enter URL"
        fullWidth
        onChange={e=>handleUpdate(sortRank, e.target.value)}
      />
    )
  }
}

export default SocialAccount
