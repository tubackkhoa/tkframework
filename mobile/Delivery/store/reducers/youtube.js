
export const youtubeReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceYoutubes':
      return payload      
    case 'app/replaceYoutube':
      return {...state, openItem: payload}  
    default:
      return state
  }

}

