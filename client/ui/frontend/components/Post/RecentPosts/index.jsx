import React, { PropTypes } from 'react'
import Item from './Item'
import { Link } from 'react-router'

const RecentPosts = ({ posts }) => {
  return (
    <div>
      <h3>RECENT POSTS</h3>
      <ul>
        {posts.map(post => {
          return <Item key={post.id} {...post} />
        })}
      </ul>
      <Link to="/posts">
        <h2>ALL POSTS</h2>
      </Link>
    </div>
  )
}

export default RecentPosts
