import { paggableConnectionArgs, getNumberPagingModel } from 'graphql/paging/getPagingModel'
import { authorConnection } from 'graphql/connections/author'

// must validate this before export
// should only use export default directly for const of {}
export const authors = {
  type: authorConnection,
  description: 'A list of authors',
  args: paggableConnectionArgs, 
  resolve: (_, args, {request}, info) => getNumberPagingModel(args, info)    
}
