
export const youtubeReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceYoutubes':
      return payload      
    case 'app/replaceYoutube':
      return {...state, openItem: payload.items[0]}  
    default:
      return state
  }

}

