import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Relay from 'react-relay'
import { Link } from 'react-router'
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

import ActionDelete from 'material-ui/svg-icons/action/delete'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Pagination from 'ui/backend/components/shared/Pagination'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import { getTests, deleteTest } from 'store/actions/test'
import { setToast } from 'store/actions/common'

import * as authSelectors from 'store/selectors/auth'
import * as testSelectors from 'store/selectors/test'


const mapStateToProps = (state) => ({  
  tests: testSelectors.getTests(state),
  token: authSelectors.getToken(state),
})

@connect(mapStateToProps, { getTests, setToast, deleteTest })
export default class TestIndex extends Component {

  componentDidMount() {
    document.title = 'Test Management'
    this._handleMovePage(1)
  }

  _handleMovePage = (page) => {
    if(page){
      this.page = page
    }    
    this.props.getTests(this.page)
  }

  _handleRemove = (id) => {
    // allow callback function
    this.props.deleteTest(this.props.token, id, (data)=>{
      this.props.setToast('delete test successfully!!!')
      this._handleMovePage()
    }, (error)=> this.props.setToast('delete test failed!!!'))
  }

  renderRow(row) {

    const {id, name} = row

    return (
      <TableRow key={id} style={inlineStyles.row}>        
        <TableRowColumn colSpan="4" style={inlineStyles.rowColumn} >
          {name}
        </TableRowColumn>
        <TableRowColumn colSpan="3" style={inlineStyles.rowColumn} >          
          <Link to={`/cms/tests/${id}/edit`}>
            <IconButton disableTouchRipple >
              <EditorModeEdit />
            </IconButton>
          </Link>          
          <IconButton
            name="delete-button"
            onClick={e=>this._handleRemove(id)}
            disableTouchRipple
          >
            <ActionDelete/>
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }

  render() {

    const {tests:{rows=[], count=0, offset=0} } = this.props
    const newButton = (
      <Link to="/cms/tests/new">
        <FloatingActionButton style={inlineStyles.floatButton} disableTouchRipple={true}>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
    )    

    return (
      <section>
       {newButton}
        <h1>Test</h1>
        <Table fixedHeader fixedFooter>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>              
              <TableHeaderColumn colSpan="4" style={inlineStyles.headerColumn}>
                Name
              </TableHeaderColumn>
              
              <TableHeaderColumn colSpan="3" style={inlineStyles.headerColumn}>
                Action
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
           
          {rows.map(row => this.renderRow(row))}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TableRowColumn>                

                <Pagination
                  offset={offset}
                  total={count}
                  limit={10}
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
