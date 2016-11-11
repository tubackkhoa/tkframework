import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Playlist from 'components/Sound/playlist'
import * as loginSelectors from 'store/selectors/login'
import Relay from 'react-relay'

import Posts from 'store/relay/mutations/posts'

class Hello extends React.Component {
  
  render(){  
    
    return (  
      <div>
        <h1>User List</h1>
        <p><input type="text" onChange={e => this.setLimit(e.target.value)} /></p>
        {
          this.props.viewer.posts.edges.map(item => 
            <h2 key={item.node.id}>{item.node.title} {item.node.createdAt}</h2>
          )
        }
      </div>
    )
  }

  setLimit(limit){
    this.props.relay.setVariables({
      limit: limit
    })
  }

}
export default Relay.createContainer(Hello, {

  initialVariables: {
    limit: 10,
    move: 'first'
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        posts(first: $limit) {
          edges {            
            node {
              id
              title
              createdAt
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,
  },
})

