import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql'

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay'

import models from 'models'
import getAuthorsSchema from './models/authors'
import getPostsSchema from './models/posts'

import getTodoSchema from './models/todo'
import getUserSchema from './models/user'
import getTodoMutationSchema from './mutations/todo'

import {getUserViewer, getTodo} from 'data/database'

import {Viewer, getViewer} from './viewer'

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId)     
    switch (type) {
    case 'Author':
      return models.authors.findById(id)
    case 'Post':
      return models.posts.findById(id)
    case 'Todo':
      return getTodo(id)
    case 'User':
      return getUser(id)
    case 'Viewer':
      return getViewer() 
    default:
      return null
    }
  },
  (obj) => {
    switch(obj.type) {
      case 'viewerType':
        return viewerType
      case 'authorType':
        return authorType
      case 'postType':
        return postType
      case 'userType':
        return GraphQLUser
      case 'todoType':
        return GraphQLTodo
      default:
        return null
    }
  },
)

const {authorType, authors} = getAuthorsSchema(nodeInterface)
const {postType, posts, updatePost} = getPostsSchema(nodeInterface)



const {GraphQLTodo, TodosConnection, GraphQLTodoEdge} = getTodoSchema(nodeInterface)
const {GraphQLUser} = getUserSchema(nodeInterface, TodosConnection)

const {
    GraphQLAddTodoMutation,
    GraphQLChangeTodoStatusMutation,
    GraphQLMarkAllTodosMutation,
    GraphQLRemoveCompletedTodosMutation,
    GraphQLRemoveTodoMutation,
    GraphQLRenameTodoMutation,
  } = getTodoMutationSchema(GraphQLTodo, GraphQLTodoEdge, GraphQLUser)

// root query
const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),    
    authors,
    posts,   
    user: {
      type: GraphQLUser,
      resolve: () => getUserViewer(),
    },
  }),
  interfaces: [nodeInterface],
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: viewerType,
      resolve: () => getViewer(),
    }
  }),
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    updatePost,
    addTodo: GraphQLAddTodoMutation,
    changeTodoStatus: GraphQLChangeTodoStatusMutation,
    markAllTodos: GraphQLMarkAllTodosMutation,
    removeCompletedTodos: GraphQLRemoveCompletedTodosMutation,
    removeTodo: GraphQLRemoveTodoMutation,
    renameTodo: GraphQLRenameTodoMutation,
  }),
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})