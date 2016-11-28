import test from 'tape'

import { applyMiddleware, compose } from 'redux'
import configureMockStore from 'redux-mock-store'
import rootReducer from 'store/reducers'
import {saveLoggedUser} from 'store/actions/auth'


const mockStore = configureMockStore(
  rootReducer,  
)


test('update Tag', (assert) => {  

  const currentTags = ['hello', 'world']
  const newTags = ['the end', 'of', 'world']
  let uniq = [...new Set([...currentTags, ...newTags])]
  console.log(uniq)
  assert.end()
})

