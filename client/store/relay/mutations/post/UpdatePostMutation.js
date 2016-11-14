
import Relay from 'react-relay'

export default class UpdatePostMutation extends Relay.Mutation {

  // only get id 
  static fragments = {
    post: () => Relay.QL`
      fragment on Post {
        id
      }
    `,    
  }

  getMutation() {
    return Relay.QL`mutation{updatePost}`
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdatePostPayload @relay(pattern: true) {
        post {
          title
        }        
      }
    `
  }

  /**
   * RANGE_DELETE: delete one or more edges between 2 nodes (parentName, parentID, connectionName,deletedIDFieldName)
   * RANGE_ADD: create new node (parentName, parentID, connectionName, edgeName, rangeBehaviors)
   * FIELDS_CHANGE: update node (fieldIDs)
   * NODE_DELETE: delete node (parentName, parentID, connectionName, deletedIDFieldName )
   * REQUIRED_CHILDREN: get info of new node when redirect (children)
   */
  
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        post: this.props.post.id,        
      },
    }]
  }

  getVariables() {
    return {
      title: this.props.title,
      id: this.props.post.id,
    }
  }

  getOptimisticResponse() {     
    return {
      post: {
        title: this.props.title,
        id: this.props.post.id,
      },
    }
  }
}
