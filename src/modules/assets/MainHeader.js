import React, { Component } from 'react'
import {
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { View, createAnimatableComponent } from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import r from '../styles/Rinc'
import g from '../styles/General'
import { FaBold } from './Font'
import airConfig from './air_font_config.json'
import lineConfig from './line_font_config.json'
import { homesList } from '../../actions/generalActions'

const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)
const AnimatableAirIcon = createAnimatableComponent(AirIcon)

class MainHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: this.props.exploreHeader ? 125 : 100,
      heightOpened: this.props.exploreHeader ? 275 : 250
    }
  }

  componentDidMount() {
    this.refs.boxLocation.fadeOut(1)
    this.refs.boxTime.fadeOut(1)
    this.refs.boxPeople.fadeOut(1)
    this.refs.headClose.fadeOut(1)
    if (this.props.autoOpen) this.openHead()
  }

  openHead() {
    this.refs.head.transitionTo({ height: this.state.heightOpened }, 600, 'ease-out-circ')
    this.refs.SecondBoxes.transitionTo({ marginTop: 0 }, 1) // for avoiding conflict
    this.refs.boxGeneral.fadeOut(50).then(() => {
      this.refs.boxGeneral.transitionTo({ height: 0 }, 1)
      this.refs.boxLocation.transitionTo({ marginTop: 25 }, 60, 'ease-out-circ')
      this.refs.headClose.fadeIn(50)
      this.refs.boxLocation.fadeIn(50)
      this.refs.boxTime.fadeIn(300)
      this.refs.boxPeople.fadeIn(400)
    })
  }

  closeHead() {
    this.refs.head.transitionTo({ height: this.state.height }, 200, 'ease-out-circ')
    this.refs.SecondBoxes.transitionTo({ marginTop: 110 }, 1) // for avoiding conflict
    this.refs.headClose.fadeOut(50)
    this.refs.boxLocation.fadeOut(100)
    this.refs.boxTime.fadeOut(100)
    this.refs.boxPeople.fadeOut(50).then(() => {
      this.refs.boxGeneral.transitionTo({ height: 45 }, 1)
      this.refs.boxGeneral.fadeIn(50)
    })
  }

  placeName = () => {
    if (this.props.filters.province === 'all') return 'کل کشور'
    if (this.props.filters.province) return this.props.filters.province
    return 'کجا؟'
  }

  render() {
    return (
      <View style={[g.header, { height: this.state.height }]} ref={'head'}>
        <LinearGradient
          style={[r.full, { padding: 15, paddingTop: 40 }]}
          colors={['#0f9098', '#1fb1ba']}
          start={{ x: 0.3, y: 0.5 }}
          end={{ x: 0.5, y: -1.1 }}
        >
          <View ref={'boxGeneral'} style={[r.overhide]}>
            <TouchableWithoutFeedback onPress={() => this.openHead()}>
              <View style={[g.headBox, r.rtl, r.horizCenter]}>
                <LineIcon name={'search'} size={18} color={'white'} />
                <FaBold style={[r.white, r.paddHoriz10]}>
                  کجا . چه زمانی . چند نفر
                </FaBold>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View ref={'SecondBoxes'} style={[r.overhide, { marginTop: 110 }]}>
            <AnimatableAirIcon
              name={'chevron-up'} size={20}
              color={'#fff'} ref={'headClose'}
              style={[g.headClose, r.absolute, r.right]}
              onPress={() => this.closeHead()} />

            <View ref={'boxLocation'} style={{ marginTop: 0 }}>
              <TouchableWithoutFeedback
                onPress={this.props.provincePress}>
                <View style={[g.headBox, r.rtl, r.horizCenter]}>
                  <LineIcon name={'globe'} size={18} color={'white'} />
                  <FaBold style={[r.white, r.paddHoriz10]}>
                    {this.placeName()}
                  </FaBold>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View ref={'boxTime'} useNativeDriver>
              <TouchableWithoutFeedback
                onPress={this.props.datePress}
              >
                <View style={[g.headBox, r.rtl, r.horizCenter]}>
                  <LineIcon name={'calendar'} size={18} color={'white'} />
                  <FaBold style={[r.white, r.paddHoriz10]}>
                    {typeof this.props.date.startDate === 'object' ?
                      this.props.date.startDate.join(' ') : 'چه زمانی؟'
                    }
                    {typeof this.props.date.endDate === 'object' ?
                      `  تا  ${this.props.date.endDate.join(' ')}` : null
                    }
                  </FaBold>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View ref={'boxPeople'} useNativeDriver>
              <TouchableWithoutFeedback
                onPress={this.props.capacityPress}>
                <View style={[g.headBox, r.rtl, r.horizCenter]}>
                  <LineIcon name={'group'} size={18} color={'white'} />
                  <FaBold style={[r.white, r.paddHoriz10]}>
                    {this.props.filters.adults &&
                      `${this.props.filters.adults} بزرگسال `
                    }
                    {this.props.filters.children !== 0 ?
                      ` - ${this.props.filters.children} کودک` : null
                    }
                    {this.props.filters.petsAllowed && ' - حیوان خانگی'}
                  </FaBold>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          {this.props.moneyGuid && (
            <View style={[r.absolute, r.left, r.bottom, r.rtl, r.horizCenter, { height: 30 }]}>
              <LineIcon
                name={'money'}
                color={'rgba(255,255,255,0.7)'}
                size={16}
              />
              <FaBold size={10} style={[r.paddHoriz5, r.top3, { color: 'rgba(255,255,255,0.7)' }]}>
                = هزار تومان
            </FaBold>
            </View>
          )}

        </LinearGradient>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    filteredHomesList: state.filteredHomesList,
    filters: state.filters,
    date: state.date
  }
}

function mapDispatchToProps(dispatch) {
  return {
    homesList: data => dispatch(homesList(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)
