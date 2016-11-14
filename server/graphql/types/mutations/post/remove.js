import { 
  GraphQLNonNull,
  GraphQLID, 
} from 'graphql'

import { 
  mutationWithClientMutationId, 
  fromGlobalId 
} from 'graphql-relay'

import { viewerType } from 'graphql/types/queries/viewer'
import { getViewer } from 'graphql/viewer'

import models from 'models'
import authorize from 'graphql/authorize'

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
    const postId = fromGlobalId(id).id
    models.posts.destroy({
      where: {id: postId}
    })
    return {id}
 }
})