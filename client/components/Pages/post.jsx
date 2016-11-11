import React from 'react';
import Relay from 'react-relay';

import PostsMutation from 'store/relay/mutations/posts';

class Post extends React.Component {

  render() {
    console.log(this.props)
    return (
      <blockquote>
        <p>{this.props.post.title}</p>
        <footer>{this.props.post.createdAt}</footer>        
      </blockquote>
    );
  }
}

export default Relay.createContainer(Post, { 
  fragments: {
    post: () => Relay.QL `
      fragment OnePost on Post {
        ${PostsMutation.getFragment('post')}        
      }
    `
  }
})
