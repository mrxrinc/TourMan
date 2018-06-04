import * as types from '../../constants/constants'
import initialState from '../initialState'

export function homeReducer(state = initialState.home, { type, payload }) {
  switch (type) {
    case types.STAGE_HOME:   
      return payload
      
    default:
      return state
  }
}

export function reportUserReducer(state = initialState.reportUser, { type, payload }) {
  switch (type) {
    case types.USER_REPORT:
      return { ...state, ...payload }
       
    default:
      return state
  }
}

export function reviewsReducer(state = initialState.reviews, { type, payload }) {
  switch (type) {
    case types.STORE_REVIEWS:
      return payload

    case types.ADD_REVIEW: {
      const data = state.map(item => item)
      data.unshift(payload)
      return data
    }
 
    default:
      return state
  }
}

export function filtersReducer(state = initialState.filters, { type, payload }) {
  switch (type) {
    case types.FILTER_GENERAL:
      if (payload === null) { // reset filters
        return initialState.filters
      }
      return { ...state, activeFilterIcon: true, ...payload }

    default:
      return state
  }
}

export function homesListReducer(state = initialState.filteredHomesList, { type, payload }) {
  switch (type) {
    case types.HOMES_LIST:
      return payload

    default:
      return state
  }
}

export function luxuryReducer(state = initialState.luxury, { type, payload }) {
  switch (type) {
    case types.LUXURY_LIST:    
      return payload

    default:
      return state
  }
}

export function addHomeReducer(state = initialState.addHomeState, { type, payload, section }) {
  if (type === types.ADD_HOME) {
    switch (section) {
      case 'homeType':
        return { 
          ...state, 
          host: payload.host,
          homeType: payload.homeType, 
          luxury: payload.luxury 
        }
      case 'capacity':
        return {
          ...state,
          capacity: payload
        }
      case 'rooms':
        return {
          ...state,
          rooms: payload.rooms,
          bathrooms: payload.bathrooms,
          beds: payload.beds
        }
      case 'amenities':
        return {
          ...state,
          amenities: payload
        }
      case 'location':
        return {
          ...state,
          province: payload.province,
          location: payload.location
        }
      case 'images':
        return {
          ...state,
          images: payload.images
        }
      case 'about':
        return {
          ...state,
          about: payload
        }
      case 'title':
        return {
          ...state,
          title: payload.title
        }
      case 'homeRules':
        return {
          ...state,
          homeRules: payload
        }
      case 'reservation':
        return {
          ...state,
          instanceReserve: payload.instanceReserve,
          minimumNights: payload.minimumNights,
          visitHours: payload.visitHours
        }
      case 'price':
        return {
          ...state,
          price: payload.price
        }
      case 'cancelation':
        return {
          ...state,
          cancelation: payload.cancelation
        }
      case 'edit':
        return payload

      case null:
        return {}

      default:
        return state
    }
  } else {
    return state
  }
}

export function addHomeStepsReducer(state = initialState.addHomeSteps, { type, payload }) {
  switch (type) {
    case types.ADD_HOME_STEPS:
      return payload

    default:
      return state
  }
}