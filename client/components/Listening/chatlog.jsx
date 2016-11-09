import React from 'react'
import { PropTypes} from 'react'
import RoundedText from './roundedtext'
import {ListItem} from 'material-ui'

class ChatLog extends React.Component {  

  render() {

    const{items, align, avatar} = this.props    
    const chatLogHeight = 20 + 40 * items.length
    let propsValue = {
      disabled: true,
      style: {height: chatLogHeight}      
    }
    let chatLogItemclassName = 'left-chat'
    if(align === this.constructor.Align.LEFT){
      propsValue.leftAvatar = avatar
      propsValue.innerDivStyle = {paddingTop:10,paddingBottom:10}              
    } else {
      propsValue.rightAvatar = avatar
      propsValue.innerDivStyle = {paddingRight: 70,paddingTop:10,paddingBottom:10}
      chatLogItemclassName = 'right-chat'
    }

    propsValue.primaryText = (
      <div className={chatLogItemclassName}>
        <RoundedText items={items} />                      
      </div>
    )

    return (
      <ListItem disabled={true} {...propsValue} />            
    )
  }    
}

ChatLog.Align = {
  LEFT: 'left',
  RIGHT: 'right'
}

export default ChatLog