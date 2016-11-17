import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import TagList from 'ui/shared/components/TagList'
import TextDisplay from 'ui/shared/components/Text/Display'


class Item extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  render() {
    const imageClassName = this.state.loading ? 'image-loading' : 'image-loaded'
    const { full_image, title, adminPath, caption, description, source_url, tags } = this.props
    return (
      <div>
        <h3 >{title} </h3>
        <TagList tags={tags} path={`${adminPath}/projects`} />
        <div >
          <img
            className={imageClassName}
            onLoad={() => this.setState({ loading: false })}
            src={full_image}
            alt={title}
          />
          <span>{caption}</span>
        </div>
        <div >
          <TextDisplay description={description} />
        </div>
        {source_url &&
          <a target='_blank' href={source_url}>Fork on GitHub</a>
        }
      </div>
    )
  }

}

export default Item
