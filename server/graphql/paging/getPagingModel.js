import { 
  GraphQLInt, 
  GraphQLString, 
} from 'graphql'

import {   
  connectionArgs, 
  connectionFromArraySlice,
  offsetToCursor,
} from 'graphql-relay'

import getPagingParameters from './getPagingParameters'
import getGraphqlFields from 'graphql/utils/getGraphqlFields'

import models from 'models'

// we also define number paging model for simple paging with limit and offset
export const paggableConnectionArgs = {
  ...connectionArgs,
  // for jumping by offset instead of cursor
  offset: {
    type: GraphQLInt
  },
}

/**
 *
 * with number paging model, we will not use cursor, because item can change the page it belongs to
 *
 */
export const getPagingModelPromise = ({limit, offset}, info, model) => {
  // by default, we only get field from node as child of edges
  const {edges: {node: graphFields}} = getGraphqlFields(info)
  const attributes = Object.keys(graphFields)

  // now we select database, by default we use fieldName to get from models
  model = model || models[info.fieldName]          
  return model.findAndCountAll({ attributes, limit, offset })        
}


/**
 *
 * Paging with cursor
 *
 */

export const getScrollPagingModel = async (args, info, model) => {

  // by default, we only get field from node as child of edges  
  const pagingParams = getPagingParameters(args)       
  const { rows, count } = await getPagingModelPromise(pagingParams, info, model)
  return connectionFromArraySlice(
      rows,
      args, 
      {
          sliceStart: offset,
          arrayLength: count,
      }
  )                      
  
}

/**
 *
 * Simple paging
 *
 */

export const getNumberPagingModel = async ({first: limit, offset}, info, model) => {
  const { rows, count } = await getPagingModelPromise({limit, offset}, info, model)
  const startOffset = offset + 1
  const edges = rows.map((value, index) => ({    
    node: value,
    cursor: offsetToCursor(startOffset + index),
  }))
  const firstEdge = edges[0]
  const lastEdge = edges[edges.length - 1]
  const hasPreviousPage = false // because we only move forward using offset
  const hasNextPage = offset + limit < count

  // just give enough information, forget about cursor
  return {
    edges,
    pageInfo: {
      startCursor: firstEdge ? firstEdge.cursor : null,
      endCursor: lastEdge ? lastEdge.cursor : null,
      hasPreviousPage,
      hasNextPage,
    }
  }
}