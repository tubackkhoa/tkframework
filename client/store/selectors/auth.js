
export const isLogged = state =>
  state.authReducer.loggedIn

export const getToken = state => 
  state.authReducer.token 

export const getUser = state => 
  state.authReducer.user 

