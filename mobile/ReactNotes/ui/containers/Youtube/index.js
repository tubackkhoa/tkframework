import { View, StyleSheet, Text, Image, ScrollView } from 'react-native'
import React, { Component, PropTypes } from 'react'

import { Avatar, Card, ListItem, Toolbar, Subheader } from 'react-native-material-ui'
import Container from 'ReactNotes/ui/components/Container'

import YoutubePlayer from './youtube-player'

import { connect } from 'react-redux'
import { searchYoutube } from 'ReactNotes/store/actions/youtube'
import * as youtubeSelectors from 'ReactNotes/store/selectors/youtube'


const mapStateToProps = (state) => ({  
  result: youtubeSelectors.getResult(state),  
})

@connect(mapStateToProps, { searchYoutube })
class YoutubeSpec extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  componentDidMount(){
    this.props.searchYoutube('the beatles')
  }

  _handleItemClick = (videoId, title) => {
    const {navigator} = this.props
    navigator.push({
        title: title,
        Page: YoutubePlayer,
        videoId,
    })
  }

  renderSearchResult(){
    const {result} = this.props
    return result.map(({snippet:item,id:{videoId}},index)=>(
      
      <ListItem
        key={index} 
        onPress={() => this._handleItemClick(videoId, item.title)}
        divider
        leftElement={<Image style={styles.image}
                      source={{uri: item.thumbnails.default.url}}/>}
        numberOfLines="dynamic"
        centerElement={{
            primaryText: item.title,
            secondaryText: item.publishedAt,
        }}
      />                
      
    ))  
  }

  render() {
    
      return (
          <Container>
              <Toolbar
                  leftElement="arrow-back"
                  onLeftElementPress={() => this.props.navigator.pop()}
                  centerElement={this.props.route.title}                  
                  searchable={{
                      autoFocus: true,
                      placeholder: 'Search',
                      onChangeText: value => this.props.searchYoutube(value),                      
                  }}
              />             
              <ScrollView style={styles.container}>                  
                {this.renderSearchResult()}               
              </ScrollView>
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

export default YoutubeSpec
