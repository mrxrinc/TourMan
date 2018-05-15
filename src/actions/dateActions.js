import * as types from '../constants/constants'

export function selectDay(data) {
  return {
    type: types.ACTIVE_DAY,
    payload: data
  }
}

export function initializeDays() {
  return { type: types.INITIALIZE_DAYS }
}
export function loadDays() {
  return { type: types.LOAD_DAYS }
}
export function resetDays() {
  return { type: types.RESET_DAYS }
}

