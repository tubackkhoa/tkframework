import {
  GraphQLObjectType,
} from 'graphql'

import {
  globalIdField,
} from 'graphql-relay'

import {  
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

  const {models: authors, edgeType:authorEdge} = getModel(authorType, authorize)

  return {authorType, authorEdge, authors}
}

export default  getAuthorsSchema
