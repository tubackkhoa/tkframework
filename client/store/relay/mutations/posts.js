import Relay from 'react-relay'

class PostsMutation extends Relay.Mutation {

  static fragments = {
    post: () => Relay.QL`
      fragment on Post {        
        title
        createdAt
      }
    `
  }

  getOptimisticResponse() {
    return {      
      post: {
        id: this.props.post.id,
        title: this.props.post.title
      }
    }
  }

}
 

 export default PostsMutation