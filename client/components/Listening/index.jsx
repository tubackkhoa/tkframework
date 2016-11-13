import React from 'react'
import { PropTypes} from 'react'
import FontIcon from 'material-ui/FontIcon'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui'
import {blue400, white} from 'material-ui/styles/colors'


// import Playlist from 'components/Sound/playlist'
import ListeningPlaylist from './listening_playlist'
import ListeningTrackLists from './listening_tracklists'
import ChatLogList from './chatlog_list'

import * as authSelectors from 'store/selectors/auth'
import * as bookSelectors from 'store/selectors/book'
import * as commonSelectors from 'store/selectors/common'
import * as actionCreators from 'store/actions/book'

class Listening extends React.Component {

  constructor(props){
    super(props)        
  }

  shouldComponentUpdate(nextProps, nextState){      
    // should not update the whole page, or use connect in children
    // render when changing status of request or changing data via id :D
    return false
  }

  componentWillMount(){    
    const {token, params: {bookId}} = this.props       
    this.props.getBook(token.accessToken, bookId)     
  }

  componentDidMount(){        
    this.refs.trackListContainer.scrollTop = 0
    // this.headbar.handleOpen()
  }

  onClipChange(clip) {        
  }

  onPlaylistChange(audioId, options) {                
    // save audio track after each second 
    this.props.saveAudioTrack(audioId, options.time) 
  }

  onSelectedTrackItem(trackItem){    
    this.props.getAudio(this.props.token.accessToken, 
        this.props.params.bookId, trackItem.props.audioId)    
  }

  
  render() {

    // for children, react will not append false return
    // but for attribute, it can return false as string, 
    // so dont use condition && when return attribute as style and display instead of prop-assign

    return (
                
      <div className="listening">
        <div className="col-md-4 pr-0">
          <div ref="trackListContainer" className="left-panel p-20">
            <ListeningTrackLists              
              onSelectedTrackItem={this.onSelectedTrackItem.bind(this)} 
            />
          </div>          
        </div>
        
        <div className="col-md-8 pl-0 pr-0 right-panel pt-10">                          
          <ChatLogList />
          <ListeningPlaylist                     
              onClipChange={this.onClipChange.bind(this)}  
              onPlaylistChange={this.onPlaylistChange.bind(this)}                      
          />         
        </div>
      </div>
      
    )

  }
}
// do not use PropTypes as constraint unless you are so sure about it
// it will help us prevent unwanted warning

// just an options
Listening.propTypes = {
  getAudio: PropTypes.func,
}

const mapStateToProps = (state) => ({    
  token: authSelectors.getToken(state),
})

export default connect(mapStateToProps, actionCreators)(Listening)
