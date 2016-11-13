import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Headbar from 'components/Headbar'
import AvatarButton from 'components/AvatarButton'
import CommitmentText from 'components/General/CommitmentText'
import Commit from 'components/General/Commit'


import * as scheduleSelectors from 'store/selectors/book/schedule'

import * as bookSelectors from 'store/selectors/book'
import * as actionCreators from 'store/actions/book'
import * as scheduleCreators from 'store/actions/book/schedule'
import * as authSelectors from 'store/selectors/auth'
import * as commonSelectors from 'store/selectors/common'

//page: Tong quan
const styles = {
  checkbox: {
    float: "left",
    width: "300px",
    padding: "12px 0px",
    marginRight: 25
  },
  button: {
    margin: 12,
    float: 'right',
  },
  labelButton: {
    textTransform: "uppercase !important"
  },
  contentRight: {
    padding: "30px 40px",
  }
}


class General extends React.Component {

  constructor(props){
    super(props)    
  }

  componentWillMount(){    
    const {token, params: {bookId}} = this.props   
    // when no bookId, will use openBookId
    this.props.getBook(token.accessToken, bookId)
    this.props.getSchedule(token.accessToken, bookId)
  }

  onChangeSchedule(timeForm, timeTo, dayActive){
    // first change the schedule from store, then do actionCreator
    // by doing this all commit will be updated :v
    // then post back to server :D
    const newSchedules = []
    for(let k in dayActive){
      if(dayActive[k]){
        // it does not matter for lost of scheduleId and bookId in this item
        newSchedules.push({day:+k, from:timeForm, to:timeTo})
      }      
    }
    // update local
    this.props.replaceSchedule({schedules:newSchedules})

    // call action creator, then post to server
    // post here
  }

  renderEditor(){
    const {book,readBookRequest} = this.props 
    // by default, make sure to read book when request is success   
    switch (readBookRequest.status) {
      case 'success':
        return book.author.map((editor) => (
          <AvatarButton marginRight={30} key={editor.authorId} href="" src={editor.avatar} type="large" label={editor.name}/>
        ))

      default:
        return (
          <div className="notice">
            Loading...
          </div>
        )
      }
  }

  render() {
    const {commits, editors, book, getCommits} = this.props;    
    const Commits = commits.map((commit) => (
      <Commit onChangeSchedule={this.onChangeSchedule.bind(this)} key={commit.id} commit={commit}/>
    ))
    
    // console.log('show book index general')
    // console.log(this.book)

    return (
            
      <div className="general">
        <div className="col-md-3">
          <div className="row pt-30">
            <CommitmentText quote="book.commitment.text"/>
          </div>
        </div>
        <div className="col-md-9" style={styles.contentRight} >
          <div className="headingText">Cam kết của bạn</div>
          <div className="mt-5">
            <div className="commit-wrapper">
              {
               Commits 
              }
            </div>
          </div>

          <div className="Commit-footer">
            <FlatButton className="mt-10" label="+ thêm lịch" onClick={getCommits} primary={true} />
            {
             // <FlatButton className="mt-10" label="+ hiển thị thêm" onClick={getCommits} primary={true} />
             // <RaisedButton label="thêm lịch" labelColor={'white'} labelStyle={styles.labelButton} className="button green" style={styles.button} />
            }
          </div>
            <Divider/>
    
          <div className="headingText mt-20">Giới thiệu về sách</div>
          <div className="mb-30 mt-20" dangerouslySetInnerHTML={{__html: book.fullDescription}}></div>
            <Divider/>
          <div className="headingText mt-20">Hướng dẫn học</div>
          <div className="mb-30 mt-20" dangerouslySetInnerHTML={{__html: book.fullInstruction}}></div>
            <Divider/>
            
          <div className="headingText mt-20">Đội ngũ biên tập</div>
          <div className="mb-30 mt-20">
            <div className="editors-wrapper">
              {this.renderEditor()}
            </div>
          </div>
        </div>
      </div>

      
    )

  }

}

const mapStateToProps = (state) => ({
  commits: [
    {
      "id": 0,
      "content": "Học tối thiểu mỗi ngày 45 phút",
    },
    {
      "id": 1,
      "content": "Học liên tục các ngày trong tuần",
    },
    {
      "id": 5,
      "content": "Học chăm chỉ trong 4 tháng",
    }
  ],
  // bookId: state.generalReducer.bookId || 0,
  // createCommitCalendar: (state) =>{

  // },
  book: bookSelectors.getOpenBook(state),
  token: authSelectors.getToken(state),    

  
  schedules: scheduleSelectors.getBookSchedule(state),

  readBookRequest: commonSelectors.getRequest(state, 'getBook'),
})


export default connect(mapStateToProps, {...actionCreators, ...scheduleCreators})(General)

