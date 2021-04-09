import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import r from '../styles/Rinc'
import g from '../styles/General'
import { Fa, FaBold, FaMulti } from '../assets/Font'
import { NavBar, ReserveFooter } from './ReservationAssets'

class ReservationReviewHomeRules extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar 
          steps={[2, 4]}
          back={() => this.props.navigator.pop()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark, r.bottom10]}>
              {`مرور قوانین خانه ${this.props.home.host.fullName}`}
            </FaBold>
            
            {!this.props.home.homeRules.smokingAllowed && (
              <View>
                <View style={[r.vertical10, r.top30]}>
                  <Fa size={14}>عدم استعمال دخانیات</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}
            {!this.props.home.homeRules.petAllowed && (
              <View>
                <View style={[r.vertical10]}>
                  <Fa size={14}>آوردن حیوان خانگی ممنوع</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}
            {!this.props.home.homeRules.celebrationAllowed && (
              <View>
                <View style={[r.vertical10]}>
                  <Fa size={14}>عدم برگزاری جشن و پارتی</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}
            <View style={[r.vertical10]}>
              <Fa size={14}>
                {`ساعت مناسب برای ورود  ${this.props.home.visitHours[0] + 1}`}
              </Fa>
            </View>
            <View style={g.line} />
            <FaMulti size={12} style={[r.top20]}>
              {this.props.home.homeRules.description}
            </FaMulti>
          
          </View>
        </ScrollView>

        <ReserveFooter 
          agree
          price={this.props.home.price}
          totalNights={this.props.reserve.totalNights}
          onPress={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.ReservationSendMessage'
            })
          }}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    reserve: state.reserve,
    home: state.home
  }
}

export default connect(mapStateToProps)(ReservationReviewHomeRules)
