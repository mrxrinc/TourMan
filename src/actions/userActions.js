import * as types from '../constants/constants'

export function userRegister(value, section) {
  // empty string causes error on showing next page button 
  //so we make sure it to be null if its empty
  const data = value === '' ? null : value 
  return {
    type: types.USER_REGISTER,
    payload: data,
    section
  }
}

export function userToStore(user) {
  return {
    type: types.USER_TO_STORE,
    payload: user
  }
}

// export function checkLocalUser() {
//   return {
//     type: types.USER_LOCAL_CHECK
//   }
// }

// export function checkLocalUserFounded(data) {
//   return {
//     type: types.USER_LOCAL_CHECK_FOUNDED,
//     payload: data
//   }
// }

// export function checkLocalUserNotFounded() {
//   return {
//     type: types.USER_LOCAL_CHECK_NOT_FOUNDED
//   }
// }

// export function getLocalUser() {  
//   return (dispatch) => {
//     dispatch(checkLocalUser())
//     dispatch(checkLocalUserFounded('Martin Jones'))
//   }
// }