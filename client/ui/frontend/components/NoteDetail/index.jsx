import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from 'store/actions/note'
import * as selectors from 'store/selectors/note'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Counter from 'components/Counter'


const NoteDetail = ({ note, closeNote, updateNote, requestDeleteNote, requestUpdateNote, updateNoteRequest, deleteNoteRequest }) => (
  <div className="note-detail-wrapper">
    {!note
      ? <div className="blankslate">No note is open</div>
      : <div className="note">
          <Counter />
          <div className="date">
            {new Date(note.timestamp).toLocaleString()}
          </div>
          
          <TextField
            multiLine={true}
            autoFocus
            key={note.id}            
            onChange={(event) => updateNote(event.target.value, note.id)}
            hintText="New note..."
            rows={1}
            rowsMax={4}
            value={note.content}
          />
          <div className="row">
            <FlatButton
              onClick={() => requestUpdateNote(note.id, note.content)}
              disabled={updateNoteRequest.status === 'pending'}
              className="button"              
              label={updateNoteRequest.status === 'pending'
                ? 'Saving...' : 'Save'}
            />
            <div className="group">
              <FlatButton
                onClick={() => requestDeleteNote(note.id)}
                disabled={deleteNoteRequest.status === 'pending'}
                className="button danger marginLeft"
                secondary={true}
                label={deleteNoteRequest.status === 'pending'
                  ? 'Removing...' : 'Remove'}
              />
              <FlatButton
                onClick={closeNote}
                className="button marginLeft"                
                label="Close"
              />
            </div>
          </div>
        </div>
    }
  </div>
)

NoteDetail.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }),
  updateNote: PropTypes.func.isRequired,
  requestUpdateNote: PropTypes.func.isRequired,
  requestDeleteNote: PropTypes.func.isRequired,
  closeNote: PropTypes.func.isRequired,
  updateNoteRequest: PropTypes.object.isRequired,
  deleteNoteRequest: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const openNoteId = selectors.getOpenNoteId(state)
  return {
    note: selectors.getNote(state, openNoteId),
    updateNoteRequest: selectors.getRequest(state, `updateNote/${openNoteId}`),
    deleteNoteRequest: selectors.getRequest(state, `deleteNote/${openNoteId}`),
  }
}

export default connect(mapStateToProps, actionCreators)(NoteDetail)
