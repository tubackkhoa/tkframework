import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'
import { setToast, forwardTo, invokeCallback } from 'store/actions/common'
import { replaceSellPost, replaceSellPosts } from 'store/actions/sellpost'


import {     
  createRequestSaga
} from 'store/sagas/common'


const requestGetSellPostAsync = createRequestSaga({
  request: api.sellpost.getSellPost,
  key: 'getSellPost',
  success: [   
    (data) => replaceSellPost(data),    
  ],
})

const requestGetSellPostsAsync = createRequestSaga({
  request: api.sellpost.getSellPosts,
  key: 'getSellPosts',
  success: [   
    (data) => replaceSellPosts(data),    
    // reset to empty for later edit
    (data) => replaceSellPost({}),
  ],
})

const requestDeleteSellPostsAsync = createRequestSaga({
  request: api.sellpost.deleteSellPost,
  key: 'deleteSellPost',
  success: [   
    // you can return other action from callback, such as getPage
    (data, {args:[token, id, callback]}) => invokeCallback(callback, data),
  ],
  failure: [
    (data, {args:[token, id, callback, error]}) => invokeCallback(error, data),
  ]
})

const requestUpdateSellPostAsync = createRequestSaga({
  request: api.sellpost.updateSellPost,
  key: 'updateSellPost',
  success: [   
    () => setToast('Update sell post successfully!!!'),     
    ({id}) => forwardTo('/cms/sellposts'),        
  ],
  failure: [
    (error) => setToast(error.message)
  ]
})

// root saga reducer
export default [
  // watcher for schedule, define term here
  function* asyncSellPostFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/updateSellPost', requestUpdateSellPostAsync),      
      takeLatest('app/getSellPost', requestGetSellPostAsync),
      takeLatest('app/getSellPosts', requestGetSellPostsAsync),
      takeEvery('app/deleteSellPost', requestDeleteSellPostsAsync),
    ]
  }
]

