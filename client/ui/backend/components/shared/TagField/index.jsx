import React, { Component, PropTypes } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

class TagField extends Component {

  _handleDeleteTag = (sortRank) => {
    this.props.handleDeleteTag(sortRank)
  }

  _handleAddTag = (text) => {
    this.props.handleAddTag({ text })
  }

  render() {    
    const {suggestions, tags=[]} = this.props
    return (
      <div>
        <label>Tag</label>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={this._handleDeleteTag}
          handleAddition={this._handleAddTag}
          autofocus={false}
          autocomplete={1}
          minQueryLength={1}
          unique={true}
          placeholder="Tag Name"
          classNames={{
            tagInput: 'tag-input',
            selected: 'selected',
            tag: 'tag',
            remove: 'remove',
            suggestions: 'suggestions',
          }}
        />
      </div>
    )
  }
}

export default TagField

