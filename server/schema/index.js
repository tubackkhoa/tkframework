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

import {
  resolver,
  attributeFields,
} from 'graphql-sequelize'

import models from 'models'

class Viewer extends Object {}
const getViewer = () => new Viewer();

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {id, type} = fromGlobalId(globalId);

    switch (type) {
    case 'User':
      return models.User.findById(id);
    case 'Viewer':
      return getViewer();
    default:
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Vewer) {
      return viewerType;
    } else if (obj instanceof models.User) {
      return userType; // eslint-disable-line
    }

    return null;
  },
)

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    ...attributeFields(models.User),
    id: globalIdField('User'),
  }),
  interfaces: [nodeInterface],
})

const {connectionType: userConnection} = connectionDefinitions({
  name: 'User',
  nodeType: userType,
})

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
    id: globalIdField('Viewer'),
    users: {
      type: userConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromArray(
        await models.User.findAll({
          limit: args.first,
        }),
        args
      ),
    }
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