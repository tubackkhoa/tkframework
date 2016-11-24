
export const servicePointReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceServicePoint':
      return { ...state, item: payload } 
    case 'app/replaceServicePoints':
      return { ...state, items: payload }   
    default:
      return state
  }

}

