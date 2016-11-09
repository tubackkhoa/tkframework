export const getBooks = (state) => 
  state.bookReducer.books || []

export const getAudio = (state) => 
  state.bookReducer.audio || {cc:[],title:''}

export const getOpenBookId = (state) =>
  getOpenBook(state).bookId

export const getAudioTrack = (state) => 
  state.bookReducer.audioTrack 
  
export const getOpenBook = (state) => 
  state.bookReducer.book || {parts:[]}

export const getAuthor = (state) => 
  getOpenBook(state).author 