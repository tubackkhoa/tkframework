import React, { Component, PropTypes } from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  Entity,
} from 'draft-js'

import { getBlockStyle } from '../shared/utils'
import { decorator } from '../shared/Decorator'
import { BlockStyleControls } from '../shared/BlockStyleControl'
import { InlineStyleControls } from '../shared/InlineStyleControl'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import inlineStyles from 'ui/shared/styles/MaterialUI'
const styles = {}


class TextEditor extends Component {

  constructor(props) {
    super(props)
    // render via state
    this.state = {
      editorState: props.value 
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.value)), decorator)
        : EditorState.createEmpty(decorator),
      inputtable: false,
      urlValue: '',
    }    
  }

  _handleFocus = () => this.refs.editor.focus()

  _handleChange = (editorState) => this.setState({ editorState })

  _handleChangeURL = (e) => this.setState({ urlValue: e.target.value })  

  _handlePromptForLink = (e) => {
    e.preventDefault()
    const { editorState } = this.state
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      this.setState({
        inputtable: true,
        urlValue: '',
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0)
      })
    }
  }

  _handleConfirmLink = (e) => {
    e.preventDefault()
    const { editorState, urlValue } = this.state
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue })
    this.setState({
      editorState: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      ),
      inputtable: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0)
    })
  }

  _handleInputKeyDown = (e) => {
    if (e.which === 13) {
      this._handleConfirmLink(e)
    }
  }

  _handleRemoveLink = (e) => {
    e.preventDefault()
    const { editorState } = this.state
    const selection = editorState.getSelection()
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      })
    }
  }

  _handleUpdate = () => {
    const description = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    this.props.handleUpdate(description)
  }

  _handleToggleBlockType = (blockType) => {
    this._handleChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }


  _handleToggleInlineStyle = (inlineStyle) => {
    this._handleChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  _handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this._handleChange(newState)
      return true
    }
    return false
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.value && nextProps.value) {
      const blocks = convertFromRaw(JSON.parse(nextProps.value))
      this.setState({ editorState: EditorState.createWithContent(blocks, decorator) })
    } else if (!nextProps.value) {
      this.state = { editorState: EditorState.createEmpty(decorator) }
    }
  }

  renderURLField() {
    if (this.state.inputtable) {
      return (
        <div >
          <TextField
            onChange={this._handleChangeURL}
            ref="url"
            hintText="Enter Link URL"
            style={inlineStyles.urlInput}
            value={this.state.urlValue}
            onKeyDown={this._handleInputKeyDown}
          />
          <IconButton onMouseDown={this._handleConfirmLink}>
            <ContentAddCircle />
          </IconButton>
        </div>
      )
    }
  }

  render() {
    const { editorState } = this.state

    return (
      <div  onBlur={this._handleUpdate} >
        <div >
          <BlockStyleControls
            editorState={editorState}
            onToggle={this._handleToggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this._handleToggleInlineStyle}
            onRemoveLink={this._handleRemoveLink}
            onPromptForLink={this._handlePromptForLink}
          />
          {this.renderURLField()}
          <Divider />
        </div>
        <div onClick={this._handleFocus}>
          <Editor
            onChange={this._handleChange}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            spellCheck
            placeholder="Enter Text"
            ref="editor"
            handleKeyCommand={this._handleKeyCommand}
          />
        </div>
      </div>
    )
  }
}

export default TextEditor
