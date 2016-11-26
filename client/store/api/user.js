import { fetchJson, fetchJsonWithToken } from './common'

export default {
  toggleBlockUser(token, id) {
    return fetchJsonWithToken(token, `/api/user/block/${id}`,
    {
      method: 'PUT',
    })      
  },

  getUser(id){
    return fetchJson(`/api/user/index/${id}`)
  },
  
  getUsers(page, limit=10){
    return fetchJson(`/api/user?page=${page}&limit=${limit}`)
  },  
}