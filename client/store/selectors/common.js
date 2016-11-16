
export const getToast = (state) =>
  state.ui.toast

export const getRequest = (state, key) =>
  state.requests[key] || {}

export const getRequests = (state) =>
  state.requests

export const areRequestsPending = ({requests}) => 
  Object.keys(requests)
    .some((key) => requests[key].status === 'pending')    

export const getCurrentPathname = (state) => 
  state.routing.locationBeforeTransitions.pathname
