import React from 'react'
import { PropTypes} from 'react'
import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import {List, ListItem} from 'material-ui'
import {blue400, white} from 'material-ui/styles/colors'
import Avatar from 'material-ui/Avatar'

import { connect } from 'react-redux'
import * as actionCreators from 'store/actions/book'
import * as bookSelectors from 'store/selectors/book'
import * as commonSelectors from 'store/selectors/common'
import ChatLog from './chatlog'
import Player from 'components/Sound/player'
import {toTime} from 'components/Sound/libs/utils'


class ChatLogList extends React.Component {


  constructor(props){
    super(props)

    // for internal state that is not related to database
    this.currentCCIndex = 0    
  }

  markNextCCIndex(time, fromCurrent){        

    // time could be retrieved from database and is different from clip.time
    let currentCCIndex = fromCurrent === undefined ? this.state.currentCCIndex : fromCurrent    
    for(let i=currentCCIndex;i<this.props.audio.cc.length;++i){
      const currentCC = this.props.audio.cc[i]    
      const currentCCStart = Math.floor(currentCC.start/1000)      
      if(time < currentCCStart){        
        break
      } else {  
        // mark gain
        currentCCIndex = i
      }
    }    

    // get next currentCCIndex
    // update time track :v   
    if(currentCCIndex !== this.currentCCIndex){
      this.currentCCIndex = currentCCIndex      
      return true
    }       

    return false
  }

  getChatLog(ccIndex){
    const ccObj = this.props.audio.cc[ccIndex]
    if(ccObj){
      let controlsOption = {
        start: Math.floor(ccObj.start / 1000)
      }
      if(ccIndex === this.props.audio.cc.length - 1){
        controlsOption.stop = this.props.audio.duration
      } else {
        controlsOption.stop = Math.floor(this.props.audio.cc[ccIndex+1].start/1000)
      }
      return {
        title: ccObj.text,
        hoverItem: (<Player 
          controls={controlsOption}
          theme={ccObj.margin === "left" ? "light": "blue"} 
          src={this.props.audio.source.replace('mcbooks-test', 'mcbooks-media')} />)
      }
    }
  }

  componentWillUpdate() {
    const node = this.refs.chatLogList
    this.shouldScrollChat2Bottom = node && (node.scrollTop + node.offsetHeight === node.scrollHeight)
  }
   
  componentDidUpdate() {
    if (this.shouldScrollChat2Bottom) {      
      this.refs.chatLogList.scrollTop = this.refs.chatLogList.scrollHeight
    }
  }

  addChatLog(chatLogs, chatLog, currentMargin){
    if(chatLog && chatLog.length){
      chatLogs.push({
        key: chatLogs.length,
        align: currentMargin,              
        items: chatLog
      })
    }
  }

  renderChatLogs(){
    let chatLogs = []
    let chatLogData = null
    let currentMargin = ""        

    for(let i=0;i<this.currentCCIndex;i++){
      const ccObj = this.props.audio.cc[i]     
      if(ccObj){        
        if(currentMargin !== ccObj.margin){
          currentMargin = ccObj.margin
          this.addChatLog(chatLogs, chatLogData, currentMargin)        
          chatLogData = []                     
        }      
        chatLogData.push(this.getChatLog(i)) 
      }
    }

    // last one
    this.addChatLog(chatLogs, chatLogData, currentMargin)  

    return chatLogs.map(row=>(
      <ChatLog key={row.key} align={row.align} 
        avatar={<Avatar src="/images/avatar.jpg" />}   
        items={row.items}                      
      />
    ))        
  }

  shouldComponentUpdate(nextProps, nextState){          
    // just like other components should update when a specific property is changed
    // some components can rely on request store, so we have to tell react to know which one
    // in this case, we only update when audio source change
    // console.log(nextProps)
    // return (this.props.audio.source !== nextProps.audio.source)
    //   || (this.state.currentCCIndex !== nextState.currentCCIndex)
    if(this.props.audio.source !== nextProps.audio.source){
      this.currentCCIndex = 0    
      return true  
    } 

    const time = nextProps.audioTrack[nextProps.audio.audioId] || 0     
    return this.markNextCCIndex(time, this.currentCCIndex)          
  }

  render(){
    const {audio, readAudioRequest} = this.props
    // console.log('render chat log')
    if (audio.source) {      
      return (
        <div className="chatlog-list">   
          
          <ListItem className="header"
              disabled={true}
              innerDivStyle={{paddingLeft: 50}}
              style={{height:60}}
              primaryText={<div className="title">{audio && `${audio.title}  -  Audio - ${toTime(audio.duration)}`}</div>} 
              leftIcon={<AVPlayArrow color={blue400} />}
          />                                                    

          <div ref="chatLogList" className="chat-box">   
            <List>
              {this.renderChatLogs()}
            </List>                                       
          </div>
        </div>
      )

    }
      
    return null    

  }

}        

// use withRef we only modify this file
// other wise we have to also modify getWrappedInstance
// although the connected props are not changed, it still call render based on store changes
// this is just convenient way of access props from store

const mapStateToProps = (state) => ({  
  audio: bookSelectors.getAudio(state),
  audioTrack: bookSelectors.getAudioTrack(state),  
  readAudioRequest: commonSelectors.getRequest(state, 'getBookAudio'), 
})

export default connect(mapStateToProps, actionCreators)(ChatLogList)
