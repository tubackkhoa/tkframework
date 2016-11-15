import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {Dialog, RaisedButton, IconButton, LinearProgress, Checkbox} from 'material-ui'
import DayCommitBar from 'components/DayCommitBar'
import OutlineButton from 'components/OutlineButton'
import InfoIcon from 'material-ui/svg-icons/action/info'

import * as bookSelectors from 'store/selectors/book'
import * as actionCreators from 'store/actions/book'
import * as authSelectors from 'store/selectors/auth'
import * as commonSelectors from 'store/selectors/common'

const styles = {
  Dialog:{
    title:{
      color: "rgb(94, 163, 255)",
      fontSize: 36,
      textAlign: "center",
      fontWeight: 300
    }
    
  },
  button: {
    margin: 12,
    float: 'left',
    borderRadius: 7,
  },
  labelButton: {
    textTransform: "uppercase !important"
  },
  linearProgress: {
    position: "relative",
    height: 8,
    display: "block",
    width: 200,
    backgroundColor: "rgb(239, 242, 249)",
    borderRadius: 7,
    marginTop: 10,
    overflow: "hidden",
    float: "right",
  }
}


class Headbar extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      openCommitPopup: false,
    }
  }

  handleOpen() {
    this.setState({openCommitPopup: true})  
  }

  handleClose () {
    this.setState({openCommitPopup: false})
  }

  componentDidMount(){
    // get book from server    
    // this.props.getBooks(this.props.token.accessToken)
    this.props.ready && this.props.ready(this)
  }

  shouldComponentUpdate(nextProps, nextState){      
    // should not update the whole page, or use connect in children
    // render when changing status of request or changing data via id :D
    return nextProps.pathname !== this.props.pathname
          || nextProps.book.bookId !== this.props.book.bookId
          || nextState.openCommitPopup !== this.state.openCommitPopup
  }

  renderDialog(){

    const actionDialog = [
      <RaisedButton     
        className="button primary mr-10 mt-20"            
        label="Học ngay"
        primary={true}
        labelStyle={{fontSize: "60px !important"}}
        overlayStyle={{width: 200, height: 60, padding: "10px"}}
        buttonStyle={{margin: "0 auto", display: "block", height: 50, borderRadius: "80px !important"}}
        style={{borderRadius: "80px !important"}}
        onTouchTap={this.handleClose.bind(this)}
      />
    ]

    return (
      <Dialog
            actions={actionDialog}
            modal={false}
            autoDetectWindowHeight={false}
            bodyStyle={{height: "800px !important"}}
            open={this.state.openCommitPopup}
            onRequestClose={this.handleClose.bind(this)}
            className="dialog-root"
            contentClassName="dialog-content"
            bodyClassName="dialog-body"
          >

          
            <div className="Dialog-title" style={styles.Dialog.title}>Nội dung bài tập</div>
            <p>Vui lòng lựa chọn các cam kết sau</p>
            <div className="mt-5">
              <div style={styles.block}>
                <Checkbox
                    label="Check1"
                    style={styles.checkbox}
                />
                <Checkbox
                    label="Check2"
                    style={styles.checkbox}
                />
                <Checkbox
                    label="Check3"
                    style={styles.checkbox}
                />
                </div>
            </div>
            <p>Nhập cam kết riêng của bạn</p>
            <textarea rows="5" cols="50"></textarea>
            <p>Lịch học của bạn</p>
            <div className="time-schedule">
              <div className="time">
                <p>Giờ học hằng ngày</p>
                <p>19:00</p>
              </div>
              <div className="duration">
                <p>Thời lượng học tối thiểu</p>
                <p>45 phút</p>
              </div>
              <div className="day">
                <p>Ngày học trong tuần</p>
              </div>
              <DayCommitBar/>
            </div>
      </Dialog>
    )
  }

  renderMenu(hideMenu=false){    
    const {pathname, book} = this.props
    const menus = [
      {title: 'Tổng quan', pathname:`/tongquan/${book.bookId}`},
      {title: 'Nghe', pathname:`/nghe/${book.bookId}`},
      {title: 'Bài tập', pathname:`/baitap/${book.bookId}`},
      {title: 'Bổ trợ', pathname:`/botro/${book.bookId}`},
    ]

    return (!hideMenu &&             
      <div className="menu-bar">
        <div className="container">
            <div className="col-md-3">
              <div className="row"></div>
            </div>
            <div className="col-md-9">
              <div className="row mt-20 ml-30">
                <div>
                  {menus.map((menu,index)=> 
                    <OutlineButton key={index}
                      label={menu.title} 
                      active={menu.pathname === pathname} 
                      href={menu.pathname}/>
                  )}                    
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }

  renderBadge(){
    return(
      <div className="member-badge mt-10">
        <span className="pull-left m-10">VIP</span>
        <span className="pull-left m-10">365 Ngay</span>
        <InfoIcon className="pull-right m-5" color="white"/>
      </div>
    )
  }
  
  render() {    
    
    const {full=true, book} = this.props
    const hideMenu = this.props.pathname === `/gioithieu/${book.bookId}`

    return(
      <div className="headbar">
        <div className="info-bar">
          <div className="container">
            <div className="col-md-3">
              <div className="row pt-30">
                <div className="picture">
                  <img src={book.cover} alt={book.title}/>
                </div>
                {!hideMenu
                  && <LinearProgress mode="determinate" 
                      style={styles.linearProgress} value={50} />
                
                }
              </div>
            </div>
            <div className="col-md-9">
              <div className="head-panel col-md-9 pt-30 pl-30">
                <div className="title"><span>{book.title}</span></div>
                {!hideMenu
                ? this.renderBadge()
                : <RaisedButton onTouchTap={this.handleOpen.bind(this)} 
                      label="Học sách này" labelColor={'white'} 
                      labelStyle={styles.labelButton} className="button green" 
                      style={styles.button} />
                }
              </div>
              {!hideMenu
                && <div/>
              // Hien tai chua co xep hang
              // <div className="head-panel col-md-3 pt-30 pl-30">
              //   <div className="top-rate pt-20"><span>Xếp hạng</span>
              //     <div className="rating">335434</div>
              //     <Link className="viewmore" to="/bangxephang">Bảng xếp hạng &gt;</Link>
              //   </div>
              // </div>              
              }
            </div>
          </div>
        </div>
        
        {this.renderMenu(hideMenu)}

        <div className="Dialog-wrapper">
          {this.renderDialog()}
        </div>
      </div>
    )

  }

}

const mapStateToProps = (state) => ({
  book: bookSelectors.getOpenBook(state),  
  pathname: commonSelectors.getCurrentPathname(state),
})


export default connect(mapStateToProps, actionCreators)(Headbar)

