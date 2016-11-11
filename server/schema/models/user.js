import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,    
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
  mutationWithClientMutationId  
} from 'graphql-relay'


import {getTodos} from 'data/database'

const getUserSchema = (nodeInterface, TodosConnection) => {

  const GraphQLUser = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: globalIdField('User'),
      todos: {
        type: TodosConnection,
        args: {
          status: {
            type: GraphQLString,
            defaultValue: 'any',
          },
          ...connectionArgs,
        },
        resolve: (obj, {status, ...args}) =>
          connectionFromArray(getTodos(status), args),
      },
      totalCount: {
        type: GraphQLInt,
        resolve: () => getTodos().length,
      },
      completedCount: {
        type: GraphQLInt,
        resolve: () => getTodos('completed').length,
      },
    },
    interfaces: [nodeInterface],
  });

  return {GraphQLUser}
}

export default getUserSchema