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
import authorize from 'passport/authorize'

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

    // also destroy items, taggings, and all item types belong to this items
    // for item type is item_image, also remove image folder
    models.taggings.destroy({
      where: {
        subject_id:postId,
        subject_type:'Post',
      }
    })

    // now destroy all items
    models.items.findAll({
      where: {post_id: postId},
      attributes: ['id','target_id','target_type'],
    }).then(deleteItems=> models.items.destroyItems(deleteItems))

    return {id}
 }
})