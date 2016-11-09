import React from 'react'
import Playlist from 'components/Sound/playlist'
import { connect } from 'react-redux'

import TrackList from './tracklist'

import * as commonSelectors from 'store/selectors/common'
import * as bookSelectors from 'store/selectors/book'

import { PropTypes} from 'react'

class ListeningTrackLists extends React.Component {

  onSelectedTrackItem(trackItem){  
    // scroll to this trackItem, store it to run when did mount
    this.selectedTrackItem = trackItem
    this.props.onSelectedTrackItem && this.props.onSelectedTrackItem(trackItem)
  }

  shouldComponentUpdate(nextProps, nextState){      
    
    // should not update the whole page, or use connect in children
    // render when changing status of request or changing data via id :D
    return nextProps.readBookRequest.status !== this.props.readBookRequest.status      
      ||  nextProps.book.bookId !== this.props.book.bookId      
  }

  renderBookParts(book){
    return book.parts.map((track, index)=>(
      <TrackList key={track.partId}
        bookId={book.bookId}
        title={`Phần ${index + 1}`}       
        onSelectedTrackItem={this.onSelectedTrackItem.bind(this)}
        description={`${track.title} (${track.totalDone}/${track.totalAudio})`}
        items={track.audios} />
    ))
  }

  render(){    
    // use real key for better synchronize with server side    
    const {book, readBookRequest} = this.props 
    // console.log('render tracklist', book)
    // by default, make sure to read book when request is success   
    switch (readBookRequest.status) {
      case 'success':
        return (
          <div className="tracklists">
            {this.renderBookParts(book)}
          </div> 
        )      

      default:
        return (
          <div className="notice">
            Loading...
          </div>
        )
      }       
  }

}

  // do not use PropTypes as constraint unless you are so sure about it
// it will help us prevent unwanted warning

const mapStateToProps = (state) => ({            
  book: bookSelectors.getOpenBook(state), 
  readBookRequest: commonSelectors.getRequest(state, 'getBook'),
})

export default connect(mapStateToProps)(ListeningTrackLists)