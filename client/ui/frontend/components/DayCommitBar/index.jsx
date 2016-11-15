import React, { PropTypes, Component } from 'react';

class DayCommitBar extends Component {

	constructor(props){
		super(props)
		this.state = {
			dayActive: {}
		}		

		this.dayLabel = {
			1: 'M',
      2: 'T',
      3: 'W',
      4: 'T',
      5: 'F',
      6: 'S',
      7: 'S',
		}
	}

	componentWillReceiveProps(nextProps){
		const defaultDayActive = {
			1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
		}
		const updatedDays = {...defaultDayActive, ...nextProps.dayActive}		
		this.setState({
			dayActive: updatedDays
		})
	}

	onSelectedDay(k) {
		const selectedDay = this.state.dayActive[k]
		const updatedDays = {...this.state.dayActive, [k]: !selectedDay}
		this.setState({
			dayActive: updatedDays
		}) 
		this.props.changeSchedule && this.props.changeSchedule(updatedDays)
	}
	

  render() {
		const indents = [],
		 	days = this.state.dayActive,	
			changeSchedule = this.props.changeSchedule
		for(let k in days){
			indents.push(<div key={k} 
				onClick={e => this.onSelectedDay(k)}
				className={'day '+ (!days[k] ? "inactive" : '')}>{this.dayLabel[k]}</div>
			)
		}	  
	
  	return(
		  <div className={"DayCommitBar "+ ((this.props.size==="small") ? "small" : "large")}>
		  	{indents}			
		  </div>
    )
  }
}

export default DayCommitBar