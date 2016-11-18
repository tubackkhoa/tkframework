import { GraphQLObjectType } from 'graphql'
import { nodeField } from 'data/graphql/node-definitions'
import { getViewer } from 'data/graphql/viewer'

import { viewerType } from './viewer'

const queryType = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		node: nodeField,
		viewer: {
			type: viewerType,
			resolve: () => getViewer(1)
		}
	})
})

export default queryType