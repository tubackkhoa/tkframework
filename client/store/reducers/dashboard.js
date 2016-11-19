
// reducer only return a value to update substate via key as reducer
export const dashboardReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceBooks':
      return payload
    default:
      return state
  }
}

