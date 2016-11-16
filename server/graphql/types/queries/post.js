import { 
  GraphQLList,
} from 'graphql'

import { getQueryType } from './helpers'

import { tagType } from './tag'
import models from 'models'

export const postType = getQueryType('Post', models.posts, {
  tags: {
    type: new GraphQLList(tagType),
    description: 'Tags of the post',    
  }
}, async (id, graphFields) => {
  const {tags: tagsGraphFields, ...postGraphFields} = graphFields
  const post = await models.posts.findById(id, { attributes: Object.keys(postGraphFields) })
  const tagAttributes = Object.keys(tagsGraphFields)

  if(tagsGraphFields) {
    post.tags = post.getTags(tagAttributes)
  }

  return post
})
 


