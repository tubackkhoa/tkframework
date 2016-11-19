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

import { socialAccountType } from 'data/graphql/types/queries/social-account'

import models from 'models'
import authorize from 'data/graphql/authorize'

// resolve can return async function, it is Promise
// and in async function, we can use await instead of then callback
export const updateSocialAccount = mutationWithClientMutationId({
  name: 'UpdateSocialAccount', // PayLoad will be append at the end of name
  inputFields: {   
    id: { type: new GraphQLNonNull(GraphQLID) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    social_account: {
      type: socialAccountType,
      resolve: socialAccount => socialAccount,
    }
  },
  mutateAndGetPayload: async ({id, url}, {request}) => {      
    authorize(request)
    // insert then return post, we can use try catch instead of error callback
    
    // error is good enough
    const socialAccountId = fromGlobalId(id).id
    models.posts.update({url}, {
      where: {id: postId}
    })
    // return the update to tell client it is the same
    return {id, url}
  },
})
