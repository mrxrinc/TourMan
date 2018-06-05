import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import r from '../styles/Rinc'
import g from '../styles/General'
import { FaBold } from '../assets/Font'
import { addHome } from '../../actions/generalActions'

class ReservationReviewYourTrip extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigator.resetTo({
        screen: 'mrxrinc.Trips'
      })
    }, 2000)
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
    user: state.user,
    home: state.home
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addHome: (data, section) => dispatch(addHome(data, section))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationReviewYourTrip)
