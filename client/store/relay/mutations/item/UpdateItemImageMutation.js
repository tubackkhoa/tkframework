
import Relay from 'react-relay'

export default class UpdateItemImageMutation extends Relay.Mutation {

  // only get id 
  static fragments = {
    post: () => Relay.QL`
      fragment on Post {
        id
      }
    `,    
  }

  getMutation() {
    return Relay.QL`mutation{updateItemImage}`
  }

  getFiles() {
    // full_src with be return as url
    return {
      full_src: this.props.full_src,
    }
  }

  getFatQuery() {
    // no need to get all information, we just spread our props.data
    return Relay.QL`
      fragment on UpdateItemImagePayload @relay(pattern: true) {
        item_image {
          id
          full_src
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
        item_image: this.props.id,        
      },
    }]
  }

  getVariables() {
    return {
      id: this.props.id,
    }
  }

  getOptimisticResponse() {    
    // do something for author?, but no need to return social_accounts
    return {
      item_image: {
        id: this.props.id,
      },
    }
  }
}
