import { normalize, Schema, arrayOf } from 'normalizr'
import { fetchJson } from './common'

// each part of api defined some functions here
const notes = new Schema('notes')

export default {

  readList() {
    return fetchJson('/api/notes')
      .then((data) => {
        const normalized = normalize(data, arrayOf(notes))
        return {
          notes: normalized.entities.notes || {},
          ids: normalized.result,
        }
      })
  },

  create() {
    return fetchJson(
      '/api/notes',
      {
        method: 'POST',
      }
    )
  },

  update(id, content) {
    return fetchJson(
      `/api/notes/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ content }),
      }
    )
  },

  delete(id) {
    return fetchJson(
      `/api/notes/${id}`,
      {
        method: 'DELETE',
      }
    )
  },
}