import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

import Item from 'ui/frontend/components/Project/Indexes/Item'
import NoContent from 'ui/shared/components/NoContent'


const cmsRegexp = /^(\/cms)*/


class ProjectIndex extends Component {

  componentDidMount() {
    document.title = 'Projects'
  }

  // add adminPath to tell admin's preview from ordinal user's view
  get adminPath() {
    const paths = location.pathname.match(cmsRegexp)
    return paths[0] ? paths[0] : ''
  }

  render() {
  
    const { viewer: {projects:{edges}} } = this.props   

    if (!edges.length) {
      return (
        <section>
          <NoContent pageName="projects" />
        </section>
      )
    }

    return (
      <section>
        <h1 >Projects</h1>
        <div >
          {edges.map((project) => {
            return <Item key={project.node.id} adminPath={this.adminPath} {...project.node} />
          })}
        </div>
      </section>
    )
  }
}

export default Relay.createContainer(ProjectIndex, {

  initialVariables: {
    first: 20,      
    tagId: null,
    order: 'updated_at DESC',  
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        projects(first: $first order: $order tagId: $tagId){
          edges {
            node {
              id
              title
              caption
              description
              source_url
              full_image
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

