import * as types from '../constants/constants'

export function reportingUser(data) {
  return {
    type: types.USER_REPORT,
    payload: data
  }
}