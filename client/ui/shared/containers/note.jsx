import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import NotesList from 'components/NotesList'
import NoteDetail from 'components/NoteDetail'
import Toasts from 'components/Toasts'
import Nav from 'components/Nav'
import * as selectors from '../../store/selectors/note'
import * as actionCreators from '../../store/actions/note'

class NoteApp extends Component {
  componentWillMount() {    
    this.props.requestReadNotes()
  }

  render() {
    const { readNotesRequest } = this.props

    switch (readNotesRequest.status) {
      case 'success':
        return (
          <div className="note-wrapper">
            <Nav />
            <Toasts />
            <div className="row">
              <NotesList />
              <NoteDetail />
            </div>
          </div>
        )
      case 'failure':
        return (
          <div className="notice">
            {(readNotesRequest.error.message === 'Failed to fetch')
              ? 'No connection, try again later!'
              : 'Hmm... Something didn\'t go as planned.'
            }
          </div>
        )
      default:
        return (
            <div className="notice">
              Loading...
            </div>
        )
    }
  }
}

NoteApp.propTypes = {
  requestReadNotes: PropTypes.func.isRequired,
  readNotesRequest: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  readNotesRequest: selectors.getRequest(state, 'readNotes'),
})

export default connect(mapStateToProps, actionCreators)(NoteApp)
