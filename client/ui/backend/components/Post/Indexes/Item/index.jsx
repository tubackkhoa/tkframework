import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import IconButton from 'material-ui/IconButton'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import AvAirplay from 'material-ui/svg-icons/av/airplay'
import ActionVisibility from 'material-ui/svg-icons/action/visibility'
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import ActionDone from 'material-ui/svg-icons/action/done'
import ContentFlag from 'material-ui/svg-icons/content/flag'
import NotificationPriorityHigh from 'material-ui/svg-icons/notification/priority-high'
import inlineStyles from 'ui/shared/styles/MaterialUI'

class Item extends Component {

  _handleToggle = () => {
    this.props.handleToggle(this.props.sortRank, this.props.id)
  }

  getStatusIcon(accepted, published_at){
    const publishDate = new Date(published_at)
    const currentDate = new Date()
    const status = accepted ? (publishDate > currentDate ? 2 : 1) : 0
    // 0: not accepted, 1: will publish, 2: publishing
    switch (status) {
      case 0:
        return <NotificationPriorityHigh name="unaccepted-icon" />
      case 1:
        return <ActionDone name="accepted-icon" />
      case 2:
        return <ContentFlag name="publishing-icon" />
    }
  }

  render() {

    const {id, title, accepted, published_at} = this.props

    return (
      <TableRow style={inlineStyles.row}>        
        <TableRowColumn colSpan="4" style={inlineStyles.rowColumn} >
          {title}
        </TableRowColumn>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
          {this.getStatusIcon(accepted, published_at)}
        </TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
          {published_at}
        </TableRowColumn>
        <TableRowColumn colSpan="3" style={inlineStyles.rowColumn} >
          <Link to={`/posts/${id}`}>
            <IconButton disableTouchRipple >
              <AvAirplay />
            </IconButton>
          </Link>
          <Link to={`/cms/posts/${this.props.id}/edit`}>
            <IconButton disableTouchRipple >
              <EditorModeEdit />
            </IconButton>
          </Link>
          <IconButton
            name="toggle-button"
            onClick={this._handleToggle}
            disableTouchRipple
          >
            {accepted 
              ? <ActionVisibility name="visible-icon" />
              : <ActionVisibilityOff name="in-visible-icon" />              
            }
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default Item
