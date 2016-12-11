import YouTube from 'react-native-youtube'
import { 
  View, 
  StyleSheet, 
  Text,
  Video, 
} from 'react-native'
import React, { Component, PropTypes } from 'react'

import { Avatar, Card, ListItem, Toolbar, Button } from 'react-native-material-ui'
import Container from 'ReactNotes/ui/components/Container'

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

              onReady={(e)=>{this.setState({isReady: true})}}
              onChangeState={(e)=>{this.setState({status: e.state})}}
              onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
              onError={(e)=>{this.setState({error: e.error})}}
              onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

              style={styles.player}
            />

            {statistics &&
            <View style={styles.rowContainer}>
                <View style={styles.button}>
                    <Button primary text={statistics.viewCount} icon="visibility" />
                </View>
                <View style={styles.button}>
                    <Button primary text={statistics.likeCount} icon="mood" />
                </View>
            </View>
            }
            
        </Container>
    )
  }
}


export default YoutubePlayer
