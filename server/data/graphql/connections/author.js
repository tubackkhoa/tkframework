import {
  GraphQLInt,
} from 'graphql'

import { authorType } from 'data/graphql/types/queries/author'
import { 
  connectionDefinitions,
} from 'graphql-relay'

export const { 
  connectionType: authorConnection, 
  edgeType: authorEdge, 
} = connectionDefinitions({ 
  name: 'Author', 
  nodeType: authorType, 
  connectionFields: {
    totalCount: { type: GraphQLInt } // total number of items
  }
})