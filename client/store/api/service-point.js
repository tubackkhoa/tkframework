import { fetchJson, fetchJsonWithToken } from './common'

export default {
  updateServicePoint(token, id, item) {
    return fetchJsonWithToken(token, '/api/servicepoint/update',
    {
      method: 'POST',
      body: JSON.stringify({ id, item }),
    })      
  },

  getServicePoint(id){
    return fetchJson(`/api/servicepoint/index/${id}`)
  },
  
  getServicePoints(page, limit=10){
    return fetchJson(`/api/servicepoint?page=${page}&limit=${limit}`)
  },

  deleteServicePoint(token, id){
    return fetchJsonWithToken(token, `/api/servicepoint/delete/${id}`,
    {
      method: 'DELETE',
    }) 
  }
}