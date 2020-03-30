import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaMulti } from './assets/Font'
import NavBar from './assets/NavBar'

const NAVBAR_HEIGHT = 75

class HomeRules extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    const scrollAnim = new Animated.Value(0)
    const offsetAnim = new Animated.Value(0)
    this.state = {
      scrollY: new Animated.Value(0),
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim
        ),
        0,
        NAVBAR_HEIGHT,
      ),
    }
  }

  onScroll(event) {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
    )(event)
  }

  render() {
    const DimWhiteNavBar = this.state.scrollY.interpolate({
      inputRange: [0, 0],
      outputRange: [1, 1],
    })
    const { clampedScroll } = this.state
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT)],
      extrapolate: 'clamp',
    })
    return (
      <View style={[r.full, r.bgWhite]}>
        <Animated.View
          style={[g.homeItemHeader, r.zIndex1,
            { height: NAVBAR_HEIGHT, transform: [{ translateY: navbarTranslate }] }
          ]}
        >
          <NavBar
            animate={DimWhiteNavBar}
            back={() => this.props.navigator.pop()}
          />
        </Animated.View>
        <ScrollView
          contentContainerStyle={{ marginTop: NAVBAR_HEIGHT, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={this.onScroll.bind(this)}
        >
          <View style={[r.bottom50, r.padd20]}>
            <FaBold size={25}>
            قوانین خانه 
            <Text> {this.props.home.host.fullName}</Text>
            </FaBold>
            <FaMulti size={12} style={r.top10}>
              شما در خانه
              <Text> {this.props.home.host.fullName} </Text>
              خواهید بود. چند قانون برای استفاده از این مکان وجود دارد که باید رعایت کنید :
            </FaMulti>

            {!this.props.home.homeRules.smokingAllowed && (
              <View>
                <View style={[r.vertical10, r.top30]}>
                  <Fa size={14}>عدم استعمال دخانیات</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}
            {!this.props.home.homeRules.petsAllowed && (
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
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps)(HomeRules)
