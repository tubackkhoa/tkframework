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
} from 'graphql-relay'

import models from 'models'
import authorize from 'schema/authorize'

// resolve can return async function, it is Promise
// and in async function, we can use await instead of then callback
const getUpdatePostMutation = (postType) => mutationWithClientMutationId({
  name: 'UpdatePost',
  inputFields: {   
    postId : {type: GraphQLInt}, 
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    post: {
      type: postType,
      resolve: post => post,
    }
  },
  mutateAndGetPayload: async ({postId, title}, {request}) => {      
    authorize(request)
    // insert then return post, we can use try catch instead of error callback
    const {id} = fromGlobalId(postId)
    const post = {title}
    models.posts.update(post,{
      where: {id}
    })
    return post
  },
})

export default getUpdatePostMutation
