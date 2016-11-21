import React, { Component } from 'react'
import DatePicker from 'material-ui/DatePicker'

export default class CustomDatePicker extends Component {

  _onChange = (e, date) => {
    if (this.props.onChange) {
      this.props.onChange(date)
    }
  }

  render() {
    const value = this.props.value ? new Date(this.props.value) : new Date()
    const props = {...this.props, value}
    return (
      <DatePicker {...props} onChange={this._onChange} />
    )
  }
}