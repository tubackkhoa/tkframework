import { 
  GraphQLNonNull,
  GraphQLID, 
} from 'graphql'

import { 
  mutationWithClientMutationId, 
  fromGlobalId 
} from 'graphql-relay'

import { viewerType } from 'data/graphql/types/queries/viewer'
import { getViewer } from 'data/graphql/viewer'

import models from 'models'
import authorize from 'data/graphql/authorize'

export const removePost = mutationWithClientMutationId({
  name: 'RemovePost',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => getViewer(1)
    },
    postId: {
      type: GraphQLID,
      resolve: ({id}) => id,
    }
  },
  mutateAndGetPayload: ({id}, {request}) => {    
    authorize(request)  
    const postId = fromGlobalId(id).id
    models.posts.destroy({
      where: {id: postId}
    })
    return {id}
 }
})