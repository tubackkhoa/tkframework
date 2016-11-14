import { 
  GraphQLObjectType, 
  GraphQLInt, GraphQLString 
} from 'graphql'

import { globalIdField } from 'graphql-relay'

import {  
  attributeFields,
} from 'graphql-sequelize'

import { nodeInterface } from 'graphql/node-definitions'
import models from 'models'
import { registerType } from 'graphql/type-registry'

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    ...attributeFields(models.posts),
    id: globalIdField('Post'),
  }),
  interfaces: [nodeInterface],
})

registerType(postType, (id, attributes) => models.posts.findById(id, {attributes}))


