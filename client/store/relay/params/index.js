import * as authSelectors from 'store/selectors/auth'

export const prepareTagParams = (params, { location }) => {
  const tagId = location.query['tag-id'] || null
  return {
    ...params,
    tagId,
  }
}

// do not pass current state, must pass store to always get the latest state
export const prepareAuthorParams = store => params => ({
  ...params,
  userId: authSelectors.getUser(store.getState()).id,
})


  