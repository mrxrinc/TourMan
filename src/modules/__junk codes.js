//import Store from 'react-native-store'
// const DB = { localToken: Store.model('localToken') }
// DB.localToken.find().then(resp => {
  //   if (resp !== null) {
  //     DB.localToken.destroy().then(() => {    
  //       DB.localToken.add({ key: res.data.token })
  //     })
  //   } else {
  //     DB.localToken.add({ key: res.data.token })
  //   }
  //   this.props.userToStore(res.data.token)
  //   console.log(this.props.user)
// })

// DB.localToken.destroy()
// DB.localToken.find().then(resp => {
//   console.log('Im inside')      
//   if (resp === null) {
//     console.log('empty DB')
//     this.setState({ debug: 'Empty DB' })
//   } else {
//     console.log('Full DB : ', resp)
//     this.setState({ debug: 'FULL DB' })
//     axios.defaults.headers.common['Authorization'] = `Bearer ${resp[0].key}`
//   }
// })


