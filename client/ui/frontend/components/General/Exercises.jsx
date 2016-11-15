import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Headbar from 'components/Headbar'
import TileCard from 'components/TileCard'
import Overlay from 'components/Overlay'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress'
import Dialog from 'material-ui/Dialog'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ArrowRight from 'material-ui/svg-icons/navigation/arrow-forward'

//page: Bo tro
const styles = {
  content: {
    margin: "10px auto 20px",
  },
  button: {
  },
  Dialog: {
    title: {
      color: "rgb(94, 163, 255)",
      fontSize: 36,
      textAlign: "center",
      fontWeight: 300
    },
    linearProgress: {
      textAlign: "center",
      position: "relative",
      height: 15,
      display: "block",
      width: 400,
      backgroundColor: "rgb(239, 242, 249)",
      borderRadius: 7,
      margin: "10px auto",
      overflow: "hidden",
    },
    exercise: {
      clear: "both",
      textAlign: "center",
      marginTop: 20
    }
  }
}

class Exercises extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openExercise: false,
    }
  }

  handleOpen(){
    this.setState({openExercise: true})
  }

  handleClose(){
    this.setState({openExercise: false})
  }

  renderDialog(book){
    const actionDialog = [
      <RaisedButton     
        className="button primary mr-10 mt-20"            
        label="Tiếp tục"
        labelPosition="before"
        primary={true}
        labelStyle={{fontSize: "20px !important"}}
        overlayStyle={{width: 250, height: 60, padding: "10px"}}
        buttonStyle={{margin: "0 auto", display: "block", height: 60, borderRadius: "80px !important"}}
        style={{borderRadius: "80px !important"}}
        icon={<ArrowRight color={"white"}/>}
        onTouchTap={this.handleClose.bind(this)}
      />
    ]

    return(
      <Dialog
        actions={actionDialog}
        modal={false}
        open={this.state.openExercise}
        onRequestClose={this.handleClose.bind(this)}
      >
        <div className="Dialog-content">
          <div className="Dialog-title" style={styles.Dialog.title}>Nội dung bài tập</div>
          <LinearProgress mode="determinate" style={styles.Dialog.linearProgress} value={50} />
          <div className="Dialog-exercise" style={styles.Dialog.exercise} dangerouslySetInnerHTML={{_html: "<p>Chua co noi dung</p>"}}/>
        </div>
      </Dialog>
    )
  }

  renderExercise(){
    const {books} = this.props
    books.map((book) => (
        <div>
          {(book.title !== "common") && 
            <div className="media-wrapper text-center">
              <RaisedButton     
                className="button primary mr-10 mt-20"            
                label={book.title}
                primary={true}
                labelStyle={{fontSize: "20px !important"}}
                overlayStyle={{width: 250, height: 60, padding: "10px"}}
                buttonStyle={{margin: "0 auto", display: "block", height: 60, borderRadius: "50px !important"}}
                style={{borderRadius: "50px !important"}}
                icon={<ModeEdit color={"white"}/>}
                onTouchTap={this.handleOpen.bind(this)}
              />
            </div>
          }
          <div className="media-wrapper">
            {
              (!book.length)
              ? <Overlay title="Comming Soon" text="<p>Không có bài tập cho sách này!</p>"/>
              : book.items.map((item) => (
                  <TileCard key={item.bookId} book={item}/>
                ))
            }
          </div>
        </div>
      )
    )
  }

  componentDidMount(){
    // this.props.getBooks()
  }

  render() {
    const {books} = this.props;
    return (
        <div className="exercise">
          <Overlay text="<p>Tính năng này sẽ được mở ở phiên bản tiếp theo!</p>"/>

          {this.renderDialog(books)}

          <div className="col-md-12" style={styles.content} >
            {this.renderExercise(books)}
          </div>
        </div>
    )

  }

}

const mapStateToProps = (state) => ({
  books: [
      {
        title: "common",
        items: [
          {
            bookId: 1,
            title: "Bài tập chuyển đổi Because-Because of & Although-Despite",
            media: "http://youtube.com",
            time: "03:14",
            picture: "/images/mcbook-thumb-1.jpg",
          },
          {
            bookId: 2,
            title: "Bài tập với cụm từ chỉ mục đích In order to(so) that",
            media: "http://youtube.com",
            time: "03:14",
            picture: "/images/mcbook-thumb-2.jpg",
          },
          {
            bookId: 3,
            title: "It is(was) not until.. that",
            media: "http://youtube.com",
            time: "03:14",
            picture: "/images/mcbook-thumb-3.jpg",
          },
          {
            bookId: 4,
            title: "Bài tập về sự hòa hợp giữa chủ ngữ và động từ",
            media: "http://youtube.com",
            time: "03:14",
            picture: "/images/mcbook-thumb-4.jpg",
          }]
      },
      {
        title: "Bài kiểm tra số 1",
        items: [
          {
            bookId: 5,
            title: "Bài tập ngữ pháp - Thì hiện tại đơn",
            media: "http://youtube.com",
            time: "03:14",
            picture: "/images/mcbook-thumb-5.jpg",
          },
          {
            bookId: 6,
            title: "Thì tương lai tiếp diễn và thì tương lai hoàn thành",
            media: "http://youtube.com",
            time: "03:14",
            picture: "/images/mcbook-thumb-6.jpg",
          },
          {
            bookId: 7,
            title: "Các mức độ so sánh của tính từ và trạng từ-so sánh...",
            media: "http://youtube.com",
            time: "03:14",
            picture: "/images/mcbook-thumb-7.jpg",
          },
          {
            bookId: 8,
            title: "Tính từ và Trạng từ",
            media: "http://youtube.com",
            time: "03:14",
            picture: "/images/mcbook-thumb-8.jpg",
          }
        ]
      }
    ]
})


export default connect(mapStateToProps)(Exercises)

