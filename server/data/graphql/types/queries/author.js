import { 
  GraphQLObjectType, 
  GraphQLList,
  GraphQLString,
} from 'graphql'

import { globalIdField } from 'graphql-relay'

import { nodeInterface } from 'data/graphql/node-definitions'
import { registerType } from 'data/graphql/type-registry'
import { socialAccountType } from './social-account'

import { getAuthorDetail } from './helpers/author'

import models from 'models'

// take this action seriously, do not automatically spread out all from table
export const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({    
    id          : globalIdField('Author'),
    name        : { type: GraphQLString },
    image       : { type: GraphQLString },
    introduction: { type: GraphQLString },
    description : { type: GraphQLString },
    // you can use a mapping fields to convert from graphql fields to database fields
    social_accounts: {
      type: new GraphQLList(socialAccountType),
      description: 'List social accounts of the user',    
    }, 

  }),
  // use node interface, we can access it via node(id:$id)
  interfaces: [nodeInterface],
})

// not auto register from getQuery
registerType(authorType, getAuthorDetail)


  
