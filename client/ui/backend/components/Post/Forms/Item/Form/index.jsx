import React, { Component, PropTypes } from 'react'
import TARGET_TYPES from 'ui/shared/constants/targetTypes'
import IconButton from 'material-ui/IconButton'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentDeleteSweep from 'material-ui/svg-icons/content/delete-sweep'
import Image from './Image'
import Twitter from './Twitter'
import Text from './Text'
import inlineStyles from 'ui/shared/styles/MaterialUI'


class Form extends Component {

  // update with some change
  _handleUpdateItem = (updatedProps) => {
    this.props.handleUpdateItem(
      this.props.sortRank,
      { ...this.props.item, ...updatedProps, isNew: false, editing: false }
    )
  }

  // update without any change
  _handleCancelItem = () => {
    this.props.handleUpdateItem(
      this.props.sortRank, 
      { ...this.props.item, editing: false }
    )
  }

  _handleDeleteItem = () => {
    this.props.handleDeleteItem(this.props.sortRank)
  }

  renderDeleteButton() {
    return (
      <IconButton
        tooltip="Delete"
        tooltipPosition="bottom-center"
        name="delete-item-button"
        disableTouchRipple={true}
        onClick={this._handleDeleteItem}
      >
        <ContentDeleteSweep color={inlineStyles.iconColor} />
      </IconButton>
    )
  }

  renderCancelButton() {
    return (!this.props.item.isNew &&
      <IconButton
        tooltip="Cancel"
        tooltipPosition="bottom-center"
        name="cancel-item-button"
        disableTouchRipple={true}
        onClick={this._handleCancelItem}
      >
        <ContentRemoveCircle color={inlineStyles.iconColor} />
      </IconButton>
    )
  }

  render() {

    const {item, sortRank} = this.props
    switch (item.target_type) {
      case TARGET_TYPES.IMAGE:
        return (
          <Image
            formKey={sortRank}
            initialValues={{
              image: item.image.full_src,
              caption: item.image.caption,
            }}
            handleUpdateItem={this._handleUpdateItem}
            deleteButton={this.renderDeleteButton()}
            cancelButton={this.renderCancelButton()}
          />
        )
      case TARGET_TYPES.TWITTER:
        return (
          <Twitter
            formKey={sortRank}
            initialValues={{
              twitter_id: item.twitter.twitter_id
            }}
            sortRank={sortRank}
            handleUpdateItem={this._handleUpdateItem}
            deleteButton={this.renderDeleteButton()}
            cancelButton={this.renderCancelButton()}
          />
        )
      case TARGET_TYPES.TEXT:
        return (
          <Text            
            initialValues={{
              description: item.text.description
            }}
            handleUpdateItem={this._handleUpdateItem}
            deleteButton={this.renderDeleteButton()}
            cancelButton={this.renderCancelButton()}
          />
        )
      default:
        return
    }
  }

}


export default Form