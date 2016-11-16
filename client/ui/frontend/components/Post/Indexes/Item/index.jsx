import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import TagList from 'ui/shared/components/TagList'

const Item = ({ id, title, lead_sentence, published_at, tags }) => {
  return (
    <div >
      <Link to={`/posts/${id}`}>
        <h3 >{title}</h3>
        <p >{lead_sentence}</p>
      </Link>
      {tags &&
        <TagList tags={tags} path="/posts" />
      }
      <div >{published_at}</div>
    </div>
  )
}

export default Item
