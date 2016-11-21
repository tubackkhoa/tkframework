import {
  GraphQLInt,
} from 'graphql'

import { postType } from 'data/graphql/types/queries/post'
import { 
  connectionDefinitions,
} from 'graphql-relay'

export const { 
  connectionType: postConnection, 
  edgeType: postEdge, 
} = connectionDefinitions({ 
  name: 'Post', 
  nodeType: postType, 
  connectionFields: {
    totalCount: { type: GraphQLInt } // total number of items
  }
})