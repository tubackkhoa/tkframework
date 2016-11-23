import { GraphQLObjectType } from 'graphql'
import postMutation from './post'
import authorMutation from './author'
import itemMutation from './item'

const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...postMutation,
    ...authorMutation,
    ...itemMutation,
	})
})


export default mutationType
