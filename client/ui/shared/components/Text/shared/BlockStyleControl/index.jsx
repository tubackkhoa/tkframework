import React, { PropTypes } from 'react'
import StyleButton from '../StyleButton/index'
import FormatUL from 'material-ui/svg-icons/editor/format-list-bulleted'
import FormatOL from 'material-ui/svg-icons/editor/format-list-numbered'
import FormatQuote from 'material-ui/svg-icons/editor/format-quote'
import Caption from 'material-ui/svg-icons/editor/title'
import Code from 'material-ui/svg-icons/action/code'

export const BLOCK_TYPES = [
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: <FormatQuote/>, style: 'blockquote' },
  { label: <Code/>, style: 'code-block' },
  { label: <Caption/>, style: 'header-four' },
  { label: <FormatOL/>, style: 'ordered-list-item' },
  { label: <FormatUL/>, style: 'unordered-list-item' },
]

export const BlockStyleControls = (props) => {
  const { editorState } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className='block block-style'>
      {BLOCK_TYPES.map(({label,style}, index) =>
        <StyleButton
          key={index}
          active={style === blockType}
          label={label}
          onToggle={props.onToggle}
          style={style}
        />
      )}
    </div>
  )
}

