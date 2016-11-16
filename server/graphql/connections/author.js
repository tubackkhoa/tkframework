import { authorType } from 'graphql/types/queries/author'
import { 
  connectionDefinitions,
} from 'graphql-relay'

export const { 
  connectionType: authorConnection, 
  edgeType: authorEdge, 
} = connectionDefinitions({ 
  name: 'Author', 
  nodeType: authorType, 
})