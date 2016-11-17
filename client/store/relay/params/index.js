export const prepareTagParams = (params, { location }) => {
  const tagId = location.query['tag-id'] || null
  return {
    ...params,
    tagId,
  }
}