import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { baseURL } from '../../constants/api' 
import r from '../styles/Rinc'
import { FaBold } from '../assets/Font'
import { stageHome, reserveFunc } from '../../actions/generalActions'
import { userToStore } from '../../actions/userActions'
import { resetDays } from '../../actions/dateActions'

class ReservationPayment extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  componentDidMount() {
    axios.post(`${baseURL}api/reserve`, { ...this.props.reserve })
      .then(result => {
        console.log(result.data)
        axios.get(`${baseURL}api/users/${this.props.user._id}`)
          .then(user => {
            console.log(user.data)
            this.props.userToStore(user.data)
            axios.get(`${baseURL}api/homes/${this.props.home._id}`)
              .then(home => {
                console.log(home.data)
                this.props.stageHome(home.data)
                this.props.resetDays()
                this.props.reserveFunc(null, 'reset')
                this.props.navigator.showInAppNotification({
                  screen: 'mrxrinc.Notification',
                  autoDismissTimerSec: 3,
                  passProps: {
                    alarm: false,
                    success: true,
                    message: 'رزرو شما با موفقیت ثبت شد!'
                  }
                })
                setTimeout(() => {
                  this.props.navigator.resetTo({
                    screen: 'mrxrinc.Trips'
                  })
                }, 0)
              })
              .catch(err => console.log('payment: cannot store home new data', err))
          })
          .catch(err => console.log('payment: cannot store user new data', err))        
      })
      .catch(err => console.log('payment: cannot post the reserve data', err))
  }
  
  render() {
    return (
      <View style={[r.full, r.center, r.bgWhite]}>
        
        <FaBold size={20} style={[r.light4, r.centerText]}>
          مرحله پرداخت انجام می شود...
        </FaBold>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    reserve: state.reserve,
    user: state.user,
    home: state.home,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stageHome: (data) => dispatch(stageHome(data)),
    userToStore: (data) => dispatch(userToStore(data)),
    resetDays: () => dispatch(resetDays()),
    reserveFunc: (payload, section) => dispatch(reserveFunc(payload, section)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationPayment)
