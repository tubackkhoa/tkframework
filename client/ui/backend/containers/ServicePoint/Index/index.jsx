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

import { getServicePoints, deleteServicePoint } from 'store/actions/service-point'
import { setToast } from 'store/actions/common'

import * as authSelectors from 'store/selectors/auth'
import * as servicePointSelectors from 'store/selectors/service-point'


const mapStateToProps = (state) => ({  
  servicePoints: servicePointSelectors.getServicePoints(state),
  token: authSelectors.getToken(state),
})

@connect(mapStateToProps, { getServicePoints, setToast, deleteServicePoint })
export default class ServicePointIndex extends Component {

  componentDidMount() {
    document.title = 'ServicePoint Management'
    this._handleMovePage(1)
  }

  _handleMovePage = (page) => {
    if(page){
      this.page = page
    }    
    this.props.getServicePoints(this.page)
  }

  _handleRemove = (id) => {
    // allow callback function
    this.props.deleteServicePoint(this.props.token.accessToken, id, (data)=>{
      this.props.setToast('delete servicePoint successfully!!!')
      this._handleMovePage()
    }, (error)=> this.props.setToast('delete servicePoint failed!!!'))
  }

  renderRow(row) {

    const {id, name, phone, updated_at} = row

    return (
      <TableRow key={id} style={inlineStyles.row}>        
        <TableRowColumn colSpan="4" style={inlineStyles.rowColumn} >
          {name}
        </TableRowColumn>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
          {phone}
        </TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
          {updated_at}
        </TableRowColumn>
        <TableRowColumn colSpan="3" style={inlineStyles.rowColumn} >          
          <Link to={`/cms/servicepoints/${id}/edit`}>
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

    const {servicePoints:{rows=[], count=0, offset=0} } = this.props
    const newButton = (
      <Link to="/cms/servicepoints/new">
        <FloatingActionButton style={inlineStyles.floatButton} disableTouchRipple={true}>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
    )    

    return (
      <section>
       {newButton}
        <h1>Service Point</h1>
        <Table fixedHeader fixedFooter>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>              
              <TableHeaderColumn colSpan="4" style={inlineStyles.headerColumn}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>
                Phone
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
