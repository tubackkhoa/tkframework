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
// and in async function, we can use await instead of then in callback of promise
const getAddPostMutation = (postEdge) => mutationWithClientMutationId({
  name: 'AddPost',
  inputFields: {    
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    post: {
      type: postEdge,
      resolve: async ({post}) => {        
        const total = await models.posts.count()
        return {
          cursor: offsetToCursor(total),
          node: post,
        }
      },
    }
  },
  mutateAndGetPayload: async ({title}, {request}) => {      
    authorize(request)
    // insert then return post, we can use try catch insteadz
    const post = await models.posts.create({title})
    return {post}
  },
})

export default getAddPostMutation
