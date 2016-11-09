// we use saga to keep track of changes from server
// state = [{id:}], each component is tracked by id
// when we push new id => new component will be added to Dom
// remove => remove from Dom, otherwise just update the Dom
// if no id is given, React will use Dom diff to check changes

import { fetchJson, fetchJsonWithToken } from 'store/api/common'

// extend api, we use this to make code more readable and easy to co-worker
// we use _ before file to notice users should not import this file directly
// however they can import it for restrict access
import _schedule from './_schedule'
import _audio from './_audio'
import _commit from './_commit'

export default {
  getBooks(token) {    
    return fetchJsonWithToken(token, `/me/books`)
  },

  getBook(token, bookId) {    
    return fetchJsonWithToken(token, `/me/books/${bookId}`)
  },

  addBook(token, code) {    
    return fetchJsonWithToken(token, `/me/books`,
    {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
  },

  getAudio(token, bookId, audioId) {    
    return fetchJsonWithToken(token, `/books/${bookId}/audios/${audioId}`)
  },

  //----------

  setCommit(token, code) {    
    return fetchJsonWithToken(token, `/me/books/${bookId}/commitment`,
    {
      method: 'PUT',
      body: JSON.stringify({ code }),
    })
  },

  setLastRead(token, code) {    
    return fetchJsonWithToken(token, `/me/books/${bookId}/lastRead`,
    {
      method: 'PUT',
      body: JSON.stringify({ code }),
    })
  },

  setProcess(token, code) {    
    return fetchJsonWithToken(token, `/books/${bookId}/audios/${audioId}/progress`,
    {
      method: 'PUT',
      body: JSON.stringify({ code }),
    })
  },


  // extend here
  ..._schedule

}