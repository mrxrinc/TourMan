import { combineReducers } from 'redux'

import userReducer from './pages/userReducer'
import dateReducer from './pages/dateReducer'
import { 
  reportUserReducer,
  homeReducer,
  filterReducer
 } from './pages/generalReducers'

const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  reportUser: reportUserReducer,
  home: homeReducer,
  filter: filterReducer,
})

export default rootReducer
