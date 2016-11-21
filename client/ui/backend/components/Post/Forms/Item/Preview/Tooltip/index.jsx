import React, { Component, PropTypes } from 'react'

import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import ArrowUpword from 'material-ui/svg-icons/navigation/arrow-upward'
import ArrowDownword from 'material-ui/svg-icons/navigation/arrow-downward'
import SwapVert from 'material-ui/svg-icons/action/swap-vert'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Clear from 'material-ui/svg-icons/content/clear'
import IconMenu from 'material-ui/IconMenu'
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import IconButton from 'material-ui/IconButton'


class Tooltip extends Component {

  // must provide
  static propTypes = {
    sortRank: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    handleUpdateItem: PropTypes.func.isRequired,
    handleMoveItem: PropTypes.func.isRequired,
    handleDeleteItem: PropTypes.func.isRequired,
  }

  _handleMove = (type) => {
    this.props.handleMoveItem(this.props.sortRank, type)
  }


  _handleUpdateItem = () => {
    this.props.handleUpdateItem()
  }

  _handleDelete = () => {
    this.props.handleDeleteItem(this.props.sortRank)
  }

  render() {
    const {sortRank, totalCount} = this.props
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton ><ExpandMore /></IconButton>}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <MenuItem
            name="top-button"
            primaryText="Move Top"
            rightIcon={<ArrowUpword />}
            onClick={e => this._handleMove('TOP')}
            disabled={sortRank === 0}
          />
          <MenuItem
            name="up-button"
            primaryText="Move Up"
            rightIcon={<SwapVert />}
            onClick={e => this._handleMove('UP')}
            disabled={sortRank === 0}
          />
          <MenuItem
            name="down-button"
            primaryText="Move Down"
            rightIcon={<SwapVert />}
            onClick={e => this._handleMove('DOWN')}
            disabled={sortRank === totalCount - 1}
          />
          <MenuItem
            name="bottom-button"
            primaryText="Move Bottom"
            rightIcon={<ArrowDownword />}
            onClick={e => this._handleMove('BOTTOM')}
            disabled={sortRank === totalCount - 1}
          />
          <Divider />
          <MenuItem
            name="edit-button"
            primaryText="Edit"
            onClick={this._handleUpdateItem}
            rightIcon={<ModeEdit />}
          />
          <MenuItem
            name="delete-button"
            primaryText="Delete"
            rightIcon={<Clear />}
            onClick={this._handleDelete}
          />
        </IconMenu>
      </div>
    )
  }
}

export default Tooltip
