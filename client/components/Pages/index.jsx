import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Playlist from 'components/Sound/playlist'
import * as authSelectors from 'store/selectors/auth'
import Relay from 'react-relay'

import { Link } from 'react-router'

import Post from './post'
import PostsMutation from 'store/relay/mutations/posts'
import Posts from 'store/relay/mutations/posts'

class Index extends React.Component {
  
  render(){  
    const {viewer:{posts:{edges}}, children} = this.props    
    return (  
    	<div className="container">
    		<h1>User List</h1>
        <div className="col-md-6">
        {edges.map(post=>
          <div key={post.node.id}>
            <Link to={`/index/${post.node.id}`}>
              <h2>{post.node.title}</h2>
            </Link>            
          </div>
        )}
        </div>
        <div className="col-md-6">{children}</div>
    	</div>
    )
  }

}

export default Relay.createContainer(Index, {

  initialVariables: {
    limit: 10,    
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        posts(first: $limit){
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `
  },
})

