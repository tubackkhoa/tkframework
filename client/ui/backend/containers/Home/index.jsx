import React from 'react'

import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'

class DateTimeForm extends React.Component {
  constructor(props){
    super(props)

    this.state = {
    date: null,
    time: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleTime = this.handleTime.bind(this)
  }

  handleTime(event, time){
    this.setState({time: time})
  }
  
  handleDate(event, date){
    this.setState({date: date})
  }

  handleSubmit(event){      
    console.log(this.state.date, this.state.time)
    this.setState({date: null, time: null})
  }

  render() {
    const actions = <div>
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
      <FlatButton
        label="Submit"
        primary={true}
        type='submit'
        onTouchTap={this.handleSubmit}
      />
    </div>

    return (
      <div>
        <form>
          <DatePicker onChange={this.handleDate} value ={this.state.date} container="inline" hintText="Date to be completed by" />
          <TimePicker onChange={this.handleTime} value={this.state.time} container="inline" hintText="Time to be completed by" />
        </form>
        {actions}
      </div>
    )
  }
}

export default (props) => (
  <div>
    <DateTimeForm />
  </div>
)