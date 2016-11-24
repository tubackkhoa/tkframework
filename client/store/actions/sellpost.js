
export const updateSellPost = (...args) => ({
  type: 'app/updateSellPost',
  args,
})


export const getSellPost = (...args) => ({
  type: 'app/getSellPost',
  args,
})


export const deleteSellPost = (...args) => ({
  type: 'app/deleteSellPost',
  args,
})

// pass page as argument
export const getSellPosts = (...args) => ({
  type: 'app/getSellPosts',
  args,
})



export const replaceSellPost = (data) => ({
  type: 'app/replaceSellPost',
  // always use sub-key to have better vizualize state
  payload: data,
})

export const replaceSellPosts = (data) => ({
  type: 'app/replaceSellPosts',
  // always use sub-key to have better vizualize state
  payload: data,
})