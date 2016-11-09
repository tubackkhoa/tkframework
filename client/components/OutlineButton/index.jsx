import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

class OutlineButton extends Component {

  render() {
    return (
    <Link to={this.props.href}>
      <div className={"mr-30 outlineButton " + ((this.props.active) ? "active" : "")} >{this.props.label}</div>      
    </Link>
    
    )
  }

}


export default OutlineButton