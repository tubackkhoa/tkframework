import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay'

import {
  resolver,
  attributeFields,
} from 'graphql-sequelize'

import models from 'models'

const getPostsSchema = (nodeInterface) => {
  const postType = new GraphQLObjectType({
    name: 'posts',
    fields: () => ({
      ...attributeFields(models.posts),
      id: globalIdField('posts'),
    }),
    interfaces: [nodeInterface],
  })

  const {connectionType} = connectionDefinitions({
    name: 'posts',
    nodeType: postType,
  })

  const posts = {
    type: connectionType,
    args: connectionArgs,
    resolve: async (_, args) => connectionFromArray(
      await models.posts.findAll({
        limit: args.first,
      }),
      args
    ),
  }

  return {postType, posts}
}

export default  getPostsSchema
