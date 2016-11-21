import React, { Component, PropTypes } from 'react'
import TARGET_TYPES from 'ui/shared/constants/targetTypes'
import List from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import ContentAddCircleOutLine from 'material-ui/svg-icons/content/add-circle-outline'
import ActionHighlightOff from 'material-ui/svg-icons/action/highlight-off'

import EditBoxItem from './EditBoxItem'
import inlineStyles from 'ui/shared/styles/MaterialUI'

const TARGET_TYPE_LIST = [
  TARGET_TYPES.TEXT,
  TARGET_TYPES.IMAGE,
  TARGET_TYPES.TWITTER,
]

class EditBox extends Component {

  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  renderToggleButton() {

    return (this.state.isOpen
      ? <IconButton
          style={inlineStyles.largeButton}
          name="close-add-item-button"
          iconStyle={inlineStyles.toggleIcon}
          disableTouchRipple
          onClick={() => this.setState({ isOpen: false })}
        >
          <ActionHighlightOff color={inlineStyles.iconColor} />
        </IconButton>

      : <IconButton
          style={inlineStyles.largeButton}
          name="add-item-button"
          iconStyle={inlineStyles.toggleIcon}
          disableTouchRipple
          onClick={() => this.setState({ isOpen: true })}
        >
          <ContentAddCircleOutLine color={inlineStyles.iconColor} />
        </IconButton>
    )
  }

  renderEditMenu() {
    return (this.state.isOpen &&
      <ul>
        {TARGET_TYPE_LIST.map((targetType, index) => (
          <EditBoxItem
            key={index}
            name={targetType}
            handleAddItem={this.props.handleAddItem}
          />          
        ))}
      </ul>
    )
  }

  render() {
    return (
      <List>
        {this.renderToggleButton()}
        {this.renderEditMenu()}
      </List>
    )
  }
}

EditBox.propTypes = {
  handleAddItem: PropTypes.func.isRequired,
}

export default EditBox
