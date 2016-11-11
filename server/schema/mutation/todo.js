import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';


import {
  Todo,
  User,
  addTodo,
  changeTodoStatus,
  getTodo,
  getTodos,
  getUser,
  getUserViewer,
  markAllTodos,
  removeCompletedTodos,
  removeTodo,
  renameTodo,
} from 'data/database'


const getTodoMutationSchema = (GraphQLTodo, GraphQLTodoEdge, GraphQLUser) => {

  const GraphQLAddTodoMutation = mutationWithClientMutationId({
    name: 'AddTodo',
    inputFields: {
      text: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
      todoEdge: {
        type: GraphQLTodoEdge,
        resolve: ({localTodoId}) => {
          const todo = getTodo(localTodoId);
          return {
            cursor: cursorForObjectInConnection(getTodos(), todo),
            node: todo,
          };
        },
      },
      viewer: {
        type: GraphQLUser,
        resolve: () => getUserViewer(),
      },
    },
    mutateAndGetPayload: ({text}) => {
      const localTodoId = addTodo(text);
      return {localTodoId};
    },
  });

  const GraphQLChangeTodoStatusMutation = mutationWithClientMutationId({
    name: 'ChangeTodoStatus',
    inputFields: {
      complete: { type: new GraphQLNonNull(GraphQLBoolean) },
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
      todo: {
        type: GraphQLTodo,
        resolve: ({localTodoId}) => getTodo(localTodoId),
      },
      viewer: {
        type: GraphQLUser,
        resolve: () => getUserViewer(),
      },
    },
    mutateAndGetPayload: ({id, complete}) => {
      const localTodoId = fromGlobalId(id).id;
      changeTodoStatus(localTodoId, complete);
      return {localTodoId};
    },
  });

  const GraphQLMarkAllTodosMutation = mutationWithClientMutationId({
    name: 'MarkAllTodos',
    inputFields: {
      complete: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
    outputFields: {
      changedTodos: {
        type: new GraphQLList(GraphQLTodo),
        resolve: ({changedTodoLocalIds}) => changedTodoLocalIds.map(getTodo),
      },
      viewer: {
        type: GraphQLUser,
        resolve: () => getUserViewer(),
      },
    },
    mutateAndGetPayload: ({complete}) => {
      const changedTodoLocalIds = markAllTodos(complete);
      return {changedTodoLocalIds};
    },
  });

  // TODO: Support plural deletes
  const GraphQLRemoveCompletedTodosMutation = mutationWithClientMutationId({
    name: 'RemoveCompletedTodos',
    outputFields: {
      deletedTodoIds: {
        type: new GraphQLList(GraphQLString),
        resolve: ({deletedTodoIds}) => deletedTodoIds,
      },
      viewer: {
        type: GraphQLUser,
        resolve: () => getUserViewer(),
      },
    },
    mutateAndGetPayload: () => {
      const deletedTodoLocalIds = removeCompletedTodos();
      const deletedTodoIds = deletedTodoLocalIds.map(toGlobalId.bind(null, 'Todo'));
      return {deletedTodoIds};
    },
  });

  const GraphQLRemoveTodoMutation = mutationWithClientMutationId({
    name: 'RemoveTodo',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    outputFields: {
      deletedTodoId: {
        type: GraphQLID,
        resolve: ({id}) => id,
      },
      viewer: {
        type: GraphQLUser,
        resolve: () => getUserViewer(),
      },
    },
    mutateAndGetPayload: ({id}) => {
      const localTodoId = fromGlobalId(id).id;
      removeTodo(localTodoId);
      return {id};
    },
  });

  const GraphQLRenameTodoMutation = mutationWithClientMutationId({
    name: 'RenameTodo',
    inputFields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      text: { type: new GraphQLNonNull(GraphQLString) },
    },
    outputFields: {
      todo: {
        type: GraphQLTodo,
        resolve: ({localTodoId}) => getTodo(localTodoId),
      },
    },
    mutateAndGetPayload: ({id, text}) => {
      const localTodoId = fromGlobalId(id).id;
      renameTodo(localTodoId, text);
      return {localTodoId};
    },
  });

  return {
    GraphQLAddTodoMutation,
    GraphQLChangeTodoStatusMutation,
    GraphQLMarkAllTodosMutation,
    GraphQLRemoveCompletedTodosMutation,
    GraphQLRemoveTodoMutation,
    GraphQLRenameTodoMutation,
  }

}

export default getTodoMutationSchema