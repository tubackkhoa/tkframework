import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
// import { List } from 'react-virtualized'

import Player from 'components/Sound/player'
import Book from 'components/Book'
import * as actionCreators from 'store/actions/book'
import * as authSelectors from 'store/selectors/auth'
import * as bookSelectors from 'store/selectors/book'
import * as commonSelectors from 'store/selectors/common'

@connect((state) => ({
  books: bookSelectors.getBooks(state),
  token: loginSelectors.getToken(state),
  isLoggedIn: loginSelectors.isLogged(state),
  readBooksRequest: commonSelectors.getRequest(state, 'getBooks'),
}), actionCreators)
export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    }

    this.bookLoaded = false
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  }

  handleAddBook(){
    this.props.addBook(this.props.token.accessToken, this.refs.barcode.input.value)
    this.setState({open: false})
  }

  loadBooks(){
    if(!this.bookLoaded && this.props.isLoggedIn){
      this.bookLoaded = true
      console.log(this.props.token.accessToken)
      this.props.getBooks(this.props.token.accessToken) 
    } 
  }

  componentDidMount(){
    this.loadBooks()  
  }


  renderBooks(){
    const {books, readBooksRequest} = this.props
    switch (readBooksRequest.status) {
      case 'success':
        return books.map(book => (
            <div className="col-md-3 p-20" key={book._id}>
              <Book book={book} />
            </div>
        ))
      case 'failure':
        return (
          <div className="notice">
            {readBooksRequest.error.message}
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

  shouldComponentUpdate(nextProps, nextState){      
    // should not update the whole page, or use connect in children
    // render when changing status of request or changing data via id :D

    this.loadBooks()

    return nextProps.readBooksRequest.status !== this.props.readBooksRequest.status
          || nextProps.isLoggedIn !== this.props.isLoggedIn
          || nextState.open !== this.state.open
  }

  renderNotLogged(){
    return(
      <div>
        <h1>Please login</h1>
        <p>Thanks you!</p>
      </div>
    )
  }

  render() {
    if(!this.props.isLoggedIn) 
      return this.renderNotLogged()      

    const actions = [
      <RaisedButton
        label="Thêm sách"
        primary={true}
        keyboardFocused={true}
        style={{marginRight: 10}}
        onTouchTap={this.handleAddBook.bind(this)}
      />,
      <FlatButton
        label="Đóng hộp thoại"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ]

    const {addBook, getBooks, cancelGetBooks} = this.props

    return (
      <div className="container">          
        
        <div className="col-md-12">
            <Dialog
              title="Thêm sách"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose.bind(this)}
            >
              Nhập mã số sách để thêm sách vào bộ sưu tập của bạn.
              <br />
              <TextField
                floatingLabelText="Mã số sách (mã vạch/barcode)" ref='barcode'
              /><br />

            </Dialog>
            <RaisedButton            
              primary={true}
              className="button green pull-right mr-30 mt-20"   

              label="Thêm sách mới"
              onTouchTap={this.handleOpen.bind(this)}
            />
         

        </div>

        {  this.renderBooks() }
        
      </div>
    )
  }
}

Dashboard.propTypes = {
  books: PropTypes.array,
  getBooks: PropTypes.func,
  addBook: PropTypes.func,
}

