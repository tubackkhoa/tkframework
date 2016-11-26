import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import TagList from 'ui/shared/components/TagList'
import Divider from 'material-ui/Divider'

const Item = ({ id, title, lead_sentence, published_at, tags }) => {
  published_at = published_at || new Date().toString()
  return (
    <div className='col-md-12 row mb-20'>
      <Link to={`/posts/${id}`}>
        <h3 >{title}</h3>
        <p >{lead_sentence}</p>
      </Link>
      <div className='pull-left'>
      {tags &&
        <TagList tags={tags} path="/posts" />
      }
      </div>
      <div className='pull-right'>{published_at.replace(/\s*GMT.*$/,'')}</div>      

      <Divider />
    </div>
  )
}

export default Item
