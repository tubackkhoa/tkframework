import { fetchJson, fetchJsonWithToken } from 'store/api/common'

let auth = {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} token The token of the user  
  */
  loginFacebook (accessToken) {  
    // Post request to server
    return fetchJson(`/oauth/facebook/token?access_token=${accessToken}`, {
      method: 'POST',      
    })
  },

  loginGoogle (accessToken) {  
    // Post request to server
    return fetchJson(`/oauth/google/token?access_token=${accessToken}`, {
      method: 'POST',      
    })
  },

  login (username, password, permanent=false) {
    return fetchJson(`/auth/login?permanent=${permanent}`, {
      method: 'POST',
      body: JSON.stringify({username, password})
    })
  },

  refreshAccessToken (refreshToken) {
    return fetchJson(`/auth/token`, {
      method: 'POST',
      body: JSON.stringify({refreshToken})
    })
  },

  reject (refreshToken) {
    return fetchJson(`/auth/reject`, {
      method: 'POST',
      body: JSON.stringify({refreshToken})
    })
  },
  
  /**
  * Logs the current user out
  */
  logout () {
    // return fetchJsonWithToken(token, `/logout`)
    return fetchJson(`/auth/logout`, {
      method: 'POST',      
    })
  },

}

export default auth
