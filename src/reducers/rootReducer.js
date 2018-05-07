import { combineReducers } from 'redux'

import user from './pages/userReducer'
import dateReducer from './pages/dateReducer'
// import cacheDays from './pages/cacheDaysReducer'

const rootReducer = combineReducers({
  user,
  date: dateReducer,
  // cacheDays
})

export default rootReducer
