
export const getTagSuggestions = (...args) => ({
  type: 'app/getTagSuggestions',
  args,
})

export const updateTagSuggestions = (payload) => ({
  type: 'app/updateTagSuggestions',
  payload,
})