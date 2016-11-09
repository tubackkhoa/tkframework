
// reducer only return a value to update substate via key as reducer
const dashboardReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'app/replaceBooks':
      return payload
    default:
      return state
  }
}

export default dashboardReducer