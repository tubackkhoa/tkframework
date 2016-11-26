
export const userReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceUser':
      return { ...state, item: payload } 
    case 'app/replaceUsers':
      return { ...state, items: payload }   
    default:
      return state
  }

}

