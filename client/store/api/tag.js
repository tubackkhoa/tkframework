import { fetchJson } from './common'

export default {
  getTagSuggestions() {
    return fetchJson('/api/tags')      
  },
}