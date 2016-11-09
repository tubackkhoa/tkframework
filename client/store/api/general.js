import { fetchJson, fetchJsonWithToken } from './common'


export default {
  getCommits() {
    return fetchJson('/api/general')
  },
  
  putCommit(token, content) {
    return fetchJsonWithToken(token, `/me/books/${bookId}/commitment`, 
      {
        method: 'PUT',
        body: JSON.stringify({ content }),
      })
  },

}