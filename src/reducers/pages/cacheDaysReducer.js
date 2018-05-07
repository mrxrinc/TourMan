import * as types from '../../constants/constants'
import initialState from '../initialState'
// import configureStore from '../../store/configureStore'
//
// const store = configureStore()
export default function dateReducer(state = initialState.cacheDays, action) {
  switch (action.type) {
    case types.CACHE_DAYS:
      // const date = store.getState()
      // console.log('DATE FROM CACHEDAYS =->', state)
      if (state.length === 2) {
        return [action.payload]
      }
      return [...state, action.payload]
    default:
      return state
  }
}

// DELETE THIS FILE
