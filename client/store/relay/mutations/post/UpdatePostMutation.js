
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

  // get Fat Query will update the response from server
  // for item we update, this will update the Relay.Store
  // by default all other items can access it
  getFatQuery() {
    return Relay.QL`
      fragment on UpdatePostPayload @relay(pattern: true) {
        post {
          id
          title          
          published_at
          tags
          items {
            id
            text {
              id
              description
            }
            image {
              id
              caption
            }
            twitter {
              id
              twitter_id
            }
          }
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
  
  // change field post, with response from fatQuery
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
      ...this.props.data,
      id: this.props.post.id,
    }
  }

  getOptimisticResponse() {     
    // must have the same shape as fatQuery
    // but we dont have these ids to return :v
    return {
      post: {        
        id: this.props.post.id,        
      },
    }
  }
}
