import React, {PropTypes as T} from 'react'
import ReactDOM from 'react-dom'

import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AVPause from 'material-ui/svg-icons/av/pause'
import AVVolumeMute from 'material-ui/svg-icons/av/volume-mute'
import AVVolumeUp from 'material-ui/svg-icons/av/volume-up'
import AVFastForward from 'material-ui/svg-icons/av/fast-forward'
import AVFastRewind from 'material-ui/svg-icons/av/fast-rewind'

// force this component attached to Sound folder
import Player from './player'

class Playlist extends Player {

  constructor(props) {       
    super(props)    

    const first = props.items[0]    
    if(!first){
      throw new Error('Must have at least one item!!!')
    }
    props.clip.url = first.url
    this.items = this.props.items
  }

  stop(unloading) {    
    // we might cache duration, but no need, duration change all the time
    // except we know it and pass to these clips
    // and properties is readonly - so do not try to find a way to update it
    // it can lead to horrible errors
    if(this.clipIndex === this.items.length - 1){      
      super.stop()
    } else {  
      // be sure it is still on page
      if(!unloading) {
        this.refs.next.onclick()
      }
    }    
  }

  addClip(clip, index) {    
    this.items[index || this.items.length] = clip
  }

  replaceClips(clips){
    this.items = clips
  }

  // no start method, just play
  play (index) {
    index && (this.clipIndex = index)
    this.setClip(this.items[this.clipIndex])
  }

  initControls(opts){

    // we do not use react event to prevent users from adding event
    // we force them to use api
    super.initControls(opts)
       
    // next we process event
    this.refs.next.onclick = (e) => {            
      if(this.clipIndex < this.items.length - 1){
        this.clipIndex++        
        this.play()
      }
    }

    this.refs.back.onclick = (e) => {      
      if(this.clipIndex > 0) {
        this.clipIndex--
        this.play()
      }
    }

  }

  render() {            
      const {
        theme = 'blue',
        playHeadClass = 'playhead',
        trackClass = 'track',
        playClass = 'play',
        pauseClass = 'pause',
        playText  = <AVPlayArrow color="inherit" />,
        pauseText = <AVPause color="inherit" />,
        bufferClass = 'buffer',
        progressClass = 'progress',        
        timeClass = 'time',
        muteClass = 'mute',
        unmuteClass = 'unmute',
        muteText = <AVVolumeMute color="inherit" />,
        unmuteText = <AVVolumeUp color="inherit" />,
        nextClass = 'next',
        backClass = 'back',
        nextText = <AVFastForward color="inherit" />,
        backText = <AVFastRewind color="inherit" />
      } = this.props.ui      

      return (
        <div className={"sound-wrapper sound-playlist " + theme}>          
          <div ref="player" className="sound-player"></div>          
          <div ref="controls" className="sound-controls">                 
            <div ref="back" className={backClass}>{backText}</div>
            <div ref="play" className={this.state.play ? pauseClass : playClass}>
              {this.state.play ? pauseText : playText}
            </div>
            <div ref ="next" className={nextClass}>{nextText}</div>
            <div ref="mute" className={this.state.mute ? muteClass: unmuteClass}>
              {this.state.mute ? muteText : unmuteText}
            </div>
            <div ref="track" className={trackClass}>
              <div ref="bufferBar" className={bufferClass}></div>
              <div ref="progressBar" className={progressClass}></div>
              <div ref="ball" className={playHeadClass}></div>                          
            </div> 
            <div ref="time" className={timeClass}></div>         
          </div>          
        </div>
      )
  }

}

Playlist.propTypes = {    
  items: T.arrayOf(T.shape({
      url: T.string
  })).isRequired
}

Playlist.defaultProps = {
  ...Player.defaultProps,
  // more default value here  
}

export default Playlist