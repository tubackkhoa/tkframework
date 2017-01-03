import React from 'react'
import { 
  View, 
  Text,   
  StyleSheet, 
  ScrollView, 
} from 'react-native'

import SocketIOClient from 'socket.io-client'

import { GiftedChat } from 'react-native-gifted-chat'

import { Avatar, Card, ListItem, Toolbar, Subheader } from 'react-native-material-ui'
import { Platform } from 'react-native'

import Container from 'ReactNotes/ui/components/Container'
import { API_BASE } from 'ReactNotes/store/constants/api'

const USER_ID = '@userId'

class ChatSpec extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],      
    }    

    this.socket = SocketIOClient(API_BASE,{
      transports: ['websocket'],
    })
    this.socket.on('message', messages => this._storeMessages(messages))    
  }
  
  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  _onSend = (messages=[]) => {
    this.socket.emit('message', messages[0])    
    this._storeMessages(messages)
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      }
    })
  }
  

  render() {
    var user = { 
      _id: Platform.OS,
      name: Platform.OS,
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    }

    return (
        <Container>
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => this.props.navigator.pop()}
                centerElement={this.props.route.title}                
            />             
                              
              <GiftedChat
                messages={this.state.messages}
                onSend={this._onSend} 
                user={user}               
              />           
            
        </Container>
    )
  }

  
}

const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    image:{
      width: 50, 
      height: 50
    },
    container: {
        flex: 1,
    },
})

export default ChatSpec