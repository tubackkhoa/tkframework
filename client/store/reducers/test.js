
export const testReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceTest':
      return { ...state, item: payload } 
    case 'app/replaceTests':
      return { ...state, items: payload }   
    default:
      return state
  }

}

