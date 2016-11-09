import { fetchJson } from './common'

export default {
  getBooks() {
    return fetchJson('http://localhost:3000/api/books')      
  },
}