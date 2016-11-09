import { v4 } from 'uuid'

export const insertNote = (note) => ({
  type: 'app/insertNote',
  payload: note,
})

export const replaceNotes = (notes) => ({
  type: 'app/replaceNotes',
  payload: notes,
})

export const updateNote = (content, id, timestamp = Date.now()) => ({
  type: 'app/updateNote',
  payload: {
    id,
    content,
    timestamp,
  },
})

export const removeNote = (id) => ({
  type: 'app/removeNote',
  payload: { id },
})

export const closeNote = () => ({
  type: 'app/closeNote',
})

export const openNote = (id) => ({
  type: 'app/openNote',
  payload: { id },
})

export const setToast = (message, level = 'info', id = v4() ) => ({
  type: 'app/setToast',
  payload: {
    id,
    message,
    level,
  },
})

export const clearToast = () => ({
  type: 'app/clearToast',
})

export const requestDeleteNote = (...args) => ({    
    type: 'app/requestDeleteNote',
    args    
})

export const requestReadNotes = (...args) => ({    
    type: 'app/requestReadNotes',
    args    
})

export const requestCreateNote = (...args) => ({    
    type: 'app/requestCreateNote',
    args    
})

export const requestUpdateNote = (...args) => ({    
    type: 'app/requestUpdateNote',
    args    
})
