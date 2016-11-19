import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

import { 
  mutationWithClientMutationId, 
  offsetToCursor,
  fromGlobalId,
} from 'graphql-relay'

import { socialAccountInputType } from 'data/graphql/types/inputs/social-account'
import { fileInputType } from 'data/graphql/types/inputs/file'
import { authorType } from 'data/graphql/types/queries/author'

import models from 'models'
import authorize from 'data/graphql/authorize'

// resolve can return async function, it is Promise
// and in async function, we can use await instead of then callback
export const updateAuthor = mutationWithClientMutationId({
  name: 'UpdateAuthor', // PayLoad will be append at the end of name
  inputFields: {   
    id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    introduction: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    avatar: { type: fileInputType }, // update if there is file uploaded
    // also update the social_account related to it, maybe via ORM 
    social_accounts: {
      type: new GraphQLList(socialAccountInputType),
      description: 'List social accounts input of the user',    
    }, 
  },
  outputFields: {
    author: {
      type: authorType,
      resolve: author => author,
    }
  },
  mutateAndGetPayload: async ({id, description, introduction, name, avatar, social_accounts}, {request}) => {      
    authorize(request)
    // insert then return post, we can use try catch instead of error callback
    
    // error is good enough
    // const socialAccountId = fromGlobalId(id).id
    // models.posts.update({url}, {
    //   where: {id: postId}
    // })
    // return the update to tell client it is the same
    return {id}
  },
})
