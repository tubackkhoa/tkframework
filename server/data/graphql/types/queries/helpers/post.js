import models from 'models' 

export const getPostDetail = async (id, graphFields) => {

  // we only process items when get detail of this post, not for list
  const {tags: tagsGraphFields, items: itemsGraphFields, ...postGraphFields} = graphFields
  const postAttributes = Object.keys(postGraphFields)
  const post = typeof id === 'object' 
    ? await models.posts.findOne({ 
        where: id,
        attributes: postAttributes, 
      })
    : await models.posts.findById(id, { 
        attributes: postAttributes, 
      })

  // guard for post  
  if(!post)
    return post

  if(tagsGraphFields) {
    // we connect tag via tagging, so no need to map subject_id to post.id
    // with async it can handle promise.map by apply yield return to generator
    post.tags = await post.getPostTags(Object.keys(tagsGraphFields))
  }

  if(itemsGraphFields) {
    // items { item_text {}, item_image, item_twitter }
    // first get list of items, base on target_type, we will retrieve item_type belongs to each one
    // we will not retrieve concrete but ordered list
    // dataloader will help us reduce calls
    const {text, twitter, image} = itemsGraphFields
    const [
      textAttributes, 
      twitterAttributes,             
    ] = [text, twitter].map(fields=>Object.keys(fields))

    // must provide post_id for mapping or it will return empty, do not accept from user input
    post.items = await post.getOrderedItems(['id', 'post_id', 'target_id', 'target_type'])    
    // mapping for detail
    post.items.forEach((item, index) => {
      // re-assign sort_rank for client to render correctly
      item.sort_rank = index
      switch(item.target_type) {
        case 'ItemText':          
          item.text = models.item_texts.findById(item.target_id, {attributes: textAttributes})
          break
        case 'ItemImage':
          const { full_src, ...imageGraphFields } = image
          if(full_src)
            // resolve full_src, just as src, but we have to create getter method
            imageGraphFields.src = full_src
          item.image = models.item_images.findById(item.target_id, {attributes: Object.keys(imageGraphFields)})
          break
        default:
          item.twitter = models.item_twitters.findById(item.target_id, {attributes: twitterAttributes})
          break
      }
    })
  }

  // return post
  return post  
}