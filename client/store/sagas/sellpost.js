import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'
import { setToast, forwardTo } from 'store/actions/common'
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
  ],
})

const requestUpdateSellPostAsync = createRequestSaga({
  request: api.sellpost.updateSellPost,
  key: 'updateSellPost',
  success: [   
    () => setToast('Update sell post successfully!!!'), 
    ({id}) => forwardTo('/cms/sellposts'),    
  ],
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
    ]
  }
]

