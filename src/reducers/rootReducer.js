import { combineReducers } from 'redux'

import userReducer from './pages/userReducer'
import dateReducer from './pages/dateReducer'
import { 
  reportUserReducer,
  homeReducer,
  filtersReducer,
  reviewsReducer,
  homesListReducer,
  luxuryReducer,
  addHomeReducer,
  addHomeStepsReducer,
  reserveReducer,
  exploreReducer
 } from './pages/generalReducers'

const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  reportUser: reportUserReducer,
  home: homeReducer,
  luxury: luxuryReducer,
  reviews: reviewsReducer,
  filters: filtersReducer,
  filteredHomesList: homesListReducer,
  addHomeState: addHomeReducer,
  addHomeSteps: addHomeStepsReducer,
  reserve: reserveReducer,
  explore: exploreReducer
})

export default rootReducer
