// args to invoke service

export const searchYoutube = (...args) => ({
  type: 'app/searchYoutube',
  args,
})

export const detailYoutube = (...args) => ({
  type: 'app/detailYoutube',
  args,
})

// payload to replace store
export const replaceYoutube = (data) => ({
  type: 'app/replaceYoutube',
  payload: data,
})

export const replaceYoutubes = (data) => ({
  type: 'app/replaceYoutubes',
  payload: data,
})