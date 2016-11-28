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

import ActionVisibility from 'material-ui/svg-icons/action/visibility'
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import IconButton from 'material-ui/IconButton'
import AvAirplay from 'material-ui/svg-icons/av/airplay'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import Pagination from 'ui/backend/components/shared/Pagination'
import inlineStyles from 'ui/shared/styles/MaterialUI'

import { getUsers, getUser, toggleBlockUser } from 'store/actions/user'
import { setToast } from 'store/actions/common'

import * as authSelectors from 'store/selectors/auth'
import * as userSelectors from 'store/selectors/user'


const mapStateToProps = (state) => ({  
  user: userSelectors.getUser(state),
  users: userSelectors.getUsers(state),
  token: authSelectors.getToken(state),
})

@connect(mapStateToProps, { getUser, getUsers, setToast, toggleBlockUser })
export default class UserIndex extends Component {

  componentDidMount() {
    document.title = 'User Management'
    this._handleMovePage(1)
  }

  state = {
    open: false,
  }

  _handleMovePage = (page) => {
    if(page){
      this.page = page
    }    
    this.props.getUsers(this.page)
  }

  _handleToggle = (id) => {
    // allow callback function
    this.props.toggleBlockUser(this.props.token, id, (data)=>{
      this.props.setToast('update user successfully!!!')
      this._handleMovePage()
    }, (error)=> this.props.setToast('update user failed!!!'))
  }

  _handlePreview = (id) => {
    // allow callback function
    this.props.getUser(id, (data)=>{      
      // we have user here, no need to get from store
      this.setState({
        open: true,
      })
    }, (error)=> this.props.setToast('get user failed!!!'))
  }

  renderRow(row) {

    const {id, username, email, registered_at, block} = row

    return (
      <TableRow key={id} style={inlineStyles.row}>        
        <TableRowColumn colSpan="4" style={inlineStyles.rowColumn} >
          {username}
        </TableRowColumn>
        <TableRowColumn colSpan="1" style={inlineStyles.rowColumn} >
          {email}
        </TableRowColumn>
        <TableRowColumn colSpan="2" style={inlineStyles.rowColumn} >
          {registered_at}
        </TableRowColumn>
        <TableRowColumn colSpan="3" style={inlineStyles.rowColumn} >          
          
          <IconButton onClick={e => this._handlePreview(id)}>
            <AvAirplay />
          </IconButton>
                 
          <IconButton onClick={e => this._handleToggle(id)} >
            {block 
              ? <ActionVisibilityOff name="in-visible-icon" />
              : <ActionVisibility name="visible-icon" />
            }
          </IconButton>
        </TableRowColumn>
      </TableRow>
    )
  }

  renderDialog(row) {
    const {id, username, email, phone, registered_at, block, avatar, name} = row
    return (
      <Dialog
        modal={false}
        onRequestClose={e=>this.setState({open: false})}
        open={this.state.open} >
        <Card>
          <CardHeader
            title={email}
            subtitle={name}
            avatar={avatar}
          />          
          <CardTitle title="Phone" subtitle={phone} />
          <CardTitle title="Username" subtitle={username} />
          <CardText>Registered at {registered_at}</CardText>
        </Card>
      </Dialog>
    )
  }

  render() {

    const {users:{rows=[], count=0, offset=0}, user } = this.props     

    return (
      <section>   
        {this.renderDialog(user)}    
        <h1>User</h1>
        <Table fixedHeader fixedFooter>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow selectable={false}>              
              <TableHeaderColumn colSpan="4" style={inlineStyles.headerColumn}>
                Username/token
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="1" style={inlineStyles.headerColumn}>
                Email
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="2" style={inlineStyles.headerColumn}>
                Registered Date
              </TableHeaderColumn>
              <TableHeaderColumn colSpan="3" style={inlineStyles.headerColumn}>
                View/Block
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
