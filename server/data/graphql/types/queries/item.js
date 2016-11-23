import {
  GraphQLString,
} from 'graphql'

import { getQueryType } from './helpers'
import models from 'models'

export const itemTextType = getQueryType('ItemText', models.item_texts)

export const itemImageType = getQueryType('ItemImage', models.item_images, {
  full_src: {
    type: GraphQLString,
    description: 'Absolute src of image item',    
  },  
},// remove full_src from db select
  (id, {full_src, ...graphFields}) => 
    models.item_images.findById(id, {attributes: Object.keys(graphFields)})
)

export const itemTwitterType = getQueryType('ItemTwitter', models.item_twitters)
 

export const itemType = getQueryType('Item', models.items, {
  text: {
    type: itemTextType,
    description: 'Item text data',    
  },
  image: {
    type: itemImageType,
    description: 'Item image data',
  },
  twitter: {
    type: itemTwitterType,
    description: 'Item twitter data',
  },
})


