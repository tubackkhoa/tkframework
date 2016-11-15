import React from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/note'
import * as selectors from '../../store/selectors/note'

import RaisedButton from 'material-ui/RaisedButton'


const NotesList = ({ notes, openNoteId, openNote, requestCreateNote, createNoteRequest } ) => (
  <div className="node-list-wrapper">

    <RaisedButton className="addNoteButton btnFullWidth"       
      onClick={ requestCreateNote } secondary={true}
      disabled={ createNoteRequest.status === 'pending' }
      label={ createNoteRequest.status === 'pending'
        ? 'Adding Note...' : 'Add Note'}
    />
    {(notes.length === 0)
      ? <div className="blankslate">No notes</div>
      : notes.map((note) => (
          <RaisedButton 
            key={note.id}
            className={(note.id === openNoteId)
              ? "btnFullWidth note selected"
              : "btnFullWidth note"
            }
            onClick={() => openNote(note.id)}            
            label={ note.content === ''
              ? <span className="newNoteLabel">New note...</span>
              : note.content
            }
          />
      ))
    }
  </div>
)

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string.isRequired,
  })).isRequired,
  openNoteId: PropTypes.string,
  openNote: PropTypes.func.isRequired,
  requestCreateNote: PropTypes.func.isRequired,
  createNoteRequest: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  notes: selectors.getNotes(state),
  openNoteId: selectors.getOpenNoteId(state),
  createNoteRequest: selectors.getRequest(state, 'createNote'),
})

export default connect(mapStateToProps, actionCreators)(NotesList)
