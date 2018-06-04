import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  TimePickerAndroid
} from 'react-native'
import { connect } from 'react-redux'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBold } from '../../assets/Font'
import { addHome } from '../../../actions/generalActions'
import { BTN, NavBar, SwitchRow, IncDecRow } from '../HostAssets'

class HostingReservation extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    minimumNights: 1,
    visitHours: [14, 11],
    instanceReserve: false
  }

  componentWillMount() {
    if (this.props.addHomeState.instanceReserve) {
      const minimumNights = this.props.addHomeState.minimumNights
      const visitHours = this.props.addHomeState.visitHours
      const instanceReserve = this.props.addHomeState.instanceReserve
      this.setState({ minimumNights, visitHours, instanceReserve })
    }
  }

  getTime = async (pos) => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14, minute: 0, is24Hour: true
      })
      if (action !== TimePickerAndroid.dismissedAction) {
        console.log(hour, minute)
        if (pos === 'first') {
          this.setState({ visitHours: [hour, this.state.visitHours[1]] })
        } else if (pos === 'last') {
          this.setState({ visitHours: [this.state.visitHours[0], hour] })
        }
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message)
    }
  }

  nextPage = () => {
    const payload = {
      minimumNights: this.state.minimumNights,
      visitHours: this.state.visitHours,
      instanceReserve: this.state.instanceReserve
    }
    this.props.addHome(payload, 'reservation')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingPrice'
    })
  }

  render() {
    return (
      <View style={[r.full, r.bgwhite]}>
        <NavBar
          saveAndExit={() => {
            this.nextPage()
            this.props.navigator.dismissModal()
          }}
          back={() => this.props.navigator.pop()}
        />
        <FaBold size={20} style={[r.grayDark, r.vertical10, r.paddHoriz20]}>
          شرایط رزرو و دسترسی:
        </FaBold>
        <ScrollView
          style={[r.padd20, r.bottom70]}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
        >
          <View style={[r.bottom20]}>
            <SwitchRow
              state={this.state.instanceReserve}
              title={'رزرو آنی'}
              description={'مهمان ها بدون نیاز به تایید شما خانه را رزرو کنند'}
              onPress={() => this.setState({ instanceReserve: !this.state.instanceReserve })}
            />
            <View style={[g.line, r.vertical20]} />

            <View style={[r.rtl, r.horizCenter, r.spaceBetween, { height: 55 }]}>
              <View style={[r.rightMargin5, { flex: 3 }]}>
                <Fa style={[r.grayMid]} size={18}>ساعت ورود</Fa>
              </View>
              <TouchableOpacity 
                style={[r.center, r.bgLight2, r.round3, { flex: 1 }]}
                onPress={() => this.getTime('first')}
              >
                <Fa style={[r.grayMid]} size={22}>{this.state.visitHours[0]}</Fa>
              </TouchableOpacity>
            </View>

            <View style={[g.line, r.vertical20]} />

            <View style={[r.rtl, r.horizCenter, r.spaceBetween, { height: 55 }]}>
              <View style={[r.rightMargin5, { flex: 3 }]}>
                <Fa style={[r.grayMid]} size={18}>ساعت خروج</Fa>
              </View>
              <TouchableOpacity
                style={[r.center, r.bgLight2, r.round3, { flex: 1 }]}
                onPress={() => this.getTime('last')}
              >
                <Fa style={[r.grayMid]} size={22}>{this.state.visitHours[1]}</Fa>
              </TouchableOpacity>
            </View>

            <View style={[g.line, r.vertical20]} />

            <IncDecRow
              title={'حداقل شب قابل رزرو'}
              count={this.state.minimumNights}
              incPress={() => {
                if (this.state.minimumNights < 20) {
                  this.setState({ minimumNights: this.state.minimumNights + 1 })
                }
              }}
              decPress={() => {
                if (this.state.minimumNights > 1) {
                  this.setState({ minimumNights: this.state.minimumNights - 1 })
                }
              }}
            />

          </View>
        </ScrollView>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>2/4</Fa>
        </View>

        <BTN
          active
          next
          style={[r.absolute, g.hostingStepsNextBTN]}
          onPress={() => this.nextPage()}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    addHomeState: state.addHomeState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addHome: (data, section) => dispatch(addHome(data, section))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostingReservation)
