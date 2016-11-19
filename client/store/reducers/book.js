import {REHYDRATE} from 'redux-persist/constants'

// should divided into children reducers if we have more types to reduce
// we do not merge all keys into single book entry
const initialState = {  
  audioTrack: {},
}

export const bookReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'app/replaceAudio':
      // do nothing with state, 
      // later we will need to process them, may be include some outside functions
      return { ...state, audio: payload.audio }

    case 'app/replaceBook':      
      return { ...state, book: payload.book }      

    case 'app/replaceBooks':    
      return { ...state, books: payload.books }

    case 'app/saveAudioTrack':    
      return { ...state, audioTrack: { ...state.audioTrack, [payload.id]: payload.time } }

    case 'app/replaceSchedule':    
      return { ...state, schedules: payload.schedules }               

    case REHYDRATE:      
      const incoming = payload.bookReducer      
      if (incoming) {
        console.log('Updated bookReducer for only key audioTrack!!!')
        // even return the whole payload, redux still does not update the left parts
        // and transform help to convert between two sides
        return {...state, audioTrack: incoming.audioTrack}
      }
      return state

    default:
      return state
  }

}

