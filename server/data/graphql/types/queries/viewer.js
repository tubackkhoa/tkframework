import { 
	GraphQLObjectType 
} from 'graphql'

import { 
	globalIdField, 
	connectionArgs, 
} from 'graphql-relay'

import { nodeInterface } from 'data/graphql/node-definitions'
import { getViewer } from 'data/graphql/viewer'
import { registerType } from 'data/graphql/type-registry'

import fields from 'data/graphql/fields'

// we can authorize request
export const viewerType = new GraphQLObjectType({
	name: 'Viewer',
	description: 'CMS Graph',
	fields: () => ({
		id : globalIdField('Viewer'),		
		...fields,
	}),
	interfaces: () => [nodeInterface]
})

registerType(viewerType, getViewer)