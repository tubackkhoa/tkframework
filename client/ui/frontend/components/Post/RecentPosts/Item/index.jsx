import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { CardTitle, CardHeader } from 'material-ui/Card'

const Item = ({ id, title, lead_sentence }) => {
  return (
    <li className='post-item'>
      <Link to={`/posts/${id}`}>
        <CardHeader title={title} subtitle={lead_sentence} />
      </Link>
    </li>
  );
}

export default Item
