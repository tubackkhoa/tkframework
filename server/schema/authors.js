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

const getAuthorsSchema = (nodeInterface) => {
  const authorType = new GraphQLObjectType({
    name: 'authors',
    fields: () => ({
      ...attributeFields(models.authors),
      id: globalIdField('authors'),
    }),
    interfaces: [nodeInterface],
  })

  const {connectionType} = connectionDefinitions({
    name: 'authors',
    nodeType: authorType,
  })

  const authors = {
    type: connectionType,
    args: connectionArgs,
    resolve: async (_, args) => connectionFromArray(
      await models.authors.findAll({
        limit: args.first,
      }),
      args
    ),
  }

  return {authorType, authors}
}

export default  getAuthorsSchema
