import * as types from '../../constants/constants'
import initialState from '../initialState'

export function reportUserReducer(state = initialState.reportUser, { type, payload }) {
  switch (type) {
    case types.USER_REPORT:
      return { ...state, ...payload }
       
    default:
      return state
  }
}
