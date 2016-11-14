import { GraphQLSchema } from 'graphql'
import query from './types/queries'
import mutation from './types/mutations'

const schema = new GraphQLSchema({ query, mutation })

export default schema