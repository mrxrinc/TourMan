import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Realm from 'realm'
import Loading from './assets/Loading'
import r from './styles/Rinc'
import { FaBold } from './assets/Font'
import { baseURL } from '../constants/api'
import { userToStore } from '../actions/userActions'

class Splash extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  componentWillMount() {
    Realm.open({
      schema: [{ name: 'localToken', properties: { key: 'string', id: 'string' } }]
    }).then(realm => {
      // realm.write(() => {
      //   realm.delete(realm.objects('localToken'))
      // })
      console.log('Have realm ? : ', realm.objects('localToken')[0] != null)
      if (realm.objects('localToken')[0] == null) { // must be 2 equal sign OR wont work!
        this.props.navigator.push({ screen: 'mrxrinc.Registration', passProps: { page: 'SignUp' } })
      } else {
        console.log('WE HAVE LOCAL DATABASE')        
        console.log('realm data: ', realm.objects('localToken')[0])

        const userId = realm.objects('localToken')[0].id
        const userKey = realm.objects('localToken')[0].key
        axios.defaults.headers.common.Authorization = `Bearer ${userKey}` // Global Auth for All pages
        axios.get(`${baseURL}api/users/${userId}`)
          .then(user => {
            this.props.userToStore(user.data)
            console.log('in Splash : ', this.props)      
            this.props.navigator.push({ screen: 'mrxrinc.Profile', passProps: { hostId: '5afafc77af0ab5136416c969' } })
          })
          .catch(err => console.log(err))
      }
    })
  }


  render() {
    return (
      <View style={[r.center, r.full]}>
        <FaBold>Loading...</FaBold>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userToStore: userInfo => dispatch(userToStore(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
