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
import getModel from 'schema/paging/getModel'
import authorize from 'schema/authorize'

const getAuthorsSchema = (nodeInterface) => {
  const authorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
      ...attributeFields(models.authors),
      id: globalIdField('Author'),
    }),
    interfaces: [nodeInterface],
  })

  const authors = getModel(authorType, authorize)

  return {authorType, authors}
}

export default  getAuthorsSchema
