import { fetchJson, fetchJsonWithToken } from './common'

export default {
  createPost(token, post) {
    return fetchJsonWithToken(token, '/api/post/create',
    {
      method: 'POST',
      body: JSON.stringify({ post }),
    })      
  },
  
}