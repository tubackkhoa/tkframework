import React, { Component, PropTypes } from 'react'

class StyleButton extends Component {  

  _handleToggle = (event) => {
    event.preventDefault()
    this.props.onToggle(this.props.style)
  }

  render() {
    const {label, active, style} = this.props
    const className = style + ' button' + (active ? ' active' : '')
    return (
      <span className={className} onMouseDown={this._handleToggle}>
        {label}
      </span>
    )
  }
}

export default StyleButton
