import React, { Component, PropTypes } from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  Entity,
  AtomicBlockUtils,
} from 'draft-js'

import { getBlockStyle } from '../shared/utils'
import { decorator } from '../shared/Decorator'
import { HTML2ContentState, ContentState2HTML } from '../shared/Converter'
import { BlockStyleControls } from '../shared/BlockStyleControl'
import { InlineStyleControls } from '../shared/InlineStyleControl'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import inlineStyles from 'ui/shared/styles/MaterialUI'   

class TextEditor extends Component {
  // we can use defaultProps or better use render method from redux Field
  constructor(props) {
    super(props)
    // render via state
    this.state = {
      editorState: this.getEditorState(props.mode, props.value),
      inputtable: false,
      urlValue: '',
    }    
  }  

  getEditorState(mode, value){
    return value
      ? EditorState.createWithContent(mode === 'html' 
        ? HTML2ContentState(value) 
        : convertFromRaw(JSON.parse(value)), decorator)   
      : EditorState.createEmpty(decorator)
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
    const contentState = this.state.editorState.getCurrentContent()
    const content = this.props.mode === 'html'
      ? ContentState2HTML(contentState)            
      : JSON.stringify(convertToRaw(contentState))

    this.props.handleUpdate(content)
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
    this._handleChange(this.getEditorState(nextProps.mode, nextProps.value))
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

  _handlePastedText = (text, html) => {    
    // must be html mode to parse
    const newState = getEditorState('html', html)
    this._handleChange(newState)
    return true
  }

  addImages(files) {    
    files.forEach(blob=>{
      const reader = new window.FileReader()
      reader.readAsDataURL(blob) 
      reader.onload = () => {
        const src = reader.result                
        const entityKey = Entity.create(
          'IMAGE',
          'MUTABLE',
           { src }
        )          
        const newState = AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' ')
        this._handleChange(newState)
      }
    })          
    
    return true
  }

  _handlePastedFiles = (files) => {
    return this.addImages(files)
  }

  _handleDroppedFiles = (selection, files) =>{
    return this.addImages(files)
  }

  render() {
    const { editorState } = this.state

    return (
      <div className="text-editor" onBlur={this._handleUpdate} >
        <div className='toolbar'>          
        
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
        <div className='body' onClick={this._handleFocus}>
          <Editor
            onChange={this._handleChange}
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            spellCheck
            placeholder="Enter Text"
            ref="editor"
            handleKeyCommand={this._handleKeyCommand}
            handlePastedText={this._handlePastedText}
            handleDroppedFiles={this._handleDroppedFiles}
            handlePastedFiles={this._handlePastedFiles}
          />
        </div>
      </div>
    )
  }
}

export default TextEditor
