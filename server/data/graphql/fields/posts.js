import { 
  GraphQLInt, 
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql'

import {
  fromGlobalId,
} from 'graphql-relay'


import { pageableConnectionArgs, getNumberPagingModel } from 'data/graphql/paging/getPagingModel'
import { postConnection } from 'data/graphql/connections/post'
import { postType, detailPostType } from 'data/graphql/types/queries/post'
import getGraphqlFields from 'data/graphql/utils/getGraphqlFields'

import { getPostDetail } from 'data/graphql/types/queries/helpers/post'

import { taggingsPostConnect } from 'models/shared/connect'
import authorize from 'passport/authorize'

import models from 'models'

// we should prefer this way than include other models to provide only one query
// because this will help better seperation of codes, and just one more query
const resolvePostTags = (post, tagAttributes) => post.getPostTags(tagAttributes)

// must validate this before export
// should only use export default directly for const of {}
export const posts = {
  type: postConnection,
  description: 'A list of posts',
  args: {
    ...pageableConnectionArgs,
    tagId: { 
      type: GraphQLID,
      description: 'Filter post by tag-id', 
    },
    accepted: {
      type: GraphQLBoolean,
      description: 'Filter post by publish, should authorize'
    }
  }, 
  resolve: (_, args, {request}, info) => getNumberPagingModel(args, info, models.posts, 
    // resolve graph field
    { tags:resolvePostTags }, 
    // resolve options
    async (options, resolverAttributes) => {
      
      // only published item for unauthorized users
      // for edit post, also check request.user.id to modify post
      options.where = {}
      if(authorize(request, false)){
        if(args.accepted)
          options.where.accepted = args.accepted
      } else 
        options.where.accepted = 1

      // update options with tag
      if(args.tagId){
        const tagId = fromGlobalId(args.tagId).id
        const postIDs = await models.taggings.findAll({
          attributes: ['subject_id'],
          distinct: true,
          where: {
            tag_id: tagId,
            subject_type: 'Post',
          }
        }).map(tagging => tagging.subject_id)        

        // filter by tagid from posts
        options.where.id = {
          $in: postIDs
        }                

      }

      // give back the options for filter
      return options
    }),    
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
    // no need to order :v, so it is like random select
    if (ret.node) {
      if (nextGraphFields) {
        ret.next = await getPostDetail({
          id:{ $gt:ret.node.id },
          accepted:1,
        }, nextGraphFields)
      }

      if (prevGraphFields) {
        ret.prev = await getPostDetail({
          id:{ $lt:ret.node.id },
          accepted:1,
        }, prevGraphFields)
      }
    }

    return ret
  },
}
