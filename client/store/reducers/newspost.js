
export const newspostReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceNewsPost':
      return { ...state, item: payload } 
    case 'app/replaceNewsPosts':
      return { ...state, items: payload }   
    default:
      return state
  }

}

