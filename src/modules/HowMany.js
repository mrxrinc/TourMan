
import React, { Component } from 'react'
import {
  View,
  TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold } from './assets/Font'
import { IncDec, Switch } from './assets/Assets'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'
import { filterHowMany } from '../actions/generalActions'

const AirIcon = createIconSetFromFontello(airConfig)

class HowMany extends Component {
  static navigatorStyle = {
    navBarHidden: true
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
          <IncDec
            title={'بزرگسال'}
            count={this.props.filter.howMany.adultQuantity}
            incPress={() => {
              if (this.props.filter.howMany.adultQuantity < 16) {
                const newData = {
                  ...this.props.filter.howMany,
                  adultQuantity: this.props.filter.howMany.adultQuantity + 1
                }
                this.props.filterHowMany(newData)
              }
            }}
            decPress={() => {
              if (this.props.filter.howMany.adultQuantity > 1) {
                const newData = {
                  ...this.props.filter.howMany,
                  adultQuantity: this.props.filter.howMany.adultQuantity - 1
                }
                this.props.filterHowMany(newData)
              }
            }}
          />

          <View style={[g.line, { marginVertical: 0 }]} />

          <IncDec
            title={'کودک'}
            count={this.props.filter.howMany.childrenQuantity}
            incPress={() => {
              if (this.props.filter.howMany.childrenQuantity < 16) {
                const newData = {
                  ...this.props.filter.howMany,
                  childrenQuantity: this.props.filter.howMany.childrenQuantity + 1
                }
                this.props.filterHowMany(newData)
              }
            }}
            decPress={() => {
              if (this.props.filter.howMany.childrenQuantity > 0) {
                const newData = {
                  ...this.props.filter.howMany,
                  childrenQuantity: this.props.filter.howMany.childrenQuantity - 1
                }
                this.props.filterHowMany(newData)
              }
            }}
          />

          <View style={[g.line, { marginVertical: 0 }]} />

          <View style={[r.rtl, r.horizCenter, r.spaceBetween]}>
            <Fa style={[r.rightMargin5, { flex: 1.5 }]} size={15}>حیوان خانگی</Fa>
            <View style={[r.center, { flex: 1, height: 75 }]}>
              <Switch
                state={this.props.filter.howMany.pets}
                onPress={() => {
                  const newData = {
                    ...this.props.filter.howMany,
                    pets: !this.props.filter.howMany.pets
                  }
                  this.props.filterHowMany(newData)
                }}
              />
            </View>
          </View>


        </View>

        <Footer 
          onPress={() => {
            this.props.navigator.dismissModal()
          }}
        />
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
              <FaBold style={[r.white]} size={18}>ذخیره</FaBold>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    filter: state.filter  
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filterHowMany: data => dispatch(filterHowMany(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HowMany)
