import { postType } from 'graphql/types/queries/post'
import { 
  connectionDefinitions,
} from 'graphql-relay'

export const { 
  connectionType: postConnection, 
  edgeType: postEdge 
} = connectionDefinitions({ 
  name: 'Post', 
  nodeType: postType 
})