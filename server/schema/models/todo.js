import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
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

const getTodoSchema = (nodeInterface) => {

  const GraphQLTodo = new GraphQLObjectType({
    name: 'Todo',
    fields: {
      id: globalIdField('Todo'),
      text: {
        type: GraphQLString,
        resolve: (obj) => obj.text,
      },
      complete: {
        type: GraphQLBoolean,
        resolve: (obj) => obj.complete,
      },
    },
    interfaces: [nodeInterface],
  });

  const {
    connectionType: TodosConnection,
    edgeType: GraphQLTodoEdge,
  } = connectionDefinitions({
    name: 'Todo',
    nodeType: GraphQLTodo,
  });

  return {GraphQLTodo, TodosConnection, GraphQLTodoEdge}
}

export default getTodoSchema