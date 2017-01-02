
export const updateTest = (...args) => ({
  type: 'app/updateTest',
  args,
})


export const getTest = (...args) => ({
  type: 'app/getTest',
  args,
})


export const deleteTest = (...args) => ({
  type: 'app/deleteTest',
  args,
})

// pass page as argument
export const getTests = (...args) => ({
  type: 'app/getTests',
  args,
})


// return by saga
export const replaceTest = (data) => ({
  type: 'app/replaceTest',
  // always use sub-key to have better vizualize state
  payload: data,
})

export const replaceTests = (data) => ({
  type: 'app/replaceTests',
  // always use sub-key to have better vizualize state
  payload: data,
})