import * as types from '../../constants/constants'
import initialState from '../initialState'

export function homeReducer(state = initialState.home, { type, payload }) {
  switch (type) {
    case types.STAGE_HOME:   
      return { ...payload }
      
    case types.RESET_HOME:
      return {}
      
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

export function filterReducer(state = initialState.filter, { type, payload }) {
  switch (type) {
    case types.FILTER_PROVINCE:
      return { ...state, province: payload }

    case types.FILTER_HOWMANY:
      return { ...state, howMany: payload }

    default:
      return state
  }
}
