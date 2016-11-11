import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,    
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  mutationWithClientMutationId  
} from 'graphql-relay'

import {
  resolver,
  attributeFields,
} from 'graphql-sequelize'

import models from 'models'
import getModel from 'schema/paging/getModel'
import authorize from 'schema/authorize'

const getPostsSchema = (nodeInterface) => {
  const postType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      ...attributeFields(models.posts),
      id: globalIdField('Post'),
    }),
    interfaces: [nodeInterface],
  })

  const posts = getModel(postType, authorize)

  const updatePost = mutationWithClientMutationId({
    name: 'UpdatePost',
    inputFields: { 
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
      post: {
        type: postType,
        resolve: ({localPostId}) => localPostId,
      },
    },
    mutateAndGetPayload: ({id}) => {
      const localPostId = fromGlobalId(id)
      models.posts.update({title:"update", where:{id}})      
      return {localPostId}
    },
  })

  return {postType, posts, updatePost}
}

export default  getPostsSchema
