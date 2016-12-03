import React, { PropTypes } from 'react'
import { Entity, CompositeDecorator } from 'draft-js'
import MultiDecorator from 'draft-js-multidecorators'
import PrismDecorator from 'draft-js-prism'


const Media = (props) => {
  const entity = Entity.get(props.entityKey)        
  const attrs = entity.getData()
  const type = entity.getType()
  switch(type){
    case 'IMAGE': return <img {...attrs} />
    default     : return <a {...attrs} >{props.children}</a>
  }
}

const findLinkEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return entityKey !== null &&
        ['LINK','IMAGE'].indexOf(Entity.get(entityKey).getType()) !== -1      
    },
    callback
  )
}

// we can define more decorators
export const decorator = new MultiDecorator([
  // default is javascript
  new PrismDecorator({
    defaultSyntax: 'javascript',
  }),
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Media,
    },
  ]),
])

