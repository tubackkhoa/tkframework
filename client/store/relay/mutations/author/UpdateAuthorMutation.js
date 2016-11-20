
import Relay from 'react-relay'

export default class UpdateAuthorMutation extends Relay.Mutation {

  // only get id 
  static fragments = {
    author: () => Relay.QL`
      fragment on Author {
        id
      }
    `,    
  }

  getMutation() {
    return Relay.QL`mutation{updateAuthor}`
  }

  getFiles() {
    return {
      avatar: this.props.avatar,
    }
  }

  getFatQuery() {
    // no need to get all information, we just spread our props.data
    return Relay.QL`
      fragment on UpdateAuthorPayload @relay(pattern: true) {
        author {
          id
          image
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
        author: this.props.author.id,        
      },
    }]
  }

  getVariables() {
    return {
      ...this.props.data,
      id: this.props.author.id,
    }
  }

  getOptimisticResponse() {    
    const { social_accounts, ...author } = this.props.data
    // do something for author?, but no need to return social_accounts
    return {
      author: {
        ...author,
        id: this.props.author.id,
      },
    }
  }
}
