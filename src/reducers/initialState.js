import jalaali from 'jalaali-js'

const yearInfo = [
  [1, 31, 'فروردین'],
  [2, 31, 'اردیبهشت'],
  [3, 31, 'خرداد'],
  [4, 31, 'تیر'],
  [5, 31, 'مرداد'],
  [6, 31, 'شهریور'],
  [7, 30, 'مهر'],
  [8, 30, 'آبان'],
  [9, 30, 'آذر'],
  [10, 30, 'دی'],
  [11, 30, 'بهمن'],
  [12, 29, 'اسفند'],
]
const currentMonth = jalaali.toJalaali(new Date()).jm
const currentDay = jalaali.toJalaali(new Date()).jd
const days = yearInfo.map(month => ({
    value: month[0],
    name: month[2],
    dayCount: month[1],
    firstDayInWeek: null,
    activeBeginEmptyBoxes: false,
    activeEndEmptyBoxes: false,
    days: genDay(month[1], month[0]) // passign dayCount and Month number
  })
)

function genDay(dayCount, month) {
  const array = []
  for (let i = 0; i < dayCount; i++) {
    if (i < currentDay - 1 && month === currentMonth) {
      array.push({
        value: i + 1,
        active: false,
        start: false,
        end: false,
        off: true
       })
    } else {
      array.push({
        value: i + 1,
        active: false,
        start: false,
        end: false,
        off: false
       })
    }
  }
  return array
}

function genMonth() {
  const weekdayStartOfYear = 4 // this will be changed each year or updated from API
  let temp
  let emptyFields = weekdayStartOfYear
  // calculating the start day at week for each month
  for (let j = 0; j < days.length; j++) {
    temp = (days[j].dayCount + emptyFields) % 7
    emptyFields = temp
    if (j === 0) days[j].firstDayInWeek = weekdayStartOfYear  //first month
    // remember the j is for next month's empty fields
    // the last month shouldn't include in the loop
    else if (j + 1 !== days.length) days[j + 1].firstDayInWeek = temp
    else if (j === 11) return days // esfand wont have next month
  }
  return days
}

let date = genMonth().map(item => item)
date.splice(0, currentMonth - 1)
date = date.map((month, key) => ({ ...month, id: key }))
// Now the Date will begin from current month
//and also will have a uniqu monthKey starting from 0
// that we need it for activate a tapped day in redux

export default {
  loading: true,
  user: {
    id: 1
  },
  date: {
    loadedDate: date,
    days: [],
    cacheDays: [],
    startDate: 'تاریخ شروع',
    endDate: 'تاریخ پایان'
  }
}

// shity backup of hard code days
// date: {
//   1: {
//     value: 1,
//     name: 'فروردین',
//     dayCount: 31,
//     firstDayInWeek: null,
//     days: [
//       { value: 1, active: false, start: false, end: false },
//       { value: 2, active: false, start: false, end: false },
//       { value: 3, active: false, start: false, end: false },
//       { value: 4, active: false, start: false, end: false },
//       { value: 5, active: false, start: false, end: false },
//       { value: 6, active: false, start: false, end: false },
//       { value: 7, active: false, start: false, end: false },
//       { value: 8, active: false, start: false, end: false },
//       { value: 9, active: false, start: false, end: false },
//       { value: 10, active: false, start: false, end: false },
//       { value: 11, active: false, start: false, end: false },
//       { value: 12, active: false, start: false, end: false },
//       { value: 13, active: false, start: false, end: false },
//       { value: 14, active: false, start: false, end: false },
//       { value: 15, active: false, start: false, end: false },
//       { value: 16, active: false, start: false, end: false },
//       { value: 17, active: false, start: false, end: false },
//       { value: 18, active: false, start: false, end: false },
//       { value: 19, active: false, start: false, end: false },
//       { value: 20, active: false, start: false, end: false },
//       { value: 21, active: false, start: false, end: false },
//       { value: 22, active: false, start: false, end: false },
//       { value: 23, active: false, start: false, end: false },
//       { value: 24, active: false, start: false, end: false },
//       { value: 25, active: false, start: false, end: false },
//       { value: 26, active: false, start: false, end: false },
//       { value: 27, active: false, start: false, end: false },
//       { value: 28, active: false, start: false, end: false },
//       { value: 29, active: false, start: false, end: false },
//       { value: 30, active: false, start: false, end: false },
//       { value: 31, active: false, start: false, end: false },
//     ]
//   },
//   2: {
//     value: 2,
//     name: 'اردیبهشت',
//     dayCount: 31,
//     firstDayInWeek: null,
//     days: [
//       { value: 1, active: false, start: false, end: false },
//       { value: 2, active: false, start: false, end: false },
//       { value: 3, active: false, start: false, end: false },
//       { value: 4, active: false, start: false, end: false },
//       { value: 5, active: false, start: false, end: false },
//       { value: 6, active: false, start: false, end: false },
//       { value: 7, active: true, start: false, end: false },
//     ]
//   },
//   3: {
//     value: 3,
//     name: 'خرداد',
//     dayCount: 31,
//     firstDayInWeek: null,
//     days: [
//       { value: 1, active: false, start: false, end: false },
//       { value: 2, active: false, start: false, end: false },
//       { value: 3, active: false, start: false, end: false },
//       { value: 4, active: false, start: false, end: false },
//       { value: 5, active: false, start: false, end: false },
//       { value: 6, active: false, start: false, end: false },
//       { value: 7, active: false, start: false, end: false },
//     ]
//   },
//   4: {
//     value: 4,
//     name: 'تیر',
//     dayCount: 31,
//     firstDayInWeek: null,
//     days: [
//       { value: 1, active: false, start: false, end: false },
//       { value: 2, active: false, start: false, end: false },
//       { value: 3, active: false, start: false, end: false },
//       { value: 4, active: false, start: false, end: false },
//       { value: 5, active: false, start: false, end: false },
//       { value: 6, active: false, start: false, end: false },
//       { value: 7, active: false, start: false, end: false },
//     ]
//   },
// },
