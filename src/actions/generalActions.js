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

export function generalFilters(data) {
  return {
    type: types.FILTER_GENERAL_FILTERS,
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
