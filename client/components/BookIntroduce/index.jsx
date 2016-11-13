import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'
import DayCommitBar from 'components/DayCommitBar'

import AvatarButton from 'components/AvatarButton'
import CommitPopup from 'components/CommitPopup'
import {Commit} from 'components/General'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Headbar from 'components/Headbar'
import {List, ListItem, FontIcon} from 'material-ui'

import TrackList from 'components/Listening/tracklist'
import * as bookSelectors from 'store/selectors/book'
import * as commonSelectors from 'store/selectors/common'
import * as authSelectors from 'store/selectors/auth'
import * as bookCreators from 'store/actions/book'

//page: Gioi thieu ve sach
class BookIntroduce extends React.Component {

  constructor(props){
    super(props)
    const {token, params: {bookId}} = this.props
    this.token = token.accessToken
    this.props.getBook(this.token, bookId)
  }

  renderBookParts(book){    
    // use real key for better synchronize with server side    
    return book.parts.map((track, index)=>(
      <TrackList key={track.partId}
        bookId={book.bookId}
        title={`Phần ${index + 1}`}                 
        description={`${track.title} (${track.totalDone}/${track.totalAudio})`}
        items={track.audios} />
    ))    
  }
  
  renderEditor(){
    const {book, readBookRequest} = this.props
    switch (readBookRequest.status) {
      case 'success':
        return (
          book.author.map((editor)=>(
            <AvatarButton marginRight={30} key={editor.authorId} href="" src={editor.avatar} type="large" label={editor.name}/>
          ))
        )

      default:
        return (
          <div className="notice">
            Loading...
          </div>
        )
      }
  }

  render() {
    const {book, readBookRequest} = this.props
    // console.log(book)
    return ((readBookRequest.status==='success') &&
        <div className="BookIntroduce">
              <div className="col-md-3">
                <div className="row"></div>
            </div>
            <div className="container">
                <div className="headingText mt-30 mb-30">Giới thiệu về sách</div>
                <div className="row" dangerouslySetInnerHTML={{__html:book.fullDescription}}></div>
                <Divider/>
                <div className="headingText mt-30 mb-30">Nội dung bài học</div>
                  {this.renderBookParts(book)}
                <div className="mt-30 mb-30"><RaisedButton className="button primary mr-10" label="Xem hết" primary={true}/></div>
                <Divider/>
                <div className="headingText mt-30 mb-30">Đội ngũ biên tập</div>
                <div className="row">
                    <div className="editors-wrapper">
                      {
                        this.renderEditor()
                      }
                    </div>
                </div>
            </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => ({
audio: bookSelectors.getAudio(state),
token: authSelectors.getToken(state),
book: bookSelectors.getOpenBook(state),
readBookRequest: commonSelectors.getRequest(state, 'getBook'),
tracks: [
  {
    title: "Phần 1",
    description: "Kỹ năng đi phỏng vấn ( 30/30 - 10.5 giờ)",
    items: [
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", cc: false},
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", page: 88, repeat:3},
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", page: 88, repeat:3},
    ]
  },
  {
    title: "Phần 2",
    description: "Kỹ năng đi phỏng vấn ( 30/30 - 10.5 giờ)",
    items: [
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", page: 88, repeat:3},
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", page: 88, repeat:3},
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", page: 88, repeat:3},
    ]
  },
  {
    title: "Phần 3",
    description: "Kỹ năng đi phỏng vấn ( 30/30 - 10.5 giờ)",
    items: [
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", page: 88, repeat:3},
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", page: 88, repeat:3},
      {title: "Kỹ năng đi phỏng vấn", description:"Audio - 1:30", page: 88, repeat:3},
    ]
  }
]
})


export default connect(mapStateToProps, bookCreators)(BookIntroduce)

