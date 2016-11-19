import { 
  GraphQLInt, 
} from 'graphql'

import { pageableConnectionArgs, getNumberPagingModel } from 'data/graphql/paging/getPagingModel'
import { authorConnection } from 'data/graphql/connections/author'
import { authorType } from 'data/graphql/types/queries/author'

import getGraphqlFields from 'data/graphql/utils/getGraphqlFields'

import { getAuthorDetail } from 'data/graphql/types/queries/helpers/author'

import models from 'models'

// must validate this before export
// should only use export default directly for const of {}
export const authors = {
  type: authorConnection,
  description: 'A list of authors',
  args: pageableConnectionArgs, 
  resolve: (_, args, {request}, info) => getNumberPagingModel(args, info)    
}


export const detailAuthor = {
  type: authorType,
  description: 'Detail information of the author',
  args: {
    userId: { type: GraphQLInt },
  },
  resolve: async (_, {userId}, {request}, info) => {
    // there is no __typename because we will not use node general select
    const graphFields = getGraphqlFields(info)
    
    // return detail of user, we use this to get detail node with custom args like userId
    return getAuthorDetail(userId, graphFields)    
  },
}
