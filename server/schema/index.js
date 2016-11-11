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

class Viewer extends Object {type: 'viewerType'}
const getViewer = () => new Viewer()

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

const {authorType, authors} = getAuthorsSchema(nodeInterface)
const {postType, posts, updatePost} = getPostsSchema(nodeInterface)

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
    updatePost,
  }),
})

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})