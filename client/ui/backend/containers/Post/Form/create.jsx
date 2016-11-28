import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import { connect } from 'react-redux'

import { getTagSuggestions } from 'store/actions/tag'
import { createPost } from 'store/actions/post'
import * as authSelectors from 'store/selectors/auth'

import PostForm from './shared'

const mapStateToProps = state=>({
  token: authSelectors.getToken(state)
})

@connect(mapStateToProps, { getTagSuggestions, createPost })
class PostFormCreate extends Component {

  // init for form
  componentWillMount() {    
    document.title = 'Create Post'    
    this.props.getTagSuggestions()      
  }

  static defaultProps = {
    post: {
      items:[],
      tags:[],
    }
  }

  _handleSavePost = (post) => {
    // in this case, we just call method and when success
    // we switch to edit page with new id
    // so it will not be come complicated for us to trick mutation with empty item
    const {tags, items, ...data} = post
    data.tags = tags.map(tag=> tag.text || tag.name)
    this.props.createPost(this.props.token, data)
  }
  

  render(){  
    return (
      <PostForm savePost={this._handleSavePost} isNew={true} 
        ready={com=>this.postForm=com}  initialValues={this.props.post} />
    )
  }

}

// should not share fragment between component !!!
export default PostFormCreate