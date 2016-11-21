
export const tagSuggestionsReducer = (state = [], {type, payload}) => {
  switch (type) {   
    case 'app/updateTagSuggestions':    
      return payload 
        ? [...new Set([...state, ...payload])]
        : state
    default:
      return state
  }
}