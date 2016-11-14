import { paggableConnectionArgs, getNumberPagingModel } from 'graphql/paging/getPagingModel'
import { postConnection } from 'graphql/connections/post'

// must validate this before export
// should only use export default directly for const of {}
export const posts = {
  type: postConnection,
  description: 'A list of posts',
  args: paggableConnectionArgs, 
  resolve: (_, args, {request}, info) => getNumberPagingModel(args, info)    
}
