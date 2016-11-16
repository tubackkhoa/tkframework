import React from 'react'
import Relay from 'react-relay'

import UpdatePostMutation from 'store/relay/mutations/post/UpdatePostMutation'

class Post extends React.Component {

  _handlePostSave = (e) => {
    const title = this.refs.input.value.trim()
    this.props.relay.commitUpdate(
      new UpdatePostMutation({title, post:this.props.post}),
      {
        onSuccess:(res)=>console.log(res),
        onFailure:(trans) => console.log(trans.getError()), // trigger redux-form validation
      }
    )
    e.preventDefault()    
  }

  render() {
    const {post} = this.props
    return (
      <blockquote>
        <p>{post.title}</p>
        <input ref="input" defaultValue={post.title} />
        <button onClick={this._handlePostSave}>update</button>
        <span>{post.createdAt}</span>
        <p>{post.lead_sentence}</p>        
      </blockquote>
    );
  }
}

export default Relay.createContainer(Post, { 
  fragments: {
    post: () => Relay.QL `
      fragment OnePost on Post {
        id
        title
        lead_sentence
        created_at
        ${UpdatePostMutation.getFragment('post')},
      }
    `
  }
})
