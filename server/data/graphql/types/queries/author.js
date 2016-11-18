import { 
  GraphQLObjectType, 
  GraphQLString,
} from 'graphql'

import { globalIdField } from 'graphql-relay'

import { nodeInterface } from 'data/graphql/node-definitions'
import { registerType } from 'data/graphql/type-registry'
import models from 'models'


// take this action seriously, do not automatically spread out all from table
export const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({    
    id          : globalIdField('Author'),
    name        : { type: GraphQLString },
    image       : { type: GraphQLString },
    introduction: { type: GraphQLString },
  }),
  interfaces: [nodeInterface],
})


registerType(authorType, (id, graphFields) => 
  models.authors.findById(id, { attributes: Object.keys(graphFields) }) 
)

  
