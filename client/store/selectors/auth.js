
export const isLogged = state =>
  state.auth.loggedIn

export const getToken = state => 
  state.auth.token

export const getUser = state => 
  state.auth.user || {}
  
