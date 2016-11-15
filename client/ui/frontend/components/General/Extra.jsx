import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import TileCard from 'components/TileCard'
import Overlay from 'components/Overlay'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'

//page: Bo tro
const styles = {
  Dialog:{
    title: {
      color: "rgb(94, 163, 255)",
      fontSize: 36,
      textAlign: "center",
      fontWeight: 300
    },
  },
  content: {
    margin: "10px auto 20px",
  }
}

class Extra extends React.Component {

  componentDidMount(){
    // this.props.getBooks()
  }

  render() {
    const {books} = this.props;
    return (
      <div className="extra">
          <Overlay title="Comming Soon" text="<p>Tính năng này sẽ được mở ở phiên bản tiếp theo!</p>"/>
          <div className="col-md-12" style={styles.content} >
              <div className="media-wrapper">
                {
                  (!books.length)
                  ? <p>Khong co cam ket.</p>
                  : books.map((book) => (
                      <TileCard video={true} key={book.bookId} book={book}/>
                    ))
                }
              </div>
          </div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  books: [
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
    },
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

})


export default connect(mapStateToProps)(Extra)

