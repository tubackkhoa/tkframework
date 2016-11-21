import {
  GraphQLInt,
} from 'graphql'

import { projectType } from 'data/graphql/types/queries/project'
import { 
  connectionDefinitions,
} from 'graphql-relay'

export const { 
  connectionType: projectConnection, 
  edgeType: projectEdge, 
} = connectionDefinitions({ 
  name: 'Project', 
  nodeType: projectType, 
  connectionFields: {
    totalCount: { type: GraphQLInt } // total number of items
  }
})