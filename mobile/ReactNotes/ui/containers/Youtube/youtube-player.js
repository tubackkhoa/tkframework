import YouTube from 'react-native-youtube'
import { View, StyleSheet, Text } from 'react-native'
import React, { Component, PropTypes } from 'react'

import { Avatar, Card, ListItem, Toolbar } from 'react-native-material-ui'
import Container from 'ReactNotes/ui/components/Container'

const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    player:{
      alignSelf: 'stretch', 
      height: 300, 
      backgroundColor: 'black', 
      marginVertical: 10
    },
})

class YoutubePlayer extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  render() {

    const {route, navigator} = this.props
    return (
        <Container>
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => navigator.pop()}
                centerElement={route.title}
            />
            
            <YouTube
              ref="youtubePlayer"
              videoId={route.videoId} // The YouTube video ID
              play={true}           // control playback of video with true/false
              hidden={false}        // control visiblity of the entire view
              playsInline={true}    // control whether the video should play inline
              loop={false}          // control whether the video should loop when ended

              onReady={(e)=>{this.setState({isReady: true})}}
              onChangeState={(e)=>{this.setState({status: e.state})}}
              onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
              onError={(e)=>{this.setState({error: e.error})}}
              onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

              style={styles.player}
            />
            
        </Container>
    )
  }
}


export default YoutubePlayer
