
import React, { Component } from 'react'
import {
  View,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import * as asset from './assets/Assets'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

export default class HowMany extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      adultQuantity: 1,
      childrenQuantity: 0,
      pets: false
    }
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[r.wFull, { height: 75, borderBottomWidth: 1, borderColor: '#e7e7e7' }]}>
          <View style={[r.wFull, r.rtl, { height: 75, paddingTop: 25 }]}>
            <View style={{ width: 60, height: 50 }}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', true)}
                onPress={() => this.props.navigator.dismissModal()}
              >
                <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                  <AirIcon name={'close-bold'} size={14} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={[r.full, r.padd15]} />
        </View>
        <View style={r.paddHoriz20}>
          <asset.IncDec
            title={'بزرگسال'}
            count={this.state.adultQuantity}
            incPress={() => {
              if (this.state.adultQuantity < 16) {
                this.setState({ adultQuantity: this.state.adultQuantity + 1 })
              }
            }}
            decPress={() => {
              if (this.state.adultQuantity > 1) {
                this.setState({ adultQuantity: this.state.adultQuantity - 1 })
              }
            }}
          />

          <View style={[g.line, { marginVertical: 0 }]} />

          <asset.IncDec
            title={'کودک'}
            count={this.state.childrenQuantity}
            incPress={() => {
              if (this.state.childrenQuantity < 16) {
                this.setState({ childrenQuantity: this.state.childrenQuantity + 1 })
              }
            }}
            decPress={() => {
              if (this.state.childrenQuantity > 0) {
                this.setState({ childrenQuantity: this.state.childrenQuantity - 1 })
              }
            }}
          />

          <View style={[g.line, { marginVertical: 0 }]} />

          <View style={[r.rtl, r.horizCenter, r.spaceBetween]}>
            <a.Fa style={[r.rightMargin5, { flex: 1.5 }]} size={15}>حیوان خانگی</a.Fa>
            <View style={[r.center, { flex: 1, height: 75 }]}>
              <asset.Switch
                onPress={() => {
                  this.setState({ pets: !this.state.pets })
                }}
                state={this.state.pets}
              />
            </View>
          </View>


        </View>

        <Footer />
      </View>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <View
        style={[g.reportFooter, r.absolute, r.bottom, r.wFull, r.padd20]}
      >
        <View style={[g.bgPrimary, r.round5, r.full, { height: 45 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#ffffff33', false)}
            onPress={this.props.onPress}
          >
            <View style={[r.full, r.center]} pointerEvents={'box-only'}>
              <a.FaBold style={[r.white]} size={18}>ذخیره</a.FaBold>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}
