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
import getAuthorsSchema from './authors'
import getPostsSchema from './posts'

class Viewer extends Object {}
const getViewer = () => new Viewer()

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId)
    console.log(type)
    switch (type) {
    case 'authors':
      return models.authors.findById(id)
    case 'posts':
      return models.posts.findById(id)
    case 'Viewer':
      return getViewer();
    default:
      return null;
    }
  },
  (obj) => {
    switch(obj.constructor) {
      case Viewer:
        return viewerType
      case models.authors:
        return authorType
      case models.posts:
        return postType
      default:
        return null;
    }
  },
)

const {authorType, authors} = getAuthorsSchema(nodeInterface)
const {postType, posts} = getPostsSchema(nodeInterface)

// root query
const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),    
    authors,
    posts:posts,
  }),
  interfaces: [nodeInterface],
})

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: viewerType,
      resolve: () => getViewer(),
    }
  }),
})

export default new GraphQLSchema({
  query: queryType,
})