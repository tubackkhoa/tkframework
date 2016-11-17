import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

import Item from 'ui/frontend/components/Post/Indexes/Item'
import Infinite from 'react-infinite'

class PostIndex extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isInfiniteLoading: false,
    }
  }

  componentDidMount() {
    document.title = "Posts" 
  }

  _handleLoad = () => {
    const {viewer:{posts:{pageInfo}}, relay} = this.props

    if (pageInfo.hasNextPage && !this.state.isInfiniteLoading) {
      // mark loading
      this.setState({
        isInfiniteLoading: true
      })

      // get next 10 item
      relay.setVariables({
        first: relay.variables.first + 10,
      }, ({ready, done, error, aborted}) => {
        // wait ready to mark        
        this.setState({isInfiniteLoading: !ready && !(done || error || aborted)})
      })

    }
  }

  render() {  
    const {viewer:{posts:{edges}}, relay} = this.props
    const elementHeight = 100
    return (
      <section>        
        <h1 >Posts</h1>
        <Infinite
          infiniteLoadBeginEdgeOffset={500}
          onInfiniteLoad={this._handleLoad}
          containerHeight={elementHeight * relay.variables.first}
          preloadBatchSize={Infinite.containerHeightScaleFactor(relay.variables.first)}
          elementHeight={elementHeight}
          isInfiniteLoading={this.state.isInfiniteLoading}
          useWindowAsScrollContainer
        >
          {edges.map((post) => {
            return <Item key={post.node.id} {...post.node} />
          })}
        </Infinite>
      </section>
    )
  }
}

export default Relay.createContainer(PostIndex, {

  initialVariables: {
    first: 10,      
    tagId: null,
    order: 'published_at DESC',  
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        posts(first: $first order: $order tagId: $tagId){
          edges {
            node {
              id
              title
              lead_sentence
              published_at
              tags {
                id
                name
              }
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

