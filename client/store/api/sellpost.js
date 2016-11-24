import { fetchJson, fetchJsonWithToken } from './common'

export default {
  updateSellPost(token, id, item) {
    return fetchJsonWithToken(token, '/api/sellpost/update',
    {
      method: 'POST',
      body: JSON.stringify({ id, item }),
    })      
  },

  getSellPost(id){
    return fetchJson(`/api/sellpost/index/${id}`)
  },
  
  getSellPosts(page, limit=10){
    return fetchJson(`/api/sellpost?page=${page}&limit=${limit}`)
  },

  deleteSellPost(token, id){
    return fetchJsonWithToken(token, `/api/sellpost/delete/${id}`,
    {
      method: 'DELETE',
    }) 
  }
}