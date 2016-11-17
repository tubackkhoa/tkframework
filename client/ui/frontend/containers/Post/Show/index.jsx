import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'
import Tags from 'ui/frontend/components/Post/Show/Tags'
import Item from 'ui/frontend/components/Post/Show/Item'
import Pagination from 'ui/frontend/components/Post/Show/Pagination'
import ActionSchedule from 'material-ui/svg-icons/action/schedule'
import inlineStyles from 'ui/shared/styles/MaterialUI/index'


const cmsRegexp = /^(\/cms)*/

class PostShow extends Component {
  
  componentDidMount() {
    document.title = this.props.viewer.detailPost.node.title
  }

  get adminPath() {
    const paths = location.pathname.match(cmsRegexp)
    return paths[0] ? paths[0] : ''
  }

  render() {
    const {node, next, prev} = this.props.viewer.detailPost

    return (node &&
      <section>        
        <div >
          <h1 >{node.title} </h1>
          <div >
            <ActionSchedule color={inlineStyles.iconColor} style={inlineStyles.dateTimeLogo} />
            <span >{node.published_at}</span>
          </div>
        </div>
        {node.items.map((item) => <Item key={item.id} item={item} />)}
        <Tags adminPath={this.adminPath} tags={node.tags} />
        {(next || prev) &&
          <Pagination
            adminPath={this.adminPath}
            prev={prev}
            next={next}
          />
        }
      </section>
    )
  }
}

// seperate code, but should not share between containers
const nodeFragment = Relay.QL`
  fragment CurrentPost on Post {  
    title          
    lead_sentence
    published_at
    tags {
      id
      name
    }
    items {
      id
      target_type
      text {
        id
        description
      }
      image {
        id
        full_src
        caption
      }
      twitter {
        id
        twitter_id
      }
    }
  }    
`

export default Relay.createContainer(PostShow, {
  initialVariables: {
    id: null,      
  },

  fragments: {

    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        detailPost(id:$id) {
          node {
            ${nodeFragment}
          }
          next {
            id
            title
          }
          prev {
            id
            title
          }
        } 
      }      
    `
  },
})


