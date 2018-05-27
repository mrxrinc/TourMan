import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Realm from 'realm'
import SplashScreen from 'react-native-splash-screen';
import Loading from './assets/Loading'
import r from './styles/Rinc'
import { EnBold } from './assets/Font'
import { baseURL } from '../constants/api'
import { userToStore } from '../actions/userActions'

class Splash extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.1)'
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
        this.props.navigator.resetTo({ screen: 'mrxrinc.Registration', passProps: { page: 'SignUp' } })
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
            this.props.navigator.resetTo({ screen: 'mrxrinc.Explore', passProps: { homeId: '5b032f6cb33fc62ba879cd56' } })
          })
          .catch(err => console.log(err))
      }
    })
  }

  componentDidMount() {
    // SplashScreen.hide()
  }

  render() {
    return (
      <View style={[r.center, r.full]}>
        <Image 
          source={require('./imgs/splashLogo.png')}
          style={{ width: 200, height: 200, marginTop: 36 }}
        />

        <View style={[r.absolute, r.bottom, r.wFull, { height: 150 }]}>
          {/*<View style={[r.center, { height: 30 }]}>
            <Loading style={{ opacity: 0.6 }} />
          </View>*/}

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
