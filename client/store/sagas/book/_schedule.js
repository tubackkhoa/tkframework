import api from 'store/api'

import {     
  createRequestSaga
} from 'store/sagas/common'

import {   
  log
} from 'store/actions/common'

import { setToast } from 'store/actions/common'
import { replaceSchedule } from 'store/actions/book/schedule'

export const requestGetScheduleAsync = createRequestSaga({
  request: api.book.getSchedule,
  key: 'getSchedule',  // for retrieve from request store
  success: [   
    (data) => replaceSchedule(data),    
  ],
})