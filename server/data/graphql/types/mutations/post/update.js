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

import { GraphQLDate } from 'data/graphql/types/custom/date'

import { postType } from 'data/graphql/types/queries/post'
import { itemInputType } from 'data/graphql/types/inputs/item'

import models from 'models'
import authorize from 'passport/authorize'

const deleteOldItemsFromItems = async (postId, items) => {
  const oldItems = await models.items.findAll({
    where: {
      post_id: postId,      
    },
    attributes: ['id', 'target_type', 'target_id'],
  })

  // convert to int before searching
  const itemListIDs = items.filter(item=>item.id)
    .map(item => +fromGlobalId(item.id).id)

  const deleteItems = oldItems
    .filter(oldItem => itemListIDs.indexOf(oldItem.id) === -1)
       
  models.items.destroyItems(deleteItems)  

}

// we return graph object, which id will be resolve
const updateItemsForPost = async (postId, items) => {  

  // first try to get all the tag from the db, if not have then insert
  // Promise.all should not use with FindCreateFind dirrectly or it will not excute
  const itemList = await Promise.all(items.map(async (itemData, index) => {
    // get local id
    const id = itemData.id ? +fromGlobalId(itemData.id).id : 0
    let item = await models.items.findById(id, {      
      attributes:['id'],  // we only need id to update its id
    })

    const created = item ? false : true
    // update item attribute
    const itemAttributes = {sort_rank: index, target_type: itemData.target_type}
    if(created) {
      item = await models.items.create(itemAttributes)
    } else {
      item.updateAttributes(itemAttributes)
    }
    
    // check to update at background for each item
    // no need because we wont check new item to delete old item
    // override id
    item = {...itemData, id: item.id}
    // update for item detail of this item
    switch(itemData.target_type) {
      case 'ItemText':   
        const {id:textId, ...textData} = itemData.text 
        const localTextId = textId ? +fromGlobalId(textId).id : 0
        const itemText = await models.item_texts
          .findCreateFind({
            where:{id: localTextId},
            defaults: textData,
            attributes: ['id'],
          }).spread((itemDetail, created) => itemDetail.get({plain: true})) 
        item.text.id = itemText.id
        if(created) {
          item.target_id = itemText.id
        }
        else 
          // update for this item
          textData.description && models.item_texts.update(textData, {
            where: {id: localTextId},              
          })
        break

      case 'ItemImage':          
        const {id:imageId, ...imageData} = itemData.image   
        const localImageId = imageId ? +fromGlobalId(imageId).id : 0   
        const itemImage = await models.item_images
          .findCreateFind({
            where:{id: localImageId},
            defaults: imageData,
            attributes: ['id'],
          }).spread((itemDetail, created) => itemDetail.get({plain: true})) 
        item.image.id = itemImage.id
        if(created){
          item.target_id = itemImage.id
        }
        else 
          // update for this item
          imageData.caption && models.item_images.update(imageData, {
            where: {id: localImageId},              
          })
        break

      default:
        const {id:twitterId, ...twitterData} = itemData.twitter       
        const localTwitterId = twitterId ? +fromGlobalId(twitterId).id : 0
        const itemTwitter = await models.item_twitters
          .findCreateFind({
            where:{id:localTwitterId},
            defaults: twitterData,
            attributes: ['id'],
          }).spread((itemDetail, created) => itemDetail.get({plain: true})) 
        item.twitter.id = itemTwitter.id
        if(created){
          item.target_id = itemTwitter.id            
        }
        else 
          // update for this item
          twitterData.twitter_id && models.item_twitters.update(twitterData, {
            where: {id: localTwitterId},              
          })         
        break
    }

    // update for inserted item
    models.items.update(created 
    ? { target_id: item.target_id, post_id: postId}
    : { sort_rank: index }
    , {
      where: {id: item.id},              
    })

    // after mapping id to this
    return item
  }))            
  

  // background
  deleteOldItemsFromItems(postId, items)
  
  // do next for each item type
  return itemList
}


// resolve can return async function, it is Promise
// and in async function, we can use await instead of then callback
export const updatePost = mutationWithClientMutationId({
  name: 'UpdatePost',  
  inputFields: {   
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    lead_sentence: { type: new GraphQLNonNull(GraphQLString) },
    published_at: { type: new GraphQLNonNull(GraphQLDate) },      
    // also update the tags to it, maybe via ORM 
    // for item, it is more complex, so we will update seperately
    tags: {
      type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
      description: 'List tags input of the post',    
    },    
    items: {
      type: new GraphQLList(new GraphQLNonNull(itemInputType)),
      description: 'List items input of the post',    
    }, 
  },
  outputFields: {
    post: {
      type: postType,
      resolve: post => post,
    }
  },
  mutateAndGetPayload: async ({id, title, lead_sentence, published_at, tags, items}, {request}) => {      
    authorize(request)
    // insert then return post, we can use try catch instead of error callback
    // error is good enough
    const postId = id ? +fromGlobalId(id).id : 0    
    // we need post model to resolve at client, for later update
    // no need to spread to plain object, just return model object and have methods of it
    const post = await models.posts.findById(postId, {
      attributes: ['id'],
    })

    // update attribute
    post.updateAttributes({title, lead_sentence, published_at})

    // update tags
    post.tags = await post.updateTags(tags)

    // update items
    // await post
    // callback return items id so it can return items
    post.items = await updateItemsForPost(post.id, items)

    // return nothing but id, and updated id for client to resolve
    return post
  },
})
