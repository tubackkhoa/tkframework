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
  
  /**
  * Logs the current user out
  */
  logout (token) {
    // return fetchJsonWithToken(token, `/logout`)
    return new Promise((resolve, reject)=>resolve(token))
  },

}

export default auth
