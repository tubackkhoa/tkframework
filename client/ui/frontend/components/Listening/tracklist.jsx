import React from 'react'
import { PropTypes} from 'react'
import FontIcon from 'material-ui/FontIcon'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui'

import {green300} from 'material-ui/styles/colors'

import TrackItem from './trackitem'
import * as bookSelectors from 'store/selectors/book'
import * as authSelectors from 'store/selectors/auth'
import * as actionCreators from 'store/actions/book'

class TrackList extends React.Component {

  constructor(props){
    super(props)    
    this.currentTrackItem = null
  }

  onSelectedTrackItem(trackItem) {
    // do something here
    const audioId = trackItem.props.audioId

    // do thing when changes
    if(trackItem !== this.currentTrackItem){            
      if(this.currentTrackItem){
        this.currentTrackItem.setActive(false)
      }      
      this.currentTrackItem = trackItem
      this.currentTrackItem.setActive(true)      
    }

    // trigger parent
    this.props.onSelectedTrackItem && this.props.onSelectedTrackItem(trackItem)
  }

  render() {

    const{title, description, items, bookId,currentAudioId=0} = this.props    

    return (
      <List className="track-list">
        <h3 className="title">{title}</h3>
        <div className="description mb-20">{description}</div>
        <Divider/>
        { 
          items.map((item)=> 
          <TrackItem key={item.audioId} 
            onSelectedTrack={this.onSelectedTrackItem.bind(this)}            
            currentAudioId={currentAudioId}   
            currentLockStatus={item.state}
            {...item} /> 
          )
        }
      </List>
    )
  }    
}

export default TrackList