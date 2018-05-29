import * as types from '../../constants/constants'
import initialState from '../initialState'

export function homeReducer(state = initialState.home, { type, payload }) {
  switch (type) {
    case types.STAGE_HOME:   
      return payload
      
    default:
      return state
  }
}

export function reportUserReducer(state = initialState.reportUser, { type, payload }) {
  switch (type) {
    case types.USER_REPORT:
      return { ...state, ...payload }
       
    default:
      return state
  }
}

export function reviewsReducer(state = initialState.reviews, { type, payload }) {
  switch (type) {
    case types.STORE_REVIEWS:
      return payload

    case types.ADD_REVIEW: {
      const data = state.map(item => item)
      data.unshift(payload)
      return data
    }
 
    default:
      return state
  }
}

export function filtersReducer(state = initialState.filters, { type, payload }) {
  switch (type) {
    case types.FILTER_GENERAL_FILTERS:
      if (payload === null) { // reset filters
        return initialState.filters
      }
      return { ...state, ...payload }

    default:
      return state
  }
}

export function homesListReducer(state = initialState.filteredHomesList, { type, payload }) {
  switch (type) {
    case types.HOMES_LIST:
      return payload

    default:
      return state
  }
}

export function luxuryReducer(state = initialState.luxury, { type, payload }) {
  switch (type) {
    case types.LUXURY_LIST:    
      return payload

    default:
      return state
  }
}
