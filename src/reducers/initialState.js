import jalaali from 'jalaali-js'

import { baseURL } from '../constants/api'

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
  loading: false,
  date: {
    loadedDate: date,
    days: [],
    cacheDays: [],
    startDate: 'تاریخ شروع',
    endDate: 'تاریخ پایان'
  },
  user: {},
  reportUser: {},
  home: {
    images: [`${baseURL}uploads/homeImages/defaultImageHolder.jpg`],
    host: {
      avatar: `${baseURL}uploads/userAvatars/default_profile_photo.jpg`
    }
  },
  luxury: [],
  reviews: [],
  filters: {
    province: 'all',
    adults: 1,
    children: 0,
    instanceReserve: false,
    entire: false,
    privateRoom: false,
    sharedRoom: false,
    luxury: false,
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    wifi: false,
    tv: false,
    accessories: false,
    kitchen: false,
    washingMachine: false,
    cooler: false,
    parkingLot: false,
    celebrationAllowed: false,
    petsAllowed: false,
    smokingAllowed: false,
    popular: false,
    activeFilterIcon: false,
    price: [10, 10000] // must be the last item in favor of mongodb query!
  },
  filteredHomesList: [],
  addHomeState: {},
  addHomeSteps: 1,
  reserve: {},
  explore: {
    specialOffers: [],
    promotedCities: [],
    city01: [],
    city02: []
  }
}
