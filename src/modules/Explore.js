import React, { Component } from 'react'
import {
  Text,
  Animated,
  TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { View, createAnimatableComponent } from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold } from './assets/Font'
import airConfig from './assets/air_font_config.json'
import ForYou from './ForYou'
import PopularHomes from './PopularHomes'
import LuxuryHomes from './LuxuryHomes'
import { getLocalUser } from '../actions/userActions'
import lineConfig from './assets/line_font_config.json'
import Tabs from './assets/Tabs'
// import Loading from './assets/Loading'

const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)
const AnimatableAirIcon = createAnimatableComponent(AirIcon)
const TabBar = require('./assets/ScrollableTabBar')


class Explore extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };
  constructor(props) {
    super(props)
    this.state = {
      headHeight: new Animated.Value(100),
      contentProps: {
        style: { flex: 1 }
      }
    }
    //this will prevent scrollable-tab-view causing problem on pop navigator
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentDidMount() {
    this.refs.boxLocation.fadeOut(1)
    this.refs.boxTime.fadeOut(1)
    this.refs.boxPeople.fadeOut(1)
    this.refs.headClose.fadeOut(1)
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        this.setState({ contentProps: { style: { flex: 1 } } })
        break
      case 'willDisappear':
        this.setState({ contentProps: { style: { flex: 0 } } })
        break
      default: return null
    }
  }

  openHead() {
    this.refs.head.transitionTo({ height: 275 }, 600, 'ease-out-circ')
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
    this.refs.head.transitionTo({ height: 125 }, 200, 'ease-out-circ')
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
    if (this.props.filter.province === 'all') return 'کل کشور'
    if (this.props.filter.province) return this.props.filter.province
    return 'کجا؟'
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[g.header]} ref={'head'}>
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
                  onPress={() => {
                    this.props.navigator.showModal({
                      screen: 'mrxrinc.Where'
                    })
                  }}>
                  <View style={[g.headBox, r.rtl, r.horizCenter]}>
                    <LineIcon name={'globe'} size={18} color={'white'} />
                    <FaBold style={[r.white, r.paddHoriz10]}>
                      {this.placeName()}
                    </FaBold>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View ref={"boxTime"} useNativeDriver>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigator.showModal({
                      screen: 'mrxrinc.When'
                    })
                  }}
                >
                  <View style={[g.headBox, r.rtl, r.horizCenter]}>
                    <LineIcon name={"calendar"} size={18} color={"white"} />
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

              <View ref={"boxPeople"} useNativeDriver>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigator.showModal({
                      screen: 'mrxrinc.HowMany'
                    })
                  }}>
                  <View style={[g.headBox, r.rtl, r.horizCenter]}>
                    <LineIcon name={"group"} size={18} color={"white"} />
                    <FaBold style={[r.white, r.paddHoriz10]}>
                      {this.props.filter.howMany.adultQuantity !== 1 ?
                        `${this.props.filter.howMany.adultQuantity} بزرگسال ` : 'چند نفر؟'
                      }
                      {this.props.filter.howMany.childrenQuantity !== 0 ?
                        ` ، ${this.props.filter.howMany.childrenQuantity} کودک` : null
                      }
                      {this.props.filter.howMany.adultQuantity !== 1 &&
                        this.props.filter.howMany.pets ?
                        ' و همچنین حیوان خانگی' : null
                      }
                    </FaBold>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View style={[r.absolute, r.left, r.bottom, r.rtl, r.horizCenter, { height: 30 }]}>
              <LineIcon name={"money"} color={"rgba(255,255,255,0.7)"} size={16} />
              <FaBold
                style={[r.paddHoriz5, { color:"rgba(255,255,255,0.7)" }]}
                size={10}>
                = هزار تومان
              </FaBold>
            </View>
          </LinearGradient>
        </View>

        <View style={r.full}>
          <ScrollableTabView
            renderTabBar={() => <TabBar />}
            initialPage={2}
            contentProps={this.state.contentProps}
            locked
            tabBarActiveTextColor={'rgba(255,255,255,1)'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.7)'}
            tabBarTextstyle={[r.bold]}
            style={[{ marginTop: -30 }]}
          >
            <LuxuryHomes tabLabel="لاکچری" {...this.props} />
            <PopularHomes tabLabel="پرطرفدار" {...this.props} />
            <ForYou tabLabel="برای شما" {...this.props} />
          </ScrollableTabView>
        </View>

        <Tabs
          active={'explore'}
          profile={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Profile',
              animated: true,
              animationType: 'fade'
            })
          }}
          messages={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Messages',
              animated: true,
              animationType: 'fade'
            })
          }}
          explore={() => {
            this.props.navigator.resetTo({
              screen: 'mrxrinc.Explore',
              animated: true,
              animationType: 'fade'
            })
          }}
          favorites={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.HomeItem',
              passProps: { homeId: '5b032f6cb33fc62ba879cd56' },
              animated: true,
              // animationType: "fade"
            })
          }}
          trips={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Trips',
              animated: true,
              animationType: 'fade'
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
    date: state.date,
    filter: state.filter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getLocalUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
