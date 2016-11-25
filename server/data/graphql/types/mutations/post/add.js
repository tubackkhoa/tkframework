import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

import { 
  mutationWithClientMutationId, 
  fromGlobalId, 
  offsetToCursor, 
} from 'graphql-relay'

import { viewerType } from 'data/graphql/types/queries/viewer'
import { getViewer } from 'data/graphql/viewer'
import { postEdge } from 'data/graphql/connections/post'

import models from 'models'
import authorize from 'passport/authorize'

export const addPost = mutationWithClientMutationId({
  name: 'AddPost',
  inputFields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => getViewer(1)
    },
    postEdge: {
      type: postEdge,
      resolve: async ({post}) => {        
        const total = await models.posts.count()

        return {
          cursor: offsetToCursor(total),
          node: post,
        }

      },
    }, 
  },
  mutateAndGetPayload: async ({title}, {request}) => {      
    authorize(request)
    // insert then return post, we can use try catch insteadz
    const post = await models.posts.create({title})
    return {post}
  },
})