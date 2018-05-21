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
        case 'location':
          return { ...state, location: payload }
        case 'sex':
          return { ...state, sex: payload }
        case 'languages': {
          const newLangs = payload.map(item => item)
          return { ...state, languages: newLangs }
        }
        default:
          return state
      }

    case types.USER_TO_STORE:
      return { ...state, ...payload }

    case types.USER_RESET:
      return {
        user: {}
      }

    default:
      return state
  }
}
