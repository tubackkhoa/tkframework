
export const byId = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/updateNote':
    case 'app/insertNote':
      return { ...state, [payload.id]: payload }
    case 'app/replaceNotes':
      return payload.notes
    case 'app/removeNote':
      let newState = Object.assign({}, state)
      delete newState[payload.id]
      return newState
    default:
      return state
  }
}

// reducer apply on part of state, why map can get whole state
export const ids = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceNotes':
      return payload.ids
    case 'app/insertNote':
      return [ payload.id, ...state ]
    case 'app/removeNote':
      return state.filter(id => id !== payload.id)      
    default:
      return state
  }
}

export const openNoteId = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/openNote':
      return payload.id
    case 'app/closeNote':
      return null
    default:
      return state
  }
}


