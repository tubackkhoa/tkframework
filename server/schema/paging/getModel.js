import {
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'

import models from 'models'
import getPagingModel from './getPagingModel'

const getModel = (modelType, rootResolver=()=>true, name, model) => {
  const {connectionType} = connectionDefinitions({
    name: name || modelType.name,
    nodeType: modelType,
  })

  return {
    type: connectionType,
    args: connectionArgs, // Adds first, after, last, and before arguments
    resolve: (root, args, context, info) => rootResolver(info.rootValue) && getPagingModel(args, info, model)
  }
}

export default getModel

