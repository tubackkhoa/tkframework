import { View, StyleSheet, Text, Image } from 'react-native'
import React, { Component, PropTypes } from 'react'

import { Avatar, Card, ListItem, Toolbar } from 'react-native-material-ui'
import Container from 'ReactNotes/ui/components/Container'

// import YouTube from 'react-native-youtube'
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

  renderSearchResult(){
    const {result} = this.props
    return result.map(({snippet:item},index)=>(
      <Card key={index}>
          <ListItem
              leftElement={<Image style={styles.image}
                          source={{uri: item.thumbnails.default.url}}/>}

              centerElement={{
                  primaryText: item.channelTitle,
                  secondaryText: item.publishedAt,
              }}
          />
          <View style={styles.textContainer}>
              <Text>
                  {item.title}
              </Text>
          </View>
      
      </Card>
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

              {this.renderSearchResult()}               

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
})

export default YoutubeSpec
