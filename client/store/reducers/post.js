
export const postReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'app/replaceCurrentPost':
      // override attribute from payload to update current post
      // because we convert from relay to redux, so we should remove some extra fields
      // const { __dataID__, __fragments__, ...post } = payload
      return { ...state, ...payload }   
    default:
      return state
  }

}

