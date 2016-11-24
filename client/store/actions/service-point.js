
export const updateServicePoint = (...args) => ({
  type: 'app/updateServicePoint',
  args,
})


export const getServicePoint = (...args) => ({
  type: 'app/getServicePoint',
  args,
})


export const deleteServicePoint = (...args) => ({
  type: 'app/deleteServicePoint',
  args,
})

// pass page as argument
export const getServicePoints = (...args) => ({
  type: 'app/getServicePoints',
  args,
})



export const replaceServicePoint = (data) => ({
  type: 'app/replaceServicePoint',
  // always use sub-key to have better vizualize state
  payload: data,
})

export const replaceServicePoints = (data) => ({
  type: 'app/replaceServicePoints',
  // always use sub-key to have better vizualize state
  payload: data,
})