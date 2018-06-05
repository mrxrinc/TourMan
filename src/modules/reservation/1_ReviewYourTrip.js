import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import r from '../styles/Rinc'
import g from '../styles/General'
import { Fa, FaBold } from '../assets/Font'
import { addHome } from '../../actions/generalActions'
import { NavBar, ReserveFooter } from './ReservationAssets'

class ReservationReviewYourTrip extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar 
          steps={[1, 4]}
          back={() => this.props.navigator.pop()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark, r.bottom10]}>
              مرور جزئیات سفر
            </FaBold>
            
            <View style={[r.rtl, r.spaceBetween, r.paddHoriz10, { height: 100 }]} >
              <View style={[r.full, r.verticalCenter]}>
                <FaBold size={18} style={[r.grayDark]}>ویلا خوب</FaBold>
                <Fa size={13} style={r.top10}>توضیحات خانه</Fa>
              </View>
              <View style={[r.center, { width: 100 }]}>
                <Image
                  source={{ uri: 'http://192.168.1.7:3000/uploads/homeImages/01.jpg' }}
                  style={[r.round3, r.wFull, { height: 80 }]}
                />
              </View>
            </View>

            <View style={[r.rtl, r.horizCenter, r.spaceBetween, r.top20, { height: 55 }]}>
              <View style={[r.rightMargin5]}>
                <Fa style={[r.grayMid]} size={15}>تاریخ</Fa>
              </View>
              <View style={[r.center]}>
                <Fa style={[g.primary]} size={15}>12 خرداد تا 15 تیر</Fa>
              </View>
            </View>

            <View style={g.line} />

            <View style={[r.rtl, r.horizCenter, r.spaceBetween, { height: 55 }]}>
              <View style={[r.rightMargin5]}>
                <Fa style={[r.grayMid]} size={15}>تعداد مهمان ها</Fa>
              </View>
              <View style={[r.center]}>
                <Fa style={[g.primary]} size={15}> 2 نفر</Fa>
              </View>
            </View>
          
          </View>
        </ScrollView>

        <ReserveFooter 
          price={this.props.home.price}
          totalNights={500}
          onPress={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.ReservationReviewHomeRules'
            })
          }}
        />
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
