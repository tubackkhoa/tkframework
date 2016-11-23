import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { connect } from 'react-redux'

import { setToast } from 'store/actions/common'
import { getTagSuggestions } from 'store/actions/tag'

import PostForm from './shared'
import UpdatePostMutation from 'store/relay/mutations/post/UpdatePostMutation'
import UpdateItemImageMutation from 'store/relay/mutations/item/UpdateItemImageMutation'
import TARGET_TYPES from 'ui/shared/constants/targetTypes'

import { formValueSelector } from 'redux-form'

import {
  copyFromRelay,
} from 'ui/backend/shared/utils'

// we will wrap it here
// for create new, we just call AddMutation, no need to return update for inner component

const postFormSelector = formValueSelector('PostForm')

const mapStateToProps = (state) => ({
  postFormItems: postFormSelector(state, 'items'),
})


@connect(mapStateToProps, { setToast, getTagSuggestions })
class PostFormEdit extends Component {  

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  // init for form
  componentWillMount() {    
    document.title = 'Update Post'      
    // update tag suggestions
    this.props.getTagSuggestions()
  }

  _handleSavePost = (post) => {
    // items will be updated seperately
    // we will remain relay data for redux-form, but when post data to server
    // we should remove them, it is just input, we will take convenient by copy from relay data
    // by default javascript only assign reference to structure without copy new data
    const {tags, items, ...data} = post
    // only update tags name
    data.tags = tags.map(tag=> tag.text || tag.name)

    data.items = items.map(item=>{
      // do not send status field to server
      const {editing, isNew, ...itemData} = item
      // sanitize data again, we can use editing and isNew for later    
      // we will not update full_src this time
      if(itemData.target_type === TARGET_TYPES.IMAGE){        
        // delete is just faster than re-create again
        const {full_src, ...itemDataImage} = itemData.image
        itemData.image = itemDataImage
      }
      // now the correct data to update as input graph
      return itemData
    })    


    // do relay update here    
    this.props.relay.commitUpdate(
      new UpdatePostMutation({data, post:this.props.node}),
      {
        onSuccess:({updatePost})=> {
          this.updatePostItems(updatePost)
          this.props.setToast('Update post successfully!!!')
          // move to post list
          this.context.router.push('/cms/posts')
        },
        onFailure:(trans) => console.log(trans.getError()) || this.props.setToast('Update post failed!!!'), // trigger redux-form validation
      }
    )
  }

  updatePostItems({post}){  

    // re-update via post state
    const {items} = post
    // update post state
    items.forEach((item, index)=>{
      const currentItem = this.props.postFormItems[index]
      // update for new item created
      if(!currentItem.id){
        // update for id
        const newUpdatedItem = {
          ...currentItem,
          id: item.id,
          image: {
            ...currentItem.image,
            ...item.image,
          },
          twitter: {
            ...currentItem.twitter,
            ...item.twitter,
          },
          text: {
            ...currentItem.text,
            ...item.text,
          }
        }
        this.postForm.props.change(`items[${index}]`, newUpdatedItem)
      }
    })
        
    // now do every update for image item :v
    this.props.postFormItems.forEach((item, index) => {        
        // do mutation we use from relay, but also sync to redux-form
        if(item.target_type === TARGET_TYPES.IMAGE && item.image.full_src){
          const {full_src} = item.image
          if(full_src.preview){            
            // call update image then update postForm again
            // because we do not track new insert item via AddMutation
            // so we only track mutation at Post
            this.props.relay.commitUpdate(
              new UpdateItemImageMutation({full_src, id: item.image.id, post:this.props.node}),
              {
                onSuccess:({updateItemImage:{item_image}})=>{
                  // update image source
                  // const newUpdatedItems = this.props.postFormItems.slice(0)
                  // newUpdatedItems[index].image.full_src = item_image.full_src

                  // this.postForm.props.change('items', newUpdatedItems)
                  const newUpdatedItem = {...item, image:{...item.image, ...item_image}}
                  this.postForm.props.change(`items[${index}]`, newUpdatedItem)
                },
                // trigger redux-form validation
                onFailure:(trans) => console.log(trans.getError()), 
              }
            )
          }
        }
    })
  }

  render(){    
    const post = copyFromRelay(this.props.node)    
    return (
      <PostForm savePost={this._handleSavePost} isNew={false} 
        ready={com=>this.postForm=com}  initialValues={post} />
    )
  }

}

// should not share fragment between component !!!
export default Relay.createContainer(PostFormEdit, { 
  fragments: {

    node: () => Relay.QL `
      fragment OnePost on Post {
        id
        title
        lead_sentence
        published_at
        tags {
          id
          name
        }
        items {
          id
          target_type
          sort_rank
          text {
            id
            description
          }
          image {
            id
            full_src
            caption            
          }
          twitter {
            id
            twitter_id
          }          
        }
        ${UpdateItemImageMutation.getFragment('post')}
        ${UpdatePostMutation.getFragment('post')},
      }
    `
  }
})