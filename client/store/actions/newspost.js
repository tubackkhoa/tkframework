
export const updateNewsPost = (...args) => ({
  type: 'app/updateNewsPost',
  args,
})


export const getNewsPost = (...args) => ({
  type: 'app/getNewsPost',
  args,
})


export const deleteNewsPost = (...args) => ({
  type: 'app/deleteNewsPost',
  args,
})

// pass page as argument
export const getNewsPosts = (...args) => ({
  type: 'app/getNewsPosts',
  args,
})



export const replaceNewsPost = (data) => ({
  type: 'app/replaceNewsPost',
  // always use sub-key to have better vizualize state
  payload: data,
})

export const replaceNewsPosts = (data) => ({
  type: 'app/replaceNewsPosts',
  // always use sub-key to have better vizualize state
  payload: data,
})