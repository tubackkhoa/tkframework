import React, {PropTypes as T} from 'react'
import ReactDOM from 'react-dom'
import { pad, toTime } from './libs/utils'

import AVPlayArrow from 'material-ui/svg-icons/av/play-arrow'
import AVPause from 'material-ui/svg-icons/av/pause'
import AVVolumeMute from 'material-ui/svg-icons/av/volume-mute'
import AVVolumeUp from 'material-ui/svg-icons/av/volume-up'

// component should be best used for manipulating ui
// for data binding, we should use reducer and action outside to map to ui
// this Control never update ui but callback flash, so no need to use state
// manual import flowplayer
require ('./libs/flowplayer')

class Player extends React.Component {
    
  constructor (props) {
    super(props)
    // init player
    this.player = null
    this.timer = null

    // only one clip by default
    this.clipIndex = 0
    this.options = {      
      duration: 0,
      start: 0,
      time: 0           
    }

    this.config = {
        plugins: {     
          controls: null                 
        },        
        clip: {
            // it's possible to stream audio by using the RTMP plugin                
            autoPlay: false            
        }          
    }

    // swf config, each player can have its own player swf for style
    this.swf = {
      path : "/swf/flowplayer-3.2.18.swf",
      rtmp : "/swf/flowplayer.rtmp-3.2.13.swf",
    } 

    this.state = {
      play: false,
      mute: false
    }
  }

  seekTo(time){
    const duration = this.options.duration
    // must have duration to enable seek to(as we know the length of media)
    if(duration && this.player && this.player.isLoaded()){      
      this.player.seek((time / duration) * 100 + "%")
    }
  }

  // we dont want user to get controls, because when it is changed, nothing happened
  markPlay(state = true) {  
    this.setState({
      play: state
    })    
  }  

  markMute(state = true) {
    this.setState({
      mute: state
    })        
  }

  setProgressWidth (x) {
    const ballWidth = this.refs.ball.clientWidth
    this.refs.progressBar.style.width = x + "px"
    // also move play ahead
    this.refs.ball.style.left = (x -ballWidth / 2) + "px"              
  }

  getStatus(){
    // just know if we are playing, this is convenient way, but because we depend on ui
    // so no need to use new state variables
    return {
      mute: this.state.mute,
      playing: this.state.play
    }        
  }

  pause() {
    this.player && this.player.pause()
    this.markPlay(false)
  }

  resume() {
    this.player && this.player.resume()
    this.markPlay(true)
  }

  start() {
    if(this.player){
      this.markPlay(true)  
      this.player.play() 
    } else {
      // trigger lazy loading
      this.refs.play.onclick()
    }        
  }

  stop(unloading) {    

    if(!this.player)
      return
    this.markPlay(false)                    
    this.setProgressWidth(0)
    // mark as start again
    this.options.time = this.options.start                            
    this.refs.time.innerHTML = this.getTime(this.options.start) 
    // for sure
    this.player.stop()
  }

  setVolume(volume) {
    this.player && this.player.setVolume(volume)
    this.markMute(false)
  }

  mute() {
    this.player && this.player.mute()
    this.markMute(true)
  }

  unmute(){
    this.player && this.player.unmute()
    this.markMute(false)
  } 

  initControls() {
    // do not assign a static variable here because it will retain to the last this
    // remember that these functions are static functions
    if(this.player) {  

      // initial time, we have called prepareStyle for barwidth and time label               
      const trackWidth = this.refs.track.clientWidth
      const ballWidth = this.refs.ball.clientWidth

      const time2Width = (time) => {
        const gain = time - this.options.start
        const range = (this.options.stop || this.options.duration) - this.options.start
        const ratio = gain / range        
        return parseInt(Math.min(trackWidth * ratio, trackWidth - ballWidth / 2), 10) 
      }

      const width2Time = (x) => {
        const ratio = x / trackWidth
        const range = (this.options.stop || this.options.duration) - this.options.start
        const gain = ratio * range        
        return this.options.start + gain
      }       

      const dragTo = (x) => {        
        this.seekTo(width2Time(x))
        // update progress Bar
        this.setProgressWidth(x)
      }      
      
      // track click moves playHead       
      this.refs.track.onclick = (e) => {       
        
        dragTo(e.offsetX + (e.target.tagName === 'STRONG' ? e.target.offsetLeft : 0) - ballWidth / 2)
      }

      // arrow auto bind this to context
      this.refs.play.onclick = () => {       
        if (this.player.isLoaded()) {                                
          try{
            this.player.toggle()  
          }catch(e){
            // force restart
            this.stop()
            this.start()
          }
                         
        } else {          
          this.player.play()
        }           
      }

      // mute/unmute button
      this.refs.mute.onclick = () => {                
        if (this.player.getStatus().muted)  {
          this.player.unmute() 
        } else {
          this.player.mute()
        }
      }                 

      const updateTime = (clip) => {

        const stopTime = this.options.stop || clip.duration || 0        
        const status = this.player.getStatus()   
        // time from getStatus method may be corrupted when change clip       
        const statusTime = status.time

        // this is uncontrolled event, like unmounted, hidden.v..v
        if (statusTime === undefined) {
          // just an error
          // use hide player :v          
          this.markPlay(false)          
          clearInterval(this.timer)
          return
        }

        if(statusTime > stopTime){
          // exceed the limit so stop
          clearInterval(this.timer)
          this.stop()                
          return
        }

        // progress width, when finish, we have also to set the progress bar
        if (!this.player.isPaused()) {

          // buffer width
          // assume "filled buffer" for streaming protocols #152
          const bufferWidth = time2Width(clip.provider == "http" ? status.bufferEnd : stopTime)
          this.refs.bufferBar.style.width = bufferWidth + "px"

          // update some properties, not for update like state
          this.options.duration = clip.duration
          this.options.time = statusTime    
          // url is good enough, for much more information, use this.player to retrieve in more detail
          this.config.clip.url = clip.url    

          // update the duration for unmount event          
          this.refs.time.innerHTML = this.getTime(statusTime)
          // debug
          // console.log(statusTime)
          const progressWidth = time2Width(statusTime)          
          this.setProgressWidth(progressWidth)          

          // this is for current state in closure function                  
          // we rarely use player because it can cause some mess
          this.props.onChange 
            &&  this.props.onChange(this.clipIndex, this.options, this.config, this.player)
          
        }
        
      }

      this.player.onStart((clip) => {

        // clear previous timer   
        clearInterval(this.timer)        

        this.seekTo(Math.max(this.options.time, this.options.start))          
     
        // begin timer            
        this.timer = setInterval(() => updateTime(clip), 100)

        // fix for duration, later we store this    
        if(this.options.start){    
          this.options.duration = clip.duration
          setTimeout(() => this.seekTo(Math.max(this.options.time, this.options.start)), 100)        
        }

      })      
      
      this.player.onBegin((clip) => this.markPlay(true))

      // pause / resume states  
      this.player.onPause(() => this.markPlay(false))      
      this.player.onResume(() => this.markPlay(true))            
      
      // mute / unmute states 
      this.player.onMute(() => this.markMute(true))
      this.player.onUnmute(() => this.markMute(false))
            
      // clear timer when clip ends 
      this.player.onFinish((clip) => {
        clearInterval(this.timer)
        updateTime(clip)
        // then stop player
        this.stop()
      })      
      
      this.player.onUnload(() => {        
        this.refs.time.innerHTML = this.getTime(this.options.start)
      })      

    }
  }

  setControls(options) {
    Object.assign(this.options, options)
  }

  // we do not allow play directly from clip, because we want to play a section of clip
  setClip(clip) {
    if(this.player){
      // stop update
      clearInterval(this.timer)
      // maybe url or src attribute
      this.player.setClip({url: clip.url || clip.src, start: clip.start, duration:clip.duration})      
      // check if we are playing media
      if(this.getStatus().playing){        
        this.start()
      }          
    } else {
      Object.assign(this.config.clip, clip)           
    }

    // reset to new clip, we define our configuration
    this.options.start = clip.start || 0
    this.options.time = clip.time || 0
    this.options.duration = clip.duration || 0
    // ready to play :)
    this.preparePlayerStyle()
  }

  initPlayer() {
    // every let object can remain its value through all instances
    // such as const function inline can be treated as function for all instances 
    // so let obj can be accessed in later context
    Object.assign(this.swf, this.props.swf)
    
    // test src for override clip options
    if(this.props.src) {
      const match = this.props.src.match(/^(rtmp:\/\/.*)\/([^:]+:.*)$/)
      if(match){
        this.config.clip.url = match[2]
        this.config.plugins.rtmp = {
            url: this.swf.rtmp,
            netConnectionUrl: match[1],
            // make the rtmp plugin query the stream length from the server
            durationFunc: 'getStreamLength'
        }
        this.config.clip.provider = 'rtmp'
      } else {
        this.config.clip.url = this.props.src
      } 
    } else if(this.props.clip.url){
      this.config.clip.url = this.props.clip.url      
    } else {
      throw new Error("Must provide src or clip.url for player!!!")
    }

    // override via config clip, placed in this.config instead of private variable class let
    // because every instance can access that var, and if any of them try to change via reference
    // it can cause others to prone errors, so we disable init via clip but use src, then we can
    // use ref to manipulate better    

    // create player
    this.player = flowplayer(this.refs.player, this.swf.path, this.config)            
  
    // init as controlbar
    this.initControls()
  }

  getTime(time) {  
    // use static constructor, so we can override it later, such as Playlist will override
    // this format
    return "<span>" + this.constructor.utils.toTime(time) + "</span> <strong>" + 
            this.constructor.utils.toTime(this.options.stop || this.options.duration) + "</strong>"
  }


  componentWillUnmount(){        
    clearInterval(this.timer)    
    this.stop(true)
    this.player && this.player.unload()            
  }

  preparePlayerStyle(){
    const currentTime = Math.max(this.options.time, this.options.start)
    
    const trackWidth = this.refs.track.clientWidth
    const progressWidth = this.options.duration 
      // incase of divide by zero
      ? Math.floor((currentTime/this.options.duration) * trackWidth)
      : 0
    // for render we should use floor for better performance
    this.refs.progressBar.style.width = progressWidth + "px"                   
    // dont care for stop because it can not exceed duration
    this.refs.time.innerHTML = this.getTime(currentTime)
  }

  // do not use arrow function, cos it will rebind this, then we can not access any thing
  // for connect, the ref will disappear, but this one is state
  componentDidMount() {               
    // dont manipulate props, it can affect to default props because it is created via reference
    Object.assign(this.options, this.props.controls)        
            
    // as it it is ready to play
    this.preparePlayerStyle()
    
    // after styling, we must check carefully for api mapping
    if(this.player || !this.refs.player)
      return   

    if (this.props.clip.autoPlay){
      this.initPlayer()
    } else {
      this.refs.play.onclick = () => {  
        this.initPlayer()
        this.refs.play.onclick()
      }
    }     

    // re-assign property for default options ?, no need, we just care for override options
    // this.props.controls = opts                 
  }

  render() {       

    // we can use event on componentWillReceiveProps to update clip

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
        unmuteText = <AVVolumeUp color="inherit" />
      } = this.props.ui

      return (
        <div className={"sound-wrapper " + theme}>          
          <div ref="player" className="sound-player"></div>          
          <div ref="controls" className="sound-controls">                 
            <div ref="play" className={this.state.play ? pauseClass : playClass}>
              {this.state.play ? pauseText : playText}
            </div>
            <div ref="mute" className={this.state.mute ? muteClass: unmuteClass}>
              {this.state.mute ? muteText : unmuteText}
            </div>
            <div ref="track" className={trackClass}>
              <div ref="bufferBar" className={bufferClass}></div>
              <div ref="progressBar" className={progressClass}></div>
              <div ref="ball" className={playHeadClass}></div>
              <div ref="time" className={timeClass}></div>              
            </div>            
          </div>
        </div>
      )
  }
}

Player.propTypes = {    
  src: T.string.isRequired,
  swf: T.object,
  controls: T.object, 
  ui: T.object, 
  onChange: T.func
}

Player.defaultProps = {
  controls: {},
  clip: {},
  ui: {} // if we use default in this, we can not get default key for each value
}

Player.utils = {
  // display seconds in hh:mm:ss format
  toTime(sec) {
    if(typeof sec === 'string')
      return sec  
    if(sec === undefined) 
      return '00:00'
    const pad = (val) => {
      val = parseInt(val, 10);
      return val >= 10 ? val : "0" + val
    }
    const h = Math.floor(sec / 3600)
    let min = Math.floor(sec / 60)
    sec = sec - (min * 60)
    
    if (h >= 1) {
      min -= h * 60
      return pad(h) + ":" + pad(min) + ":" + pad(sec)
    }    
    return pad(min) + ":" + pad(sec)
  }
}

export default Player
