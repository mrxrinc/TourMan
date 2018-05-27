import * as types from '../constants/constants'

export function reportingUser(data) {
  return {
    type: types.USER_REPORT,
    payload: data
  }
}

export function stageHome(data) {
  return {
    type: types.STAGE_HOME,
    payload: data
  }
}

export function resetHome() {
  return {
    type: types.RESET_HOME
  }
}

export function filterProvince(data) {
  return {
    type: types.FILTER_PROVINCE,
    payload: data
  }
}
export function filterHowMany(data) {
  return {
    type: types.FILTER_HOWMANY,
    payload: data
  }
}
