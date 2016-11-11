import {connectionFromArraySlice} from 'graphql-relay'
import getPagingParameters from './getPagingParameters'
import getGraphqlFields from './getGraphqlFields'

import models from 'models'

const getPagingModel = async (args, info, model) => {

  // by default, we only get field from node as child of edges
  const {edges: {node: graphFields}} = getGraphqlFields(info)
  const attributes = Object.keys(graphFields)

  // now we select database, by default we use fieldName to get from models
  model = model || models[info.fieldName]
  const { limit, offset } = getPagingParameters(args)                     
  const { rows, count } = await model.findAndCountAll({ attributes, limit, offset })  
    
  return connectionFromArraySlice(
      rows,
      args, 
      {
          sliceStart: offset,
          arrayLength: count,
      }
  )
}

export default getPagingModel