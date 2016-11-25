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

import { fileInputType } from 'data/graphql/types/inputs/file'
import { itemImageType } from 'data/graphql/types/queries/item'

import models from 'models'
import authorize from 'passport/authorize'

import fse from 'fs-extra'
import path from 'path'
import { filePath } from 'config/constants'

// resolve can return async function, it is Promise
// and in async function, we can use await instead of then callback
export const updateItemImage = mutationWithClientMutationId({
  name: 'UpdateItemImage', // PayLoad will be append at the end of name
  inputFields: {   
    id: { type: new GraphQLNonNull(GraphQLID) },
    full_src: { type: fileInputType }, // update if there is file uploaded
  },
  outputFields: {
    item_image: {
      type: itemImageType,
      resolve: item_image => item_image,
    }
  },
  mutateAndGetPayload: async ({id, full_src}, {request}) => {      
    
    // authorize this request first
    authorize(request)
    
    // insert then return post, we can use try catch instead of error callback
    const itemImageId = fromGlobalId(id).id    

    const item_image = await models.item_images.findById(itemImageId, {
      attributes: ['id', 'src'],      
    })

    if(full_src) {
      // first, delete image of author, then upload image, 
      // should use saveSync, because we have to wait here, sync is always faster if      
      const imagePath = path.join(filePath, 'item_image/image', itemImageId)
      // delete at background
      fse.remove(path.join(imagePath, item_image.src), err => 
        console.log(err || `Removed file ${item_image.src}`)
      )      
      // update new image, use v4 to share code with client
      const filename = v4() + path.extname(full_src.originalname)  
      // must save done then return   
      fse.outputFileSync(path.join(imagePath, filename), full_src.buffer)
      item_image.src = filename
      // update at background
      item_image.save()
    }    

    // return the update to tell client it is the same
    return item_image
  },
})
