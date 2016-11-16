import { 
  GraphQLInt, 
  GraphQLList,
} from 'graphql'

import { paggableConnectionArgs, getNumberPagingModel } from 'graphql/paging/getPagingModel'
import { postConnection } from 'graphql/connections/post'

import { postType } from 'graphql/types/queries/post'
import getGraphqlFields from 'graphql/utils/getGraphqlFields'
import models from 'models'

const resolvePostTags = (post, tagAttributes) => post.getTags(tagAttributes)

// must validate this before export
// should only use export default directly for const of {}
export const posts = {
  type: postConnection,
  description: 'A list of posts',
  args: paggableConnectionArgs, 
  resolve: (_, args, {request}, info) => getNumberPagingModel(args, info, models.posts, 
    { tags:resolvePostTags }),    
}

export const latestPosts = {
  type: new GraphQLList(postType),
  description: 'Latest posts',
  args: {
    limit: { type: GraphQLInt },
  },
  resolve: (_, {limit}, {request}, info) => {
    // there is no __typename because we will not use node general select
    const graphFields = getGraphqlFields(info)
    // by default it will return a promise resolve an object
    return models.posts.findAll({
      where:{accepted:1},
      order:[['updated_at', 'DESC']],
      attributes: Object.keys(graphFields),
      limit,
    })

  }
}