import React, { PropTypes } from 'react'
import { Link } from 'react-router'

const Item = ({ adminPath, id, name }) => {
  return (
    <Link to={`${adminPath}/posts?tag-id=${id}`} >
      {name}
    </Link>
  )
}

export default Item
