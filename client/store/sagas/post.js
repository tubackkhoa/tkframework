import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'
import { setToast, forwardTo } from 'store/actions/common'

import {     
  createRequestSaga
} from 'store/sagas/common'

const requestCreatePostAsync = createRequestSaga({
  request: api.post.createPost,
  key: 'createPost',
  success: [   
    () => setToast('Created post successfully!!!'), 
    ({id}) => forwardTo(`/cms/posts/${id}/edit`),    
  ],
})

// root saga reducer
const asyncPostFetchWatchers = [

  // watcher for schedule, define term here
  function* asyncPostFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/createPost', requestCreatePostAsync),      
    ]
  }
]

export default asyncPostFetchWatchers