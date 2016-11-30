import React from 'react'
import StyleButton from '../StyleButton/index'
import FormatBold from 'material-ui/svg-icons/editor/format-bold'
import FormatItalic from 'material-ui/svg-icons/editor/format-italic'
import FormatUnderline from 'material-ui/svg-icons/editor/format-underlined'
import Link from 'material-ui/svg-icons/editor/insert-link'
import { LinkOff } from 'ui/shared/components/Icon'

const INLINE_STYLES = [
  { label: <FormatBold/>, style: 'BOLD' },
  { label: <FormatItalic/>, style: 'ITALIC' },
  { label: <FormatUnderline/>, style: 'UNDERLINE' },
]

export const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle()
  
  return (
    <div className='block inline-style'>
      {INLINE_STYLES.map(({label, style},index) =>
        <StyleButton
          key={index}
          active={currentStyle.has(style)}
          label={label}
          onToggle={props.onToggle}
          style={style}
        />
      )}
      <span className='button addLink' onMouseDown={props.onPromptForLink}>
        <Link/>
      </span>
      <span className='button removeLink' onMouseDown={props.onRemoveLink}>
        <LinkOff/>
      </span>
    </div>
  )
}
