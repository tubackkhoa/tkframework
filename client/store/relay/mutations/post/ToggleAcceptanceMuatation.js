
import Relay from 'react-relay'
// we can use helper method to return mutation for specific model with the same action
// support override method
export default class ToggleAcceptanceMuatation extends Relay.Mutation {

  // only get id 
  static fragments = {
    // even when we assign viewer to parent viewer
    // Relay.QL will resolve the correct structure for use
    // so it is not like when we print out on the screen

    posts: () => Relay.QL`
      fragment on PostConnection {
        edges {
          node {
            id
            accepted            
          }
        }
      }
    `,

    viewer: () => Relay.QL`
      fragment on Viewer {
        id        
      }
    `,
  }

  getMutation() {
    return Relay.QL`mutation{toggleAcceptancePost}`
  }

  // no need to get from server, only status is good enough
  // if we use data response, then optimistic is no need
  getFatQuery() {
    return Relay.QL`
      fragment on ToggleAcceptancePostPayload @relay(pattern: true) {    
        viewer {          
          id
          posts
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
  
  // for update post node
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
      },
    }]
  }

  // to pass to mutation graph
  getVariables() {
    return {
      id: this.props.id,
    }
  }

  // return for client first
  getOptimisticResponse() {     

    const viewerPayload = {
      id: this.props.viewer.id,
      posts: {
        edges: this.props.posts.edges.map(edge => ({          
          node: {
            id: edge.node.id,
            accepted: (edge.node.id === this.props.id ? !edge.node.accepted : edge.node.accepted),
          }          
        }))
      } 
    }    
    console.log(viewerPayload, this.props.id)

    return {
      viewer: viewerPayload,
    }
  }
}
