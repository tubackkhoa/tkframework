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

import { v4 } from 'uuid'

import { socialAccountInputType } from 'data/graphql/types/inputs/social-account'
import { fileInputType } from 'data/graphql/types/inputs/file'
import { authorType } from 'data/graphql/types/queries/author'

import models from 'models'
import authorize from 'passport/authorize'

import fse from 'fs-extra'
import path from 'path'
import { filePath } from 'config/constants'

// resolve can return async function, it is Promise
// and in async function, we can use await instead of then callback
export const updateAuthor = mutationWithClientMutationId({
  name: 'UpdateAuthor', // PayLoad will be append at the end of name
  inputFields: {   
    id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    introduction: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
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
    
    // authorize this request first
    authorize(request)
    
    // insert then return post, we can use try catch instead of error callback
    const authorId = fromGlobalId(id).id    

    const author = await models.authors.findById(authorId, {
      attributes: ['id', 'image'],      
    })

    const authorAttributes = {description, introduction, name}
    if(avatar) {
      // first, delete image of author, then upload image,       
      // should use saveSync, because we have to wait here, sync is always faster if      
      const imagePath = path.join(filePath, 'author/image', authorId)
      // delete at background
      author.image && fse.remove(path.join(imagePath, author.image), err => 
        console.log(err || `Removed file ${author.image}`)
      )
      // update new image, use v4 to share code with client
      const filename = v4() + path.extname(avatar.originalname)     
      fse.outputFileSync(path.join(imagePath, filename), avatar.buffer)
      authorAttributes.image = filename
    }    

    // we have to wait, try catch here or let it throw?
    models.sequelize.transaction( trans => {
      // roll back code ?    
      // this would default to trans, when rollback
      return Promise.all([
        author.updateAttributes(authorAttributes),
        ...social_accounts.map(social_account => {
          const {id, author_id, ...data} = social_account
          return models.social_accounts.update(data, {
            where: {id}
          })
        })
      ])
    })

    // return the update to tell client it is the same
    return authorAttributes
  },
})
