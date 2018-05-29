import { combineReducers } from 'redux'

import userReducer from './pages/userReducer'
import dateReducer from './pages/dateReducer'
import { 
  reportUserReducer,
  homeReducer,
  filtersReducer,
  reviewsReducer,
  homesListReducer,
  luxuryReducer
 } from './pages/generalReducers'

const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  reportUser: reportUserReducer,
  home: homeReducer,
  luxury: luxuryReducer,
  reviews: reviewsReducer,
  filters: filtersReducer,
  filteredHomesList: homesListReducer
})

export default rootReducer
