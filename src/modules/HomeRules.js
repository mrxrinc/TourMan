import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Animated
} from 'react-native'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'

const NAVBAR_HEIGHT = 75

export default class HomeRules extends Component {
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
            <a.FaBold size={25}>قوانین خانه علیرضا</a.FaBold>
            <a.FaMulti size={12} style={r.top10}>
              شما در خانه
              <Text> علیرضا </Text>
              خواهید بود. چند قانون برای استفاده از این مکان وجود دارد که باید رعایت کنید :
            </a.FaMulti>

            <View style={[r.vertical10, r.top30]}>
              <a.Fa size={14}>عدم استعمال دخانیات</a.Fa>
            </View>
            <View style={g.line} />
            <View style={[r.vertical10]}>
              <a.Fa size={14}>آوردن حیوان خانگی ممنوع</a.Fa>
            </View>
            <View style={g.line} />
            <View style={[r.vertical10]}>
              <a.Fa size={14}>عدم برگزاری جشن و پارتی</a.Fa>
            </View>
            <View style={g.line} />
            <View style={[r.vertical10]}>
              <a.Fa size={14}>ساعت مناسب برای بازدید 15</a.Fa>
            </View>
            <View style={g.line} />
            <a.FaMulti size={12} style={[r.top20]}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
            </a.FaMulti>
          </View>

        </ScrollView>
      </View>
    )
  }
}
