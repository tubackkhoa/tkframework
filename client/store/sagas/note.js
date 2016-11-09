
import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'

import {   
  noop
} from 'store/actions/common'

import {     
  createRequestSaga
} from 'store/sagas/common'

import { 
  replaceNotes, 
  openNote,
  insertNote, 
  updateNote, 
  removeNote,
  setToast 
} from 'store/actions/note'



const requestReadNotesAsync = createRequestSaga({
  request: api.notes.readList,
  key: 'readNotes',
  success: [ 
    replaceNotes, 
    (notes) => (notes.ids.length > 0) 
      ? openNote(notes.ids[0]) 
      : noop('No note to open') 
  ],
})

const requestCreateNoteAsync = createRequestSaga({
  request: api.notes.create,
  key: 'createNote',
  success: [ 
    insertNote, 
    (note) => openNote(note.id), 
    () => setToast('Note created') 
  ],
  failure: [ 
    () => setToast('Couldn\'t add note', 'warn') 
  ],
})

const requestUpdateNoteAsync = createRequestSaga({
  request: api.notes.update,
  key: (id) => `updateNote/${id}`,
  success: [ 
    updateNote, 
    () => setToast('Note saved') 
  ],
  failure: [ 
    () => setToast('Couldn\'t save note', 'warn') 
  ],
})

const requestDeleteNoteAsync = createRequestSaga({
  request: api.notes.delete,
  key: (id) => `deleteNote/${id}`,
  success: [ 
    (note) => removeNote(note.id), 
    () => setToast('Note deleted') 
  ],
  failure: [ 
    () => setToast('Couldn\'t remove note', 'warn') 
  ],
})

// root saga reducer
const asyncNoteFetchWatchers = [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  function* asyncNoteFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/requestReadNotes', requestReadNotesAsync),
      takeEvery('app/requestCreateNote', requestCreateNoteAsync),
      takeEvery('app/requestUpdateNote', requestUpdateNoteAsync),
      takeEvery('app/requestDeleteNote', requestDeleteNoteAsync)
    ]
  }
]

export default asyncNoteFetchWatchers

