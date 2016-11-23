import { takeLatest, takeEvery } from 'redux-saga'

import api from 'store/api'

import {     
  createRequestSaga
} from 'store/sagas/common'

import { updateTagSuggestions } from 'store/actions/tag'

const requestGetTagSuggestionsAsync = createRequestSaga({
  request: api.tag.getTagSuggestions,
  key: 'getTagSuggestions',
  success: [   
    (data) => updateTagSuggestions(data),    
  ],
})

// root saga reducer
const asyncTagFetchWatchers = [

  // watcher for schedule, define term here
  function* asyncTagFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield [
      takeEvery('app/getTagSuggestions', requestGetTagSuggestionsAsync),      
    ]
  }
]

export default asyncTagFetchWatchers