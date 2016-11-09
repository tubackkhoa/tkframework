// _ means extend, other means just divided file into small chunks
export const getBookSchedule = (state) => 
  state.bookReducer.schedules || []