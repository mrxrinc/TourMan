import axios from 'axios'
import { baseURL } from '../constants/api'
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


export function storeReviews(data) {
  return {
    type: types.STORE_REVIEWS,
    payload: data
  }
}

export function addReview(data) {
  return {
    type: types.ADD_REVIEW,
    payload: data
  }
}

export function luxuryList(data) {
  return {
    type: types.LUXURY_LIST,
    payload: data
  }
}

export function homesList(data) {
  return {
    type: types.HOMES_LIST,
    payload: data
  }
}

export function homesListReset() {
  return {
    type: types.HOMES_LIST_RESET
  }
}

export function generalFilters(data) {
  return {
    type: types.FILTER_GENERAL,
    payload: data
  }
}

export function filtersToStore(key, value) {
  return (dispatch) => {
    let payload = {}
    if (key === null) { // reset filters
      payload = null
    } else if (key === 'price') {
      payload[key] = [value[0], value[1]]
    } else {
      payload[key] = value  
    }
    dispatch(generalFilters(payload))
  }
}

export function filtersResult(data) {
  return (dispatch) => {
    console.log('action payload : ===== >  ', data)
    axios.get(`${baseURL}api/homes`, {
      params: data 
    })
    .then(res => {
      dispatch(homesList(res.data))
      console.log('API data : ', res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export function addHome(payload, section) {
  return {
    type: types.ADD_HOME,
    payload,
    section
  }
}

export function addHomeStepsFunc(payload) {
  return {
    type: types.ADD_HOME_STEPS,
    payload
  }
}

export function reserveFunc(payload, section) {
  return {
    type: types.RESERVE,
    payload,
    section
  }
}

export function exploreFunc() {
  return (dispatch) => {
    axios.get(`${baseURL}api/explore`)
      .then(explore => {
        console.log('EXPLORE DATA : ', explore.data)
        axios.get(`${baseURL}api/homes/getInArray/${explore.data[0].specialOffers}`)
          .then(specialOffers => {
            dispatch({
              type: types.EXPLORE_SPECIAL_OFFERS,
              payload: specialOffers.data
            })
            dispatch({
              type: types.EXPLORE_PROMOTED_CITIES,
              payload: explore.data[0].promotedCities
            })
          })
          .catch(err => console.log('Error on getting specialOffers Homes : ', err))

        axios.get(`${baseURL}api/homes`, { params: { province: 'تهران' } })
          .then(city01 => {
            dispatch({
              type: types.EXPLORE_CITY_01,
              payload: city01.data
            })
          })
          .catch(err => console.log('Error on getting city01 Homes : ', err))

        axios.get(`${baseURL}api/homes`, { params: { province: 'مازندران' } })
          .then(city02 => {
            dispatch({
              type: types.EXPLORE_CITY_02,
              payload: city02.data
            })
          })
          .catch(err => console.log('Error on getting city01 Homes : ', err))
      }).catch(err => console.log('Error on getting specialOffer IDs', err))
  }
}
