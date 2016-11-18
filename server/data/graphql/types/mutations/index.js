import { GraphQLObjectType } from 'graphql';
import postMutation from './post'

const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...postMutation,
	})
})


export default mutationType
