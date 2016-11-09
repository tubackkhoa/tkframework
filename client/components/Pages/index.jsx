import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Playlist from 'components/Sound/playlist'
import * as loginSelectors from 'store/selectors/login'
import Relay from 'react-relay'

class Index extends React.Component {

  render(){  
    console.log('render')
    return (  
    	<div>
    		<h1>User List</h1>
        <p><input type="text" onChange={e => this.setLimit(e.target.value)} /></p>
        {
          this.props.viewer.users.edges.map(user => 
            <h2 key={user.node.id}>{user.node.username} {user.node.createdAt}</h2>
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

Index.propTypes = {

}

export default Relay.createContainer(Index, {

  initialVariables: {
    limit: 2
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        users(first: $limit) {
          edges {
            node {
              id
              username
              createdAt
            },
          },
        },
      }
    `,
  },
})

