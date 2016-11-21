import React, { PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import ImageIcon from 'material-ui/svg-icons/image/image'
import TextFormatIcon from 'material-ui/svg-icons/content/text-format'
import ActionHome from 'material-ui/svg-icons/action/home'
import { TwitterIcon } from 'ui/shared/components/Icon'


const getImage = (name) => {
  switch (name) {
    case 'ItemTwitter':
      return <TwitterIcon />
    case 'ItemText':
      return <TextFormatIcon />
    case 'ItemImage':
      return <ImageIcon />
    default:
      return
  }
}

const EditBoxItem = ({ name, handleAddItem }) => (
  <li>
    <IconButton
      onClick={() => handleAddItem(name)}
      disableTouchRipple={true}>
      {getImage(name)}
    </IconButton>
  </li>
)

EditBoxItem.propTypes = {
  name: PropTypes.string.isRequired,
  handleAddItem: PropTypes.func.isRequired,
}

export default EditBoxItem
