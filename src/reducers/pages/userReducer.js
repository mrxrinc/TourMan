import * as types from '../../constants/constants'
import initialState from '../initialState'

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.USER_LOCAL_CHECK:
      return {
        ...state,
        // user: [],
        loading: true
      }
    case types.USER_LOCAL_CHECK_FOUNDED:
      return {
        ...state,
        loading: false,
        user: { name: action.data }
      }
    case types.USER_LOCAL_CHECK_NOT_FOUNDED:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}
