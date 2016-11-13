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
import {Viewer, getViewer} from './viewer'

// mutations
import getPostMutation from './mutations/post'

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId)     
    switch (type) {
    case 'Author':
      return models.authors.findById(id)
    case 'Post':
      return models.posts.findById(id)
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
      default:
        return null
    }
  },
)

const {authorType, authorEdge, authors} = getAuthorsSchema(nodeInterface)
const {postType, postEdge, posts} = getPostsSchema(nodeInterface)

// mutation
const postMutation = getPostMutation(postType, postEdge)

// root query
const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),    
    authors,
    posts,
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
    ...postMutation,
  }),
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})