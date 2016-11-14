import { GraphQLObjectType } from 'graphql'
import { nodeField } from 'graphql/node-definitions'
import { getViewer } from 'graphql/viewer'

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