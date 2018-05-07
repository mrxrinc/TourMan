import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  Animated
} from 'react-native'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'

import { createIconSetFromFontello } from 'react-native-vector-icons'
import lineConfig from './assets/line_font_config.json'
const LineIcon = createIconSetFromFontello(lineConfig)

const NAVBAR_HEIGHT = 75

export default class Reviews extends Component {
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
            <a.FaBold size={25}>نظرات</a.FaBold>
            <View style={[r.rtl, r.top10, r.bottom20]}>
              <Text>
                <LineIcon name={'star'} style={g.primary} size={13} />
                <LineIcon name={'star'} style={g.primary} size={13} />
                <LineIcon name={'star'} style={g.primary} size={13} />
                <LineIcon name={'star'} style={g.primary} size={13} />
                <LineIcon name={'star'} style={g.primary} size={13} />
              </Text>
            </View>

            <View>
              <View style={[r.rtl, r.top15]}>
                <Image
                  style={[g.reviewAvatar]}
                  source={require('./imgs/profile.jpg')} />
                <View style={[r.verticalCenter, r.rightPadd10]}>
                  <a.FaBold size={12} style={r.grayMid}>علیرضا رضایی</a.FaBold>
                  <a.Fa size={9} style={r.grayLight}>1396/6/7</a.Fa>
                </View>
              </View>
              <View style={[r.vertical10]}>
                <a.FaMulti size={12} style={[r.grayMid]}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                </a.FaMulti>
              </View>
            </View>

            <View style={[g.line, r.vertical20]} />

            <View>
              <View style={[r.rtl, r.top15]}>
                <Image
                  style={[g.reviewAvatar]}
                  source={require('./imgs/profile.jpg')} />
                <View style={[r.verticalCenter, r.rightPadd10]}>
                  <a.FaBold size={12} style={r.grayMid}>علیرضا رضایی</a.FaBold>
                  <a.Fa size={9} style={r.grayLight}>1396/6/7</a.Fa>
                </View>
              </View>
              <View style={[r.vertical10]}>
                <a.FaMulti size={12} style={[r.grayMid]}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                </a.FaMulti>
              </View>
            </View>

            <View style={[g.line, r.vertical20]} />

            <View>
              <View style={[r.rtl, r.top15]}>
                <Image
                  style={[g.reviewAvatar]}
                  source={require('./imgs/profile.jpg')} />
                <View style={[r.verticalCenter, r.rightPadd10]}>
                  <a.FaBold size={12} style={r.grayMid}>علیرضا رضایی</a.FaBold>
                  <a.Fa size={9} style={r.grayLight}>1396/6/7</a.Fa>
                </View>
              </View>
              <View style={[r.vertical10]}>
                <a.FaMulti size={12} style={[r.grayMid]}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                </a.FaMulti>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    )
  }
}
