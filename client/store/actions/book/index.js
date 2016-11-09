
// trigger saga
export const getAudio = (...args) => ({
  type: 'app/getAudio',
  args
})

export const getBooks = (...args) => ({
  type: 'app/getBooks',
  args
})

export const getBook = (...args) => ({
  type: 'app/getBook',
  args
})

export const cancelGetBooks = (reason) => ({
  type: 'app/cancelGetBooks',
  reason
})

export const addBook = (...args) => ({
  type: 'app/addBook',
  args
})

// local update
export const openBook = (id) => ({
  type: 'app/openBook',
  payload: { id },
})

export const saveAudioTrack = (id, time) => ({
  type: 'app/saveAudioTrack',
  payload: { id, time }
})

// these are actions that triggered by sagas

// update store, mean we need to replace audio from api result
// do we need to check data.code ?
export const replaceAudio = (data) => ({
  type: 'app/replaceAudio',
  // always use sub-key to have better vizualize state
  payload: {
    audio: data.audio
  }
})

export const replaceBooks = (data) => ({
  type: 'app/replaceBooks',
  payload: {
    books: data.books
  }
})

export const replaceBook = (data) => ({
  type: 'app/replaceBook',
  payload: {
    book: data.book
  }
})

