import { fetchJson, fetchJsonWithToken } from './common'

export default {
  updateNewsPost(token, id, item) {
    return fetchJsonWithToken(token, '/api/newspost/update',
    {
      method: 'POST',
      body: JSON.stringify({ id, item }),
    })      
  },

  getNewsPost(id){
    return fetchJson(`/api/newspost/index/${id}`)
  },
  
  getNewsPosts(page, limit=10){
    return fetchJson(`/api/newspost?page=${page}&limit=${limit}`)
  },

  deleteNewsPost(token, id){
    return fetchJsonWithToken(token, `/api/newspost/delete/${id}`,
    {
      method: 'DELETE',
    }) 
  }
}