import React, { Component, PropTypes } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

class TagField extends Component {

  _handleDeleteTag = (sortRank) => {
    this.props.handleDeleteTag(sortRank)
  }

  _handleAddTag = (text) => {
    this.props.handleAddTag(text)
  }

  _handleFilterSuggestions = (text, suggestions) => {    
    const lowerCaseQuery = (text||'').toLowerCase()    
    const tagTexts = this.props.tags.map(tag=>tag.text)
    return suggestions.filter((suggestion) => 
      tagTexts.indexOf(suggestion) === -1 && suggestion.toLowerCase().includes(lowerCaseQuery)
    )
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
          handleFilterSuggestions={this._handleFilterSuggestions}
          handleDrag={this._handleDrag}
          autofocus={false}
          autocomplete={1}
          minQueryLength={1}
          unique={true}
          placeholder="Tag Name"
          classNames={{
            tagInput: 'tag-input',
            selected: 'selected',
            tag: 'tag-link',
            remove: 'remove',
            suggestions: 'suggestions',
          }}
        />
      </div>
    )
  }
}

export default TagField

