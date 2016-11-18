import { fromGlobalId } from 'graphql-relay'
import getGraphqlFields from 'data/graphql/utils/getGraphqlFields'

const types = {}

export const registerType = (type, lookupFn) => {
  types[type.name] = { type, lookupFn }
}

export const getNode = (globalId, context, info) => { 
  const { type, id} = fromGlobalId(globalId)
  const item = types[type]  
  // by default, we only get field from node as child of edges
  // __typename will not be selected
  const { __typename, ...graphFields } = getGraphqlFields(info)    
  return item ? item.lookupFn(id, graphFields) : null     
}

export const getNodeType = obj => {
  const item = types[obj.type]
  return item ? item.type : null  
}