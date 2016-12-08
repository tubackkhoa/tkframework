// args to invoke service

export const searchYoutube = (...args) => ({
  type: 'app/searchYoutube',
  args,
})

// payload to replace store
export const replaceYoutube = (data) => ({
  type: 'app/replaceYoutube',
  payload: data,
})