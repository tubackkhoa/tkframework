import { 
  GraphQLInt, 
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

import {
  fromGlobalId,
} from 'graphql-relay'


import { paggableConnectionArgs, getNumberPagingModel } from 'graphql/paging/getPagingModel'
import { postConnection } from 'graphql/connections/post'
import { postType, detailPostType } from 'graphql/types/queries/post'
import getGraphqlFields from 'graphql/utils/getGraphqlFields'
import models from 'models'
import { getPostDetail } from 'graphql/types/queries/helpers/post'

// we should prefer this way than include other models to provide only one query
// because this will help better seperation of codes, and just one more query
const resolvePostTags = (post, tagAttributes) => post.getPostTags(tagAttributes)

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

export const detailPost = {
  type: detailPostType,
  description: 'Detail post',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, {id}, {request}, info) => {
    // there is no __typename because we will not use node general select
    const graphFields = getGraphqlFields(info)
    // by default it will return a promise resolve an object
    const postId = fromGlobalId(id).id
    const {next: nextGraphFields, prev: prevGraphFields, node: nodeGraphFields} = graphFields
    const ret = {}
    ret.node = await getPostDetail(postId, nodeGraphFields)
    if (ret.node) {
      if (nextGraphFields) {
        ret.next = await getPostDetail({
          id:{ $gt:ret.node.id }
        }, nextGraphFields)
      }

      if (prevGraphFields) {
        ret.prev = await getPostDetail({
          id:{ $lt:ret.node.id }
        }, prevGraphFields)
      }
    }

    return ret
  },
}
