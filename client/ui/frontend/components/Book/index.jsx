import React, { PropTypes, Component } from 'react'
import {Link} from 'react-router'

class Book extends Component {

  render() {
    const {icon, title, bookId} = this.props.book
    return (      
      <div className="book text-center">
        <Link to={`/gioithieu/${bookId}`}>
          <img src={icon} />
          <div className="title">{title}</div>
        </Link>
      </div>      
    )

  }

}


export default Book