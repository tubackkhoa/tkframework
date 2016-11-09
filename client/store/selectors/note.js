export const getNotes = (state) =>
  state.notes.ids.map((id) => state.notes.byId[id])

export const getNote = (state, id) =>
  state.notes.byId[id] || null

export const getOpenNoteId = (state) =>
  state.ui.openNoteId

export const getToast = (state) =>
  state.ui.toast

export const getRequest = (state, key) =>
  state.requests[key] || {}

export const getRequests = (state) =>
  state.requests

export const areRequestsPending = (requests) => {
  return Object.keys(requests)
    .some((key) => requests[key].status === 'pending')
}
