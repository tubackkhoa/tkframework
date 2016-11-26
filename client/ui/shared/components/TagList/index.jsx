import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import LabelOutline from 'material-ui/svg-icons/action/label-outline'
import inlineStyles from 'ui/shared/styles/MaterialUI'



const TagList = ({ tags, path }) => {
  return (
    <div className='tag-list'>
      <LabelOutline color={inlineStyles.tagColor} style={inlineStyles.tagIcon} />
      {tags.map((tag) => {
        return (
          <Link key={tag.id} to={`${path}?tag-id=${tag.id}`} >
            <span className='tag-text'>{tag.name}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default TagList
