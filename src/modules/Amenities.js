import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Animated
} from 'react-native'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'

const NAVBAR_HEIGHT = 75

export default class Amenities extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
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
            <a.FaBold size={25}>امکانات</a.FaBold>

            <View style={[r.vertical10, r.top30]}>
              <a.Fa size={15}>وای فای</a.Fa>
              <a.FaMulti size={12} style={[r.top5, r.grayMid]}>
                دسترسی مستمر به اینترنت
              </a.FaMulti>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>گرمایش</a.Fa>
              <a.FaMulti size={12} style={[r.top5, r.grayMid]}>
                مجهز به سیستم گرمایش مرکزی یا مستقل
              </a.FaMulti>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>شستشو</a.Fa>
              <a.FaMulti size={12} style={[r.top5, r.grayMid]}>
                ماشین لباسشویی در داخل ساختمان
              </a.FaMulti>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>اتو</a.Fa>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>مناسب برای کار با لپ تاپ</a.Fa>
              <a.FaMulti size={12} style={[r.top5, r.grayMid]}>
                یک میز با فضای کافی برای لپ تاپ به همراه یک صندلی که مناسب کار هستند
              </a.FaMulti>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>لوازم ضروری</a.Fa>
              <a.FaMulti size={12} style={[r.top5, r.grayMid]}>
                حوله، ملافه، صابون، دستمال توالت و ...
              </a.FaMulti>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>شومینه</a.Fa>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>کولر</a.Fa>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>تلویزیون</a.Fa>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>محل پارک مناسب</a.Fa>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>آشپزخانه</a.Fa>
              <a.FaMulti size={12} style={[r.top5, r.grayMid]}>
                مناسب برای پخت غذای دلخواه مهمانان
              </a.FaMulti>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>سشوار</a.Fa>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>جعبه کمکهای اولیه</a.Fa>
            </View>

            <View style={g.line} />

            <View style={r.vertical10}>
              <a.Fa size={15}>سنسور دود</a.Fa>
            </View>
          </View>

        </ScrollView>
      </View>
    )
  }
}
