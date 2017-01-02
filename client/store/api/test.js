import { fetchJson, fetchJsonWithToken } from './common'

export default {
  updateTest(token, id, item) {
    return fetchJsonWithToken(token, '/api/test/update',
    {
      method: 'POST',
      body: JSON.stringify({ id, item }),
    })      
  },

  getTest(id){
    return fetchJson(`/api/test/index/${id}`)
  },
  
  getTests(page, limit=10){
    return fetchJson(`/api/test?page=${page}&limit=${limit}`)
  },

  deleteTest(token, id){
    return fetchJsonWithToken(token, `/api/test/delete/${id}`,
    {
      method: 'DELETE',
    }) 
  }
}