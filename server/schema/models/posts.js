import {
  GraphQLObjectType,
} from 'graphql'

import {
  globalIdField, 
} from 'graphql-relay'

import {  
  attributeFields,
} from 'graphql-sequelize'

import models from 'models'
import getModel from 'schema/paging/getModel'

const getPostsSchema = (nodeInterface) => {
  const postType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      ...attributeFields(models.posts),
      id: globalIdField('Post'),
    }),
    interfaces: [nodeInterface],
  })

  const {models:posts, edgeType:postEdge} = getModel(postType)  

  return { postType, postEdge, posts }
}

export default  getPostsSchema
