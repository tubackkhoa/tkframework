
import Relay from 'react-relay'

export default class UpdateSocialAccountMutation extends Relay.Mutation {

  // only get id 
  static fragments = {
    social_account: () => Relay.QL`
      fragment on SocialAccount {
        id
      }
    `,    
  }

  getMutation() {
    return Relay.QL`mutation{updateSocialAccount}`
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateSocialAccountPayload @relay(pattern: true) {
        social_account {
          url
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
        social_account: this.props.social_account.id,        
      },
    }]
  }

  getVariables() {
    return {
      url: this.props.url,
      id: this.props.social_account.id,
    }
  }

  getOptimisticResponse() {     
    return {
      social_account: {
        url: this.props.url,
        id: this.props.social_account.id,
      },
    }
  }
}
