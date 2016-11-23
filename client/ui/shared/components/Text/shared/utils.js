export const getBlockStyle = (block) => {    
  // switch (block.getType()) {
  //   case 'header-two':return 'h2'
  //   case 'header-three':return 'h3'
  //   // TODO: Using the original name as block raises an error, so need to figure out the cause.
  //   case 'header-four':return 'caption'
  //   case 'blockquote': return 'blockquote'
  //   case 'code-block': return 'code'
  //   case 'ordered-list-item': return 'orderedListItem'
  //   case 'unordered-list-item': return 'unorderedListItem'
  //   default: return 'text'
  // }
  return block.getType() || 'text'
}
