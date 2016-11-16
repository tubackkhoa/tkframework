import { projectType } from 'graphql/types/queries/project'
import { 
  connectionDefinitions,
} from 'graphql-relay'

export const { 
  connectionType: projectConnection, 
  edgeType: projectEdge, 
} = connectionDefinitions({ 
  name: 'Project', 
  nodeType: projectType, 
})