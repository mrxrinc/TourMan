import * as types from '../../constants/constants'
import initialState from '../initialState'

export default function dateReducer(state = initialState.date, { type, payload }) {
  switch (type) {
    case types.INITIALIZE_DAYS: {
      return { ...state, days: state.loadedDate }
    }
    case types.LOAD_DAYS: {
      return { ...state }
    }
    case types.ACTIVE_DAY: {
      const res = payload.split('_')
      const monthID = parseInt(res[0], 10)
      const dayID = parseInt(res[1], 10)
      let date = state.days
      let caches = state.cacheDays
      let startDate = state.startDate
      let monthName
      state.days.map((month, key) => {
        if (key === monthID) monthName = month.name // global month name available
      })
      if (caches.length === 0) {
        let isOffDay = false
        date = state.days.map((item, key) => {
          if (key === monthID) {
            const days = item.days.map(day => {
              if (day.value === dayID && day.off === false) {
                const start = state.cacheDays.length === 0
                const end = state.cacheDays.length === 1
                return { ...day, active: !day.active, start, end } // modified day
              } else if (day.value === dayID && day.off === true) {
                isOffDay = true
              }
              return day // all other days
            })
            return { ...item, days } // modified month (days inside it actually)
          }
          return item // all other monthes
        })
        if (isOffDay === true) { // this will reset everything to its default
          caches = []
          date = state.days
          startDate = state.startDate
        } else { // here both date and caches will be updated
          caches = [[monthID, dayID]]
          startDate = [dayID, monthName]
        }
        return {
          ...state,
          days: date,
          cacheDays: caches,
          startDate
         } // this is needed here for caches update
      } else if (caches.length === 2) {
        return resetDays(state)
      } else if (caches.length === 1) {
        const startDay = [caches[0][0], caches[0][1]]
        const endDay = [monthID, dayID]
        if (endDay[0] === startDay[0] && endDay[1] > startDay[1]) { // both in same month
          date = state.days.map((month, monthKey) => {
            let days = month.days // defining the initial days in case range be empty
            if (startDay[0] <= monthKey && endDay[0] >= monthKey) {
              days = month.days.map(day => {
                if (startDay[1] < day.value && day.value < endDay[1]) {
                  return { ...day, active: true }
                }
                if (day.value === endDay[1]) {
                  return { ...day, active: true, end: true }
                }
                return day
              })
              return { ...month, days } // if days are in range
            }
            return { ...month, days } // return all the other days out of range
          })
        } else if (endDay[0] > startDay[0]) { // selecting from different monthes
          date = state.days.map((month, monthKey) => {
            let days = month.days
            let rangeDays = month
            if (monthKey === startDay[0]) { // calculate the first month days
              days = month.days.map(day => {
                if (day.value > startDay[1]) {
                  return { ...day, active: true }
                }
                return day // all other days
              })
              rangeDays = { ...month, activeEndEmptyBoxes: true, days } // if days are in range
            }
            if (monthKey > startDay[0] && monthKey < endDay[0]) {
              // activate the days of monthes in between
              days = month.days.map(day => ({ ...day, active: true }))
              rangeDays = {
                ...rangeDays,
                activeBeginEmptyBoxes: true,
                activeEndEmptyBoxes: true,
                days }
            }
            if (monthKey === endDay[0]) { // calculate the last month days
              days = month.days.map(day => {
                if (day.value < endDay[1]) {
                  return { ...day, active: true }
                }
                if (day.value === endDay[1]) {
                  return { ...day, active: true, end: true }
                }
                return day // all other days
              })
              rangeDays = {
                ...rangeDays,
                activeBeginEmptyBoxes: true,
                days
              } // if days are in range
            }
            return { ...rangeDays, days } // return all the other days out of range
          })
        } else { // if end day is before start day
          return resetDays(state)
        }
      }

      caches = [...caches, [monthID, dayID]] // this is as else statment
      return { ...state, days: date, cacheDays: caches, endDate: [dayID, monthName] }
    }
    case types.HOME_DAYS: {
      return { ...state, days: payload }
    }
    case types.RESET_DAYS: {
      return resetDays(state)
    }
    case types.RESET_DAYS_SAVE_OFF: {
      return resetDaysSaveOff(state)
    }
    default:
      return state
  }
}

function resetDays(state) {
  const date = state.days.map(item => {
    const days = item.days.map(day => ({ ...day, active: false, start: false, end: false, off: false }))
    return {
      ...item,
      activeBeginEmptyBoxes: false,
      activeEndEmptyBoxes: false,
      days }
  })
  return {
    days: date,
    cacheDays: [],
    startDate: 'تاریخ شروع',
    endDate: 'تاریخ پایان',
    loadedDate: state.loadedDate
  }
}

function resetDaysSaveOff(state) { // will save the off days in home calender
  const date = state.days.map(item => {
    const days = item.days.map(day => ({ ...day, active: false, start: false, end: false }))
    return {
      ...item,
      activeBeginEmptyBoxes: false,
      activeEndEmptyBoxes: false,
      days
    }
  })
  return {
    days: date,
    cacheDays: [],
    startDate: 'تاریخ شروع',
    endDate: 'تاریخ پایان',
    loadedDate: state.loadedDate
  }
}





// This Approach needs to be reviewed and fixed at a proper time
//
// export default function dateReducer(state = initialState.date, { type, payload }) {
//   switch (type) {
//     case types.ACTIVE_DAY: {
//       const res = payload.split('_')
//       const monthID = res[0]
//       const dayID = res[1]
//       return state.map((month, key) => {
//         if (key !== monthID) {
//           return month
//         }
//         return month.days.map(day => {
//           if (day.value != dayID) { // eslint-disable-line
//             return { ...month, ...month.days }
//           }
//           return {
//             ...month,
//             ...month.days[dayID - 1],
//             active: !day.active
//           }
//         })
//       })
//     }
//     default:
//       return state
//   }
// }
