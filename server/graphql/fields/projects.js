import { paggableConnectionArgs, getNumberPagingModel } from 'graphql/paging/getPagingModel'
import { projectConnection } from 'graphql/connections/project'
import { projectType } from 'graphql/types/queries/project'
import getGraphqlFields from 'graphql/utils/getGraphqlFields'
import models from 'models'

// must validate this before export
// should only use export default directly for const of {}
export const projects = {
  type: projectConnection,
  description: 'A list of projects',
  args: paggableConnectionArgs, 
  resolve: (_, args, {request}, info) => getNumberPagingModel(args, info)    
}

export const latestProject = {
  type: projectType,
  description: 'Latest project',
  resolve: (_, args, {request}, info) => {
    // there is no __typename because we will not use node general select
    const graphFields = getGraphqlFields(info)
    
    // by default it will return a promise resolve an object
    return models.projects.findOne({
      where:{accepted:1},
      order:[['updated_at', 'DESC']],
      attributes: Object.keys(graphFields),
    })

  }
}
