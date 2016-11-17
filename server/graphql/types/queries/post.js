import { 
  GraphQLList,
  GraphQLObjectType,
} from 'graphql'


import { getQueryType } from './helpers'
import { getPostDetail } from './helpers/post'
import { tagType } from './tag'
import { itemType } from './item'

import models from 'models'

export const postType = getQueryType('Post', models.posts, {
  tags: {
    type: new GraphQLList(tagType),
    description: 'Tags of the post',    
  },  
  items: {
    type: new GraphQLList(itemType),
    description: 'Items of the post',
  },
  // we resolve from top so we can map field to whole object without to re-process sub graphfields
}, getPostDetail)

export const detailPostType = new GraphQLObjectType({
  name: 'DetailPost',
  fields: {
    node: { type: postType },
    next: { type: postType },
    prev: { type: postType },
  }
})
 


