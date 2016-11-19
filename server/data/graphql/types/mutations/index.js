import { GraphQLObjectType } from 'graphql';
import postMutation from './post'
import authorMutation from './author'

const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		...postMutation,
    ...authorMutation,
	})
})


export default mutationType
