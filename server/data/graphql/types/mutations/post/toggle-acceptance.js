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

import { postType } from 'data/graphql/types/queries/post'

import models from 'models'
import authorize from 'passport/authorize'

import { viewerType } from 'data/graphql/types/queries/viewer'
import { getViewer } from 'data/graphql/viewer'

// resolve can return async function, it is Promise
// and in async function, we can use await instead of then callback
export const toggleAcceptancePost = mutationWithClientMutationId({
  name: 'ToggleAcceptancePost',
  inputFields: {   
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => getViewer(1)
    },
  },
  mutateAndGetPayload: async ({id}, {request}) => {      
    authorize(request)
    // insert then return post, we can use try catch instead of error callback
    
    // error is good enough
    const postId = fromGlobalId(id).id    
    // need id to map, or we can use literal
    // we can use literal because no need to escape, so we have the best performance
    models.posts.update({
      accepted: models.sequelize.literal('NOT `accepted`'),
    }, {
      where: {id: postId},
    })
    // update async, only save changes
    return {id}
  },
})
