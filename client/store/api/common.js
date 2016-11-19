import 'isomorphic-fetch'

// default api_base for all request
import {  
  API_BASE
} from 'store/constants/api'

export const rejectErrors = (res) => {
  const { status } = res
  if (status >= 200 && status < 300) {
    return res
  }
  return Promise.reject({ message: res.statusText })
}

export const fetchJson = (url, options = {}, base = API_BASE) => (
  // in the same server, API_BASE is emtpy
  /// check convenient way of passing base directly  
  fetch(/^(?:https?)?:\/\//.test(url) ? url : base + url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then(rejectErrors)
  // default return empty json
  .then((res) => res.status === 204 ? {} : res.json())
)

export const fetchJsonWithToken = (token, url, options = {}, ...args) => (
  fetchJson(url, {
    ...options,
    headers: {
      ...options.header,
      Authorization: token
    }
  }, ...args)
)