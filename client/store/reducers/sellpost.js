
export const sellpostReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceSellPost':
      return { ...state, post: payload } 
    case 'app/replaceSellPosts':
      return { ...state, posts: payload }   
    default:
      return state
  }

}

