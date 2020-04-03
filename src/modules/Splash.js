import React, { Component } from 'react'
import { View, Image, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Loading from './assets/Loading'
import r from './styles/Rinc'
import { EnBold } from './assets/Font'
import { baseURL } from '../constants/api'
import { userToStore } from '../actions/userActions'

class Splash extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0)'
  }

  async componentDidMount() {

    try {
      const userId = await AsyncStorage.getItem('userId')
      const userKey = await AsyncStorage.getItem('userKey')
      if (userKey == null) { // must be 2 equal sign OR wont work!
        console.log('yo here')
        this.props.navigator.resetTo({ screen: 'mrxrinc.Registration', passProps: { page: 'SignUp' } })
      } else {
        console.log('else')
        console.log('USER ID ', userId)
        axios.defaults.headers.common.Authorization = `Bearer ${userKey}` // Global Auth for All pages
        axios.get(`${baseURL}api/users/${userId}`)
        .then(user => {
          this.props.userToStore(user.data)
          this.props.navigator.resetTo({
            screen: 'mrxrinc.Explore'
          })
        })
        .catch(err => console.log(err))
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  render() {
    return (
      <View style={[r.center, r.full]}>
        <Image 
          source={require('./imgs/splashLogo.png')}
          style={{ width: 200, height: 200, marginTop: 36 }}
        />

        <View style={[r.absolute, r.bottom, r.wFull, { height: 150 }]}>
          <View style={[r.center, { height: 30 }]}>
            <Loading style={{ opacity: 0.6 }} />
          </View>

          <View style={[r.center, r.full]}>
            <EnBold style={[r.light4, r.bottom20]} size={25}>mrxrinc</EnBold>
          </View>
        </View>
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
