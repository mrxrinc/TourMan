
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
import { filtersToStore, filtersResult } from '../actions/generalActions'

const AirIcon = createIconSetFromFontello(airConfig)

class HowMany extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'white',
  }

  render() {
    const homeMaxCapacity = this.props.homeMaxCapacity
    return (
      <View style={[r.full]}>
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
            count={this.props.filters.adults}
            incPress={() => {
              if (homeMaxCapacity && this.props.filters.adults < homeMaxCapacity) {
                this.props.filtersToStore('adults', this.props.filters.adults + 1)
              } else if (homeMaxCapacity && this.props.filters.adults >= homeMaxCapacity) {
                return null
              } else {
                if (this.props.filters.adults < 16) {
                  this.props.filtersToStore('adults', this.props.filters.adults + 1)
                }
              }
            }}
            decPress={() => {
              if (this.props.filters.adults > 1) {
                this.props.filtersToStore('adults', this.props.filters.adults - 1)
              }
            }}
          />

          <View style={[g.line, { marginVertical: 0 }]} />

          <IncDec
            title={'کودک'}
            count={this.props.filters.children}
            incPress={() => {
              if (this.props.filters.children < 16) {
                this.props.filtersToStore('children', this.props.filters.children + 1)
              }
            }}
            decPress={() => {
              if (this.props.filters.children > 0) {
                this.props.filtersToStore('children', this.props.filters.children - 1)
              }
            }}
          />

          <View style={[g.line, { marginVertical: 0 }]} />

          <View style={[r.rtl, r.horizCenter, r.spaceBetween]}>
            <Fa style={[r.rightMargin5, { flex: 1.5 }]} size={15}>حیوان خانگی</Fa>
            <View style={[r.center, { flex: 1, height: 75 }]}>
              <Switch
                state={this.props.filters.petsAllowed}
                onPress={() => {
                  this.props.filtersToStore('petsAllowed', !this.props.filters.petsAllowed)
                }}
              />
            </View>
          </View>


        </View>

        <Footer 
          onPress={() => {
            this.props.filtersResult(this.props.filters)
            if (this.props.pushToSearchPage === true) {
              this.props.navigator.push({
                screen: 'mrxrinc.Search',
                animationType: 'fade'
              })
            } else this.props.navigator.dismissModal()
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
    filters: state.filters,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filtersToStore: (key, value) => dispatch(filtersToStore(key, value)),
    filtersResult: (data) => dispatch(filtersResult(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HowMany)
