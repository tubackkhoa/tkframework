
export const getResult = (state) =>
  state.youtube.items || []

export const getOpenItem = (state) =>
  state.youtube.openItem || {}