import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'
import { setToast, forwardTo, invokeCallback } from 'store/actions/common'
import { replaceNewsPost, replaceNewsPosts } from 'store/actions/newspost'


import {     
  createRequestSaga
} from 'store/sagas/common'


const requestGetNewsPostAsync = createRequestSaga({
  request: api.newspost.getNewsPost,
  key: 'getNewsPost',
  success: [   
    (data) => replaceNewsPost(data),    
  ],
})

const requestGetNewsPostsAsync = createRequestSaga({
  request: api.newspost.getNewsPosts,
  key: 'getNewsPosts',
  success: [   
    (data) => replaceNewsPosts(data),    
    // reset to empty for later edit
    (data) => replaceNewsPost({}),
  ],
})

const requestDeleteNewsPostsAsync = createRequestSaga({
  request: api.newspost.deleteNewsPost,
  key: 'deleteNewsPost',
  success: [   
    // you can return other action from callback, such as getPage
    (data, {args:[token, id, callback]}) => invokeCallback(callback, data),
  ],
  failure: [
    (data, {args:[token, id, callback, error]}) => invokeCallback(error, data),
  ]
})

const requestUpdateNewsPostAsync = createRequestSaga({
  request: api.newspost.updateNewsPost,
  key: 'updateNewsPost',
  success: [   
    () => setToast('Update sell post successfully!!!'),     
    ({id}) => forwardTo('/cms/newsposts'),        
  ],
  failure: [
    (error) => setToast(error.message)
  ]
})

// root saga reducer
export default [
  // watcher for schedule, define term here
  function* asyncNewsPostFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/updateNewsPost', requestUpdateNewsPostAsync),      
      takeLatest('app/getNewsPost', requestGetNewsPostAsync),
      takeLatest('app/getNewsPosts', requestGetNewsPostsAsync),
      takeEvery('app/deleteNewsPost', requestDeleteNewsPostsAsync),
    ]
  }
]

