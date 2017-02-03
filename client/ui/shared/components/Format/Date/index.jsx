import React, { PropTypes, Component } from 'react'

export default class FormatDate extends Component {

  render() {
    const {date} = this.props
    let dateFormatted = ''
    const matched = date ? date.match(/^(\d{4})-(\d{2})-(\d{2}).*$/) : null  
    if(matched)
        dateFormatted = `${matched[3]}/${matched[2]}/${matched[1]}`
    return (       
        <span>{dateFormatted}</span>              
    )
  }
}