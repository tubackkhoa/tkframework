import React from 'react'
import { PropTypes} from 'react'
import FontIcon from 'material-ui/FontIcon'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui'

import ActionDone from 'material-ui/svg-icons/action/done'
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AVReplay from 'material-ui/svg-icons/av/replay'
import Lock from 'material-ui/svg-icons/action/lock-outline'

import {green300, white, gray300} from 'material-ui/styles/colors'

// get libary from sound to calculate time
import {toTime} from 'components/Sound/libs/utils'

class TrackItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      active: this.props.currentAudioId === this.props.audioId
      // lock: this.prop
    }
  }

  setActive(active){
    this.setState({
      active:active
    })
  }

  componentDidMount(){
    // reference to dom node
    this.node = this.refs.trackItem 
    if(this.state.active){
      this.props.onSelectedTrack && this.props.onSelectedTrack(this)
    }
  }

  // with arrow function, it will auto bind for this context, but it can cause problem with state
  handleClick(e){
    e.preventDefault()    
    this.props.onSelectedTrack && this.props.onSelectedTrack(this)
  }

  shouldComponentUpdate(nextProps, nextState){          
    return this.state.active !== nextState.active
  }

  render() {
    const {audioId, currentLoop, duration, page, totalRepeat, title, currentLockStatus} = this.props    
    const repeat = totalRepeat - currentLoop         
    const active = this.state.active
    // do not connect to repeated item => slow performance
    // console.log('render TrackItem')
    return ( 
      <div ref="trackItem" className={`track-item ${active ? 'active' : ''}`} onClick={this.handleClick.bind(this)}>
        <ListItem 
          primaryText={<div className="title">{title}</div>} innerDivStyle={{paddingLeft: 40}}
          leftIcon={
            (active)              
            ? <AVPlayArrow color={white} style={{marginLeft:0}} />
            : ((currentLockStatus === 'soft-lock')
              ? <Lock color={gray300} style={{marginLeft:0}} />
              : <ActionDone color={green300} style={{marginLeft:0}} />)
          }
          secondaryText={
            <p className="description">
              <span>Audio - {toTime(duration)}</span>
              {repeat &&  <span>| {repeat} <AVReplay color="inherit" /></span>}              
              {repeat && <span className="rounded">Trang {page}</span>}
              {repeat && <span className="rounded">CC</span>}
            </p>
          }
          secondaryTextLines={1}
        />
        <Divider/>
      </div>
    )
  }
}

export default TrackItem
