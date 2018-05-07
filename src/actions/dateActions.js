import * as types from '../constants/constants'
// import configureStore from '../store/configureStore'
//
// const store = configureStore()

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

// export function cacheingDays(data) {
//   return {
//     type: types.CACHE_DAYS,
//     payload: data
//   }
// }

// export function selectDay(dateID) {
//   return (dispatch, getState) => {
//     dispatch(activeDay(dateID))
//     // console.log('STATE AFTER DISPATCH = ', getState())
//   }
// }
