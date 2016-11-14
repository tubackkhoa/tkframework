import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

import { 
  mutationWithClientMutationId, 
  offsetToCursor,
  fromGlobalId,
} from 'graphql-relay'

import { postType } from 'graphql/types/queries/post'

import models from 'models'
import authorize from 'graphql/authorize'

// resolve can return async function, it is Promise
// and in async function, we can use await instead of then callback
export const updatePost = mutationWithClientMutationId({
  name: 'UpdatePost',
  inputFields: {   
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    post: {
      type: postType,
      resolve: post => post,
    }
  },
  mutateAndGetPayload: async ({id, title}, {request}) => {      
    // authorize(request)
    // insert then return post, we can use try catch instead of error callback
    
    // error is good enough
    const postId = fromGlobalId(id).id
    const post = {title}
    models.posts.update(post,{
      where: {id: postId}
    })
    post.id = postId
    return post
  },
})
