import React from 'react';
import Relay from 'react-relay';

import PostsMutation from 'store/relay/mutations/posts';

class Post extends React.Component {

  render() {
    const {post} = this.props
    return (
      <blockquote>
        <p>{post.title}</p>
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
        createdAt
      }
    `
  }
})
