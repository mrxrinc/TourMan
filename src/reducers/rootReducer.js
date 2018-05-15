import { combineReducers } from 'redux'

import userReducer from './pages/userReducer'
import dateReducer from './pages/dateReducer'

const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer
})

export default rootReducer
