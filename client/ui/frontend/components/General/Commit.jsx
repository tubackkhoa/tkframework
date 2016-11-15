import React, { PropTypes } from 'react'
import {red400} from 'material-ui/styles/colors'
import Checkbox from 'material-ui/Checkbox'
import TimePicker from 'material-ui/TimePicker'
import { connect } from 'react-redux'

import DayCommitBar from 'components/DayCommitBar'
import Close from 'material-ui/svg-icons/navigation/close'

import * as commonSelectors from 'store/selectors/common'
import * as scheduleSelectors from 'store/selectors/book/schedule'


const styles = {
  checkbox: {
    float: "left",
    width: "300px",
    padding: "12px 0px",
    marginRight: 25
  },
  deleteButton: {
    height: 20,
  },
  inputDate: {
    fontSize: 14,    
    width: 40,        
  }
}

const DeleteButton = () => (
    <div className="DeleteButton">
      <Close color={red400} style={styles.deleteButton}/>
    </div>
)

class Commit extends React.Component {

  constructor(props){
    super(props)
  }

  changeSchedule(arr){                    
    this.props.onChangeSchedule 
      && this.props.onChangeSchedule(
            this.convertTimeToSeconds(this.timeFrom), 
            this.convertTimeToSeconds(this.timeTo), 
          arr)
  }  

  convertTimeToSeconds(time){
    return time.getHours() * 3600 + time.getMinutes() * 60
  }

  convertSecondToTime(seconds){
    const date = new Date()
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours * 3600) / 60)
    date.setHours(hours)
    date.setMinutes(minutes)
    return date
  }
  

  shouldComponentUpdate(nextProps, nextState) {       
    // we use willReceiveProps to change playlist
    return nextProps.readScheduleRequest.status !== this.props.readScheduleRequest.status     
        // good enough for small schedule       
        || JSON.stringify(nextProps.schedules) !== JSON.stringify(this.props.schedules)
  }

  render () {
    const { commit, schedules } = this.props
    let days = {}
    schedules.forEach(schedule => days[schedule.day]=true)    
    const {from:timeFrom, to:timeTo} = schedules[0] || {from:28800, to:32400}
    this.timeFrom = this.convertSecondToTime(timeFrom)
    this.timeTo = this.convertSecondToTime(timeTo)
    return(
      <div className="Commit">
        <Checkbox
          className="text-truncate"
          label={commit.content}
          style={styles.checkbox}
        />
        <div className="time-schedule">
        <TimePicker 
          onChange={
            (e,time)=>(this.timeFrom = time)
              && this.changeSchedule(this.refs.dayCommit.state.dayActive)
          }
          ref="from" value={this.timeFrom}
          style={{position:'absolute',top:7,left:20}} 
          textFieldStyle={styles.inputDate} format="24hr" hintText="07:00" />
        -
        <TimePicker 
          onChange={
            (e,time)=>(this.timeTo = time)
              && this.changeSchedule(this.refs.dayCommit.state.dayActive)
          }
          ref="to" value={this.timeTo}
          style={{position:'absolute',top:7,right:20}} 
          textFieldStyle={styles.inputDate} format="24hr" hintText="21:00" />
        </div>

        <DayCommitBar 
          ref="dayCommit"
          className="pull-right" 
          dayActive={days}
          changeSchedule={this.changeSchedule.bind(this)} 
          size="small"/>

        {
         // <DeleteButton/>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  schedules: scheduleSelectors.getBookSchedule(state),
  readScheduleRequest: commonSelectors.getRequest(state, 'getSchedule'),
})


// may be {...scheduleActionCreators, {moreaction:action}}
export default connect(mapStateToProps)(Commit)


