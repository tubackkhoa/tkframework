import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Relay from 'react-relay'
import { Link } from 'react-router'
import Item from 'ui/backend/components/Post/Indexes/Item'
import NoContent from 'ui/shared/components/NoContent'
import {
  Table,
  TableHeaderColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Pagination from 'ui/backend/components/shared/Pagination'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import { setToast } from 'store/actions/common'

import ToggleAcceptanceMuatation from 'store/relay/mutations/post/ToggleAcceptanceMuatation'

@connect(null, { setToast })
class PostIndex extends Component {

  componentDidMount() {
    document.title = 'Post Management'
  }

  _handleToggle = (sortRank, postId) => {    
    
    this.props.relay.commitUpdate(
      new ToggleAcceptanceMuatation({
        id: postId, 
        viewer: this.props.viewer,
        posts: this.props.viewer.posts,
      }),
      {
        onSuccess:() => this.props.setToast('Update post successfully!!!'),
        // trigger redux-form validation
        onFailure:(trans) => this.props.setToast(trans.getError()), 
      }
    )
  }

  _handleMovePage = (page) => {
    const {relay} = this.props
    // like move next and back, by default we have injected relay to request state
    const offset = (page - 1) * relay.variables.first
    relay.setVariables({
        offset,
    })
  }

  render() {

    const {viewer:{posts:{edges, pageInfo, totalCount}}, relay} = this.props
    const newButton = (
      <Link to="/cms/posts/new">
        <FloatingActionButton style={inlineStyles.floatButton} disableTouchRipple={true}>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
    )

    // guard code is easier to read than switch code
    if (!edges.length) {
      return (
        <section>
          {newButton}
          <NoContent pageName="posts" />
        </section>
      )
    }

    return (
      <section>
       {newButton}
        <h1>Post</h1>
        <Table fixedHeader fixedFooter>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>              
              <TableHeaderColumn colSpan="4" style={inlineStyles.headerColumn}>
                Title
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>
                Status
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>
                Date
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={inlineStyles.headerColumn}>
                Action
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {edges.map(({node}, index) => (
              <Item
                {...node}
                key={node.id}
                sortRank={index}
                handleToggle={this._handleToggle}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>                

                <Pagination
                  offset={relay.variables.offset}
                  total={totalCount}
                  limit={relay.variables.first}
                  handlePageClick={this._handleMovePage}
                />
              
              </TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    )
  }
}

export default Relay.createContainer(PostIndex, {

  initialVariables: {
    first: 10,      
    offset: 0,
    order: 'published_at DESC',  
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        ${ToggleAcceptanceMuatation.getFragment('viewer')}
        posts(first: $first order: $order offset: $offset){
          totalCount,          
          edges {
            node {
              id
              title
              accepted
              lead_sentence
              published_at
            }
          }
          pageInfo {
            hasNextPage           
          }
          ${ToggleAcceptanceMuatation.getFragment('posts')}
        }        
      }
    `
  },
})
