import {
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay'

import models from 'models'
import getPagingModel from './getPagingModel'

const getModel = (modelType, requestCheck=()=>true, name, model) => {
  const {connectionType, edgeType} = connectionDefinitions({
    name: name || modelType.name,
    nodeType: modelType,
  })

  const models = {
    type: connectionType,
    args: connectionArgs, // Adds first, after, last, and before arguments
    resolve: (root, args, {request}, info) => requestCheck(request) && getPagingModel(args, info, model)
  }

  // return a collection for paging meaning
  return {models, edgeType}
}

export default getModel