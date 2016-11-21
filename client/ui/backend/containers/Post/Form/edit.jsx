import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { connect } from 'react-redux'

import { setToast } from 'store/actions/common'
import { replaceCurrentPost } from 'store/actions/post'
import { updateTagSuggestions } from 'store/actions/tag'

import PostForm from './shared'
import UpdatePostMutation from 'store/relay/mutations/post/UpdatePostMutation'

// we will wrap it here
// for create new, we just call AddMutation, no need to return update for inner component


@connect(null, { setToast, replaceCurrentPost, updateTagSuggestions })
class PostFormEdit extends Component {

  // init for form
  componentWillMount() {    
    document.title = 'Update Post'      
    // update tag suggestions
    this.props.updateTagSuggestions(this.props.node.tags.map(tag=>tag.name))
  }

  _handleSavePost = (post) => {
    // do relay update here    
    this.props.relay.commitUpdate(
      new UpdatePostMutation({title:post.title, post:this.props.node}),
      {
        onSuccess:(res)=>this.props.setToast('Update post successfully!!!'),
        onFailure:(trans) => this.props.setToast(trans.getError()), // trigger redux-form validation
      }
    )
  }

  render(){
    // send post to props
    const {__dataID__, __fragments__, ...post} = this.props.node    
    return (
      <PostForm savePost={this._handleSavePost} isNew={false} initialValues={post} />
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
        created_at
        tags {
          id
          name
        }
        items {
          id
          target_type
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
        ${UpdatePostMutation.getFragment('post')},
      }
    `
  }
})