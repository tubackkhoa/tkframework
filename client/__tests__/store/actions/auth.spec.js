import test from 'tape'

import { applyMiddleware, compose } from 'redux'
import configureMockStore from 'redux-mock-store'
import rootReducer from 'store/reducers'
import {saveLoggedUser} from 'store/actions/auth'


const mockStore = configureMockStore(
  rootReducer,  
)


test('update Token', (assert) => {  

  const store = mockStore({})

  store.dispatch(saveLoggedUser({
    user:{
      email: 'test@example.com',
    },
    token: {
      accessToken: 'accessToken'
    }
  }))

  console.log(store.getState())

  assert.end()
})