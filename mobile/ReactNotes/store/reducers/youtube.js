
export const youtubeReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceYoutube':
      return payload      
    default:
      return state
  }

}

