import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as authSelectors from 'store/selectors/auth'
import Relay from 'react-relay'

import { Link } from 'react-router'

import AddPostMutation from 'store/relay/mutations/post/AddPostMutation'
import RemovePostMutation from 'store/relay/mutations/post/RemovePostMutation'

class Home extends React.Component {
  
  _handlePostAdd = (e) => {
    const title = this.refs.input.value.trim()
    this.props.relay.commitUpdate(
      new AddPostMutation({title, viewer:this.props.viewer}),
      {
        onSuccess:(res)=>console.log(res),
        onFailure:(trans) => console.log(trans.getError()), // trigger redux-form validation
      }
    )
    e.preventDefault()    
  }

  handleDeletePost (id) {
    this.props.relay.commitUpdate(
      new RemovePostMutation({id, viewer:this.props.viewer}),
      {
        onSuccess:(res)=>console.log(res),
        onFailure:(trans) => console.log(trans.getError()), // trigger redux-form validation
      }
    )    
  }


  render(){  
    const {viewer:{posts:{edges, pageInfo}}, children, relay} = this.props  
    
    return (  
    	<div className="container">
    		<h1>User List</h1>
        <div className="col-md-6">
        <input ref="input" />
        <button onClick={this._handlePostAdd}>add</button>
        {edges.map(post=>
          <div key={post.node.id}>
            <Link to={`/index/${post.node.id}`}>
              <h2>{post.node.title}</h2>              
            </Link>            
            <button onClick={e=>this.handleDeletePost(post.node.id)}>x</button>
          </div>
        )}
        {
          pageInfo.hasNextPage && <button onClick={e=>relay.setVariables({
            offset: relay.variables.offset + relay.variables.first
          })}>Next</button>
        }
        {
          relay.variables.offset > 0 && <button onClick={e=>relay.setVariables({
            offset: relay.variables.offset - relay.variables.first
          })}>Previous</button>
        }
        </div>
        <div className="col-md-6">{children}</div>
    	</div>
    )
  }

}

export default Relay.createContainer(Home, {

  initialVariables: {
    first: 10,    
    offset: 0,
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        ${AddPostMutation.getFragment('viewer')} 
        ${RemovePostMutation.getFragment('viewer')} 
        posts(first: 10 offset: $offset){
          edges {
            node {
              id
              title
            }
          }
          pageInfo {
            hasNextPage            
          }
        }        
      }
    `
  },
})

