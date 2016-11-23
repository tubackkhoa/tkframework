import React, { Component, PropTypes } from 'react'
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js'

import { decorator } from '../shared/Decorator'
import { getBlockStyle } from '../shared/utils'


class TextDisplay extends Component {
  constructor(props) {
    super(props)
    this.setDescription(props.description)
  }

  setDescription(description) {
    if (description) {
      const blocks = convertFromRaw(JSON.parse(description))            
      this.state = { 
        editorState: EditorState.createWithContent(blocks, decorator) 
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty(decorator),
      }
    }
  }

  componentWillReceiveProps(nextProps) {    
    if (this.props.description !== nextProps.description) {      
      this.setDescription(nextProps.description)
    }
  }

  render() {
    
    return (
      <div>
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={this.state.editorState}
          readOnly
        />
      </div>
    )
  }
}

export default TextDisplay

