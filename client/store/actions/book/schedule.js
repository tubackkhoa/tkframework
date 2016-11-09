// this file is seperated from book but still using the same reducer
// divided into smaller files help cleaner code

// trigger saga
export const getSchedule = (...args) => ({
  type: 'app/getSchedule',
  args
})

// update store, mean we need to replace audio from api result
// do we need to check data.code ?
export const replaceSchedule = (data) => ({
  type: 'app/replaceSchedule',
  // always use sub-key to have better vizualize state
  payload: {    
    schedules: data.schedules,
  }
})

