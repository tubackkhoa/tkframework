import React from 'react'

import {  
  Entity,
} from 'draft-js'

import {
  convertFromHTML,
  convertToHTML,
} from 'draft-convert'

export const HTML2ContentState = convertFromHTML({

  htmlToEntity(nodeName, node) {
    switch(nodeName){
      case 'a':
        if(node.href)
          return Entity.create('LINK', 'MUTABLE', {href: node.href})
        break

      case 'img':
        return Entity.create('IMAGE', 'MUTABLE', {
          src: node.getAttribute('src')
        })

      default:
        break
    }    
  },

  // atomic for image
  htmlToBlock(nodeName, node, lastList, inBlock) {    

    switch(nodeName){
      case 'figure':
        const {firstChild} = node
        if(firstChild && firstChild.nodeName === 'IMG')
          return {
            type: 'atomic',
            data: {
              atomicType: 'image',
              src: firstChild.getAttribute('src')
            }
          }        
        break

      case 'img':
        if(inBlock !=='atomic')
          return 'atomic'
        break

      default:
        break
    }               
  },

})

export const ContentState2HTML = convertToHTML({  
  blockToHTML(block) {    
    if (block.type === 'atomic') {
      return <figure/>
    }
  },

  entityToHTML(entity, originalText) {
    switch(entity.type){
      case 'LINK' : return <a href={entity.data.href}>{originalText}</a>
      case 'IMAGE': return `<img src="${entity.data.src}" />`
      default     : return originalText
    }        
  },
})