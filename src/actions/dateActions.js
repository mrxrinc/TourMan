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

export function resetDaysSaveOff() {
  return { type: types.RESET_DAYS_SAVE_OFF }
}

export function homeDays(data) { // calculated off days for each home
  return { 
    type: types.HOME_DAYS,
    payload: data 
  }
}

