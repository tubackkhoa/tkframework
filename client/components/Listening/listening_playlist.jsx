import React from 'react'
import Playlist from 'components/Sound/playlist'
import { connect } from 'react-redux'
import * as bookSelectors from 'store/selectors/book'
import * as commonSelectors from 'store/selectors/common'
import * as actionCreators from 'store/actions/book'

// prefer font over svg
import Badge from 'material-ui/Badge'

class ListeningPlaylist extends React.Component {

  constructor(props) {
    super(props)
    // we will save track after each seconds
    this.tick = 0          
  }

  markClip(props){
    const clip = {
      url:(props.audio.source||'').replace('mcbooks-test', 'mcbooks-media'),
      time: this.getStoredTime(props),
      duration: props.audio.duration
    } 
    props.onClipChange && props.onClipChange(clip)     
    return clip
  }

  componentWillReceiveProps(nextProps){    
    if(this.props.audio.source !== nextProps.audio.source) {
      const clip = this.markClip(nextProps)          
      this.refs.playlist && this.refs.playlist.setClip(clip)         
    }
  }   

  componentDidMount() {
    this.markClip(this.props)          
  }

  onPlaylistChange(clipIndex, options){
    if(this.tick < 10){
      this.tick++ 
    } else {
      this.tick = 0                  
      // then call parent, each second      
      this.props.onPlaylistChange && this.props.onPlaylistChange(this.props.audio.audioId, options)
    }      
  }

  getStoredTime(props) {
    return props.audioTrack[props.audio.audioId] || 0 
  }

  shouldComponentUpdate(nextProps, nextState){   
    // we use willReceiveProps to change playlist
    return nextProps.readAudioRequest.status !== this.props.readAudioRequest.status      
      ||  nextProps.audio.audioId !== this.props.audio.audioId
  }

  render() {
    // audio track is changed frequently by parent, but we should check state in this child only
    // to help reduce time of checking changes in state collection
    const {audio:{source, duration, audioId}, readAudioRequest} = this.props       
    const time = this.getStoredTime(this.props)
    
    // console.log('render playlist')
    // by default, make sure to read book when request is success   
    if(source) {
        return (
          <div className="player col-md-12 p-20">
            <div className="col-md-9">                            

                <Playlist ref="playlist" onChange={this.onPlaylistChange.bind(this)}  
                    controls={{time: time, duration: duration}}                
                    items={[{url: source.replace('mcbooks-test', 'mcbooks-media')}]}
                />
              
            </div>

            <div className="col-md-3">
              <div className="pull-right m-10">
                <Badge
                  className="badge-blue"
                  badgeContent={3}
                  primary={true}
                 />

                 <Badge
                  badgeContent="Dịch"
                  className="ml-20 badge-green"
                  badgeStyle={{
                    width:50,
                    borderRadius: 12
                  }}
                  primary={true}
                 />

              </div>
            </div>

          </div>
        )

    } else {      
        return (
          <div className="notice">
            Bạn hãy chọn một audio để nghe
          </div>
        )
    }    
            
  }

}

const mapStateToProps = (state) => ({  
  audio: bookSelectors.getAudio(state),
  audioTrack: bookSelectors.getAudioTrack(state),  
  readAudioRequest: commonSelectors.getRequest(state, 'getBookAudio'), 
})

export default connect(mapStateToProps)(ListeningPlaylist)