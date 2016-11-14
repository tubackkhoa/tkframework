import { getNode, getNodeType } from './type-registry'
import { nodeDefinitions } from 'graphql-relay'

export const { 
  nodeInterface, 
  nodeField 
} = nodeDefinitions(getNode, getNodeType)
