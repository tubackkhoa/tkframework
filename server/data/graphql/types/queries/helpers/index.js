import { 
  GraphQLObjectType, 
} from 'graphql'

import { globalIdField } from 'graphql-relay'

import {  
  attributeFields,
} from 'graphql-sequelize'

import { nodeInterface } from 'data/graphql/node-definitions'
import { registerType } from 'data/graphql/type-registry'

export const getQueryType = (name, model, fields, lookupFn) => {

  const queryType = new GraphQLObjectType({
    name,
    fields: () => ({
      ...attributeFields(model),
      id: globalIdField(name),
      ...fields,
    }),
    interfaces: [nodeInterface],
  })
  registerType(queryType, lookupFn || ( 
    (id, graphFields) => model.findById(id, {attributes: Object.keys(graphFields)}) 
  ))

  return queryType
}




