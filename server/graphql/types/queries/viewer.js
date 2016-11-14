import { 
	GraphQLObjectType 
} from 'graphql'

import { 
	globalIdField, 
	connectionArgs, 
} from 'graphql-relay'

import { nodeInterface } from 'graphql/node-definitions'
import { getViewer } from 'graphql/viewer'
import { registerType } from 'graphql/type-registry'

import fields from 'graphql/fields'

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