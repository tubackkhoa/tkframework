export const generalReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceCommits':
      return payload
    default:
      return state
  }
}

