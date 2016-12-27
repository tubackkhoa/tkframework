import YouTube from 'react-native-youtube'
import { 
  View, 
  StyleSheet, 
  Text,
  TouchableHighlight,
} from 'react-native'
import React, { Component, PropTypes } from 'react'

import { Avatar, Card, ListItem, Toolbar, Button } from 'react-native-material-ui'
import Container from 'ReactNotes/ui/components/Container'

import Sound from 'react-native-sound'
import {AudioRecorder, AudioUtils} from 'react-native-audio'

import { connect } from 'react-redux'
import { detailYoutube } from 'ReactNotes/store/actions/youtube'
import * as youtubeSelectors from 'ReactNotes/store/selectors/youtube'

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
    rowContainer: {
        margin: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        marginHorizontal: 1,
    },
    controls: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    progressText: {
      paddingTop: 50,
      fontSize: 50,
      color: "#fff"
    },
    button: {
      padding: 20
    },
    disabledButtonText: {
      color: '#eee'
    },
    buttonText: {
      fontSize: 20,
      color: "#fff"
    },
    activeButtonText: {
      fontSize: 20,
      color: "#B81F00"
    },
})

const mapStateToProps = (state) => ({  
  item: youtubeSelectors.getOpenItem(state),  
})

@connect(mapStateToProps, { detailYoutube })
class YoutubePlayer extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  state = {
    currentTime: 0.0,
    recording: false,
    stoppedRecording: false,
    finished: false,
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
  }

  prepareRecordingPath(audioPath){
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    })
  }

  componentDidMount() {
    this.prepareRecordingPath(this.state.audioPath)
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)})
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.status === "OK"})
      console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${data.audioFileURL}`)
    }
  }

  _renderButton(title, onPress, active) {
    const style = (active) ? styles.activeButtonText : styles.buttonText

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>
          {title}
        </Text>
      </TouchableHighlight>
    )
  }

  _pause() {
    if (this.state.recording){
      AudioRecorder.pauseRecording()
      this.setState({stoppedRecording: true, recording: false})
    }
  }

  _stop() {
    if (this.state.recording) {
      AudioRecorder.stopRecording()
      this.setState({stoppedRecording: true, recording: false})
    }
  }

  _play() {
    this._stop()
    const sound = new Sound(this.state.audioPath, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error)
      }
    })

    setTimeout(() => {
      sound.play((success) => {
        if (success) {
           console.log('successfully finished playing')
         } else {
           console.log('playback failed due to audio decoding errors')
         }
      })
    }, 500)
  }

  _record() {
    if(this.state.stoppedRecording){
      this.prepareRecordingPath(this.state.audioPath)
    }
    AudioRecorder.startRecording();
    this.setState({recording: true})
  }

  componentWillMount(){
    this.props.detailYoutube(this.props.route.videoId)
  }

  render() {

    const {route, navigator, item:{statistics}} = this.props
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
              apiKey='AIzaSyAYMWfgMbdpwAzUPyxd7XhrgKCfmAq5IQY'
              onReady={(e)=>{this.setState({isReady: true})}}
              onChangeState={(e)=>{this.setState({status: e.state})}}
              onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
              onError={(e)=>{this.setState({error: e.error})}}
              onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

              style={styles.player}
            />

            {
            //   statistics &&
            // <View style={styles.rowContainer}>
            //     <View style={styles.button}>
            //         <Button primary text={statistics.viewCount} icon="visibility" />
            //     </View>
            //     <View style={styles.button}>
            //         <Button primary text={statistics.likeCount} icon="mood" />
            //     </View>
            // </View>
            }

            <View style={styles.controls}>
              {this._renderButton("RECORD", () => {this._record()}, this.state.recording )}
              {this._renderButton("PLAY", () => {this._play()} )}
              {this._renderButton("STOP", () => {this._stop()} )}
              {this._renderButton("PAUSE", () => {this._pause()} )}
              <Text style={styles.progressText}>{this.state.currentTime}s</Text>
            </View>
            
        </Container>
    )
  }
}


export default YoutubePlayer
