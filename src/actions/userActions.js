import * as types from '../constants/constants'

// const Realm = require('realm')

export function checkLocalUser() {
  return {
    type: types.USER_LOCAL_CHECK
  }
}

export function checkLocalUserFounded(data) {
  return {
    type: types.USER_LOCAL_CHECK_FOUNDED,
    data
  }
}

export function checkLocalUserNotFounded() {
  return {
    type: types.USER_LOCAL_CHECK_NOT_FOUNDED
  }
}

export function getLocalUser() {
  return (dispatch) => {
    dispatch(checkLocalUser())
    dispatch(checkLocalUserFounded('Martin Jones'))
  }
}


//
// export function checkOnlineUser(){
//   return {
//     type: types.USER_ONLINE_CHECK
//   }
// }
//
// export function checkOnlineUserFounded(data) {
//   return {
//     type: types.USER_ONLINE_CHECK_FOUNDED,
//     data
//   }
// }
//
// export function checkOnlineUserNotFounded(){
//   return {
//     type: types.USER_ONLINE_CHECK_NOT_FOUNDED
//   }
// }
