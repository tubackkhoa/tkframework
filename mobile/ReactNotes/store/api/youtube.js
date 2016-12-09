import { fetchJson, fetchJsonWithToken } from './common'

export default {
  
  search(keyword) {
    return fetchJson(`/api/youtube/search?q=${keyword}`)      
  },

  detail(id) {
    return fetchJson(`/api/youtube/index/${id}`)      
  },
  
}