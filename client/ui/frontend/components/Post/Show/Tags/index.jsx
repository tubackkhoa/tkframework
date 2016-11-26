import React, { PropTypes } from 'react'
import Item from './Item'

function Tags({ tags, adminPath }) {
  return (
    <section className='tag-list'>
      {tags.map((tag) => (
        <Item
          key={tag.id}
          adminPath={adminPath}
          {...tag}
        />        
      ))}
    </section>
  )
}

export default Tags
