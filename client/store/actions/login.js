// use best comment like this

// actions trigger sagas, by default, these args will be passed to Api.method
export const loginFacebook = (...args) => ({
  type: 'app/loginFacebook',
  args
})

export const loginGoogle = (...args) => ({
  type: 'app/loginGoogle',
  args
})

export const logout = (...args) => ({
  type: 'app/logout',
  args
})


// actions called by sagas

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 */
export const setAuthState = (newAuthState) => ({
  type: 'app/setAuthState',
  payload: newAuthState, 
})


export const saveFacebookUser = (data) => ({
  type: 'app/saveFacebookUser',
  payload: {
    user: data.user,
    token: data.token,    
  }
})


export const saveGoogleUser = (data) => ({
  type: 'app/saveGoogleUser',
  payload: {
    user: data.user,
    token: data.token,   
  }
})

/**
 * Tells the app we want to log out a user
 */
export const removeLoggedUser = () => ({
  type: 'app/removeLoggedUser',  
})
