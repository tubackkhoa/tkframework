import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import TextDisplay from 'ui/shared/components/Text/Display'
import RecentPosts from 'ui/frontend/components/Post/RecentPosts'


class Home extends Component {

  componentDidMount() {
    document.title = 'Home'
  } 

  render() {
    const {viewer:{latestPosts, latestProject}} = this.props

    return (
      <section>          
        <img src={latestProject.full_image} />
        <TextDisplay description={latestProject.description} />
        <div className='posts' >
          {
            latestPosts && <RecentPosts posts={latestPosts} />
          }          
        </div>
      </section>
    )
  }
}

export default Relay.createContainer(Home, {

  initialVariables: {
    limit: 5,        
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {         
        id         
        latestPosts(limit: $limit){          
          id
          lead_sentence
          title           
        }
        latestProject {
          id
          title
          full_image
          description
        }                
      }
    `
  },
})
