import React, { PropTypes } from 'react'
import { Link } from 'react-router'


const Item = ({ id, title, leadSentence }) => {
  return (
    <li className='post-item'>
      <Link to={`/posts/${id}`}>
        <p className='title'>{title}</p>
        <p className='leadSentence'>{leadSentence}</p>
      </Link>
    </li>
  );
}

export default Item
