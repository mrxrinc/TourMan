import * as types from '../../constants/constants'
import initialState from '../initialState'

export default function userReducer(state = initialState.user, { type, payload, section }) {
  switch (type) {
    case types.USER_REGISTER:
      switch (section) {
        case 'firstName':
          return { ...state, firstName: payload }
        case 'lastName':
          return { ...state, lastName: payload }
        case 'email':
          return { ...state, email: payload }
        case 'password':
          return { ...state, password: payload }
        case 'birthday':
          return { ...state, birthday: payload }
        case 'forget':
          return { ...state, forget: payload }
        default:
          return state
      }
    case types.USER_TO_STORE:
      return { ...state, ...payload }
    default:
      return state
  }
}
