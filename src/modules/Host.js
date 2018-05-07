import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import InvertibleScrollView from 'react-native-invertible-scroll-view'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBoldMulti, FaMulti, FaBold } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import { HeartFull, HeartEmpty } from './assets/Assets'
import airConfig from './assets/air_font_config.json'
import lineConfig from './assets/line_font_config.json'

const LineIcon = createIconSetFromFontello(lineConfig)
const AirIcon = createIconSetFromFontello(airConfig)

const HEADER_MAX_HEIGHT = 250
const HEADER_MIN_HEIGHT = 75
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export default class Host extends Component {
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
        HEADER_MIN_HEIGHT,
      ),
      locLat: 38.246744,
      locLong: 48.298332,
      delta: 0.005,
      activeImage: 0,
      homeHeart_01: false,
      debug: 'debug'
    }
  }

  onScroll(event) {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
    )(event)
    if (event.nativeEvent.contentOffset.y > 180) {
      Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
      )(event)
    }
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    })
    const headerBG = this.state.scrollY.interpolate({
      inputRange: [0, 100, 175],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })
    const navAnimate = this.state.scrollY.interpolate({
      inputRange: [0, 175],
      outputRange: [0, 1],
    })
    const { clampedScroll } = this.state;
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, HEADER_MIN_HEIGHT],
      outputRange: [0, -(HEADER_MIN_HEIGHT)],
      extrapolate: 'clamp',
    })
    return (
      <View style={[r.full, r.bgWhite]}>
        <Animated.View
          style={[g.homeItemHeader, r.zIndex1,
            { height: headerHeight, transform: [{ translateY: navbarTranslate }] }]}
        >
          <NavBar animate={navAnimate} back={() => this.props.navigator.pop()} />
          <View>
            <Animated.Image
              style={[r.wFull, { height: headerHeight, opacity: headerBG }]}
              source={require('./imgs/hostPic.jpg')}
            />
          </View>
        </Animated.View>
        <ScrollView
          contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT,
          paddingBottom: HEADER_MAX_HEIGHT }}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={this.onScroll.bind(this)}
        >
          <View style={r.margin15}>
            <FaBoldMulti size={23}>
              علیرضا رضایی
            </FaBoldMulti>
            <Fa style={[r.grayMid]} size={13}>گلستان - ایران</Fa>
            <View style={[r.rtl, r.spaceBetween, r.verticalPadd10, r.top10]}>
              <Fa style={[r.grayMid, r.top3]} size={12}>کاربر تایید شده</Fa>
              <AirIcon
                name={'ok-fill'}
                size={22}
                style={[r.green, r.centerText, { width: 22 }]}
              />
            </View>
            <View style={g.line} />

            <View style={[r.verticalPadd20]}>
              <FaMulti size={12}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
              </FaMulti>
            </View>
            <View style={g.line} />
            <View style={r.vertical10}>
              <Fa size={12}>
                <Text>عضویت از</Text>
                <Text>   1396/12/12</Text>
              </Fa>
            </View>
            <View style={g.line} />

            <View style={r.vertical10}>
              <FaBold size={13}>شغل</FaBold>
              <FaMulti size={12} style={r.top5}>
                لیدر تور گردشگری آژانس سیر و سفر
              </FaMulti>
            </View>
            <View style={g.line} />

            <View style={r.vertical10}>
              <FaBold size={13}>تحصیلات</FaBold>
              <FaMulti size={12} style={r.top5}>
                کارشناسی ارشد گردشگری . کارشناس هتل داری
              </FaMulti>
            </View>
            <View style={g.line} />

            <View style={r.vertical10}>
              <FaBold size={13}>زبان محاوره</FaBold>
              <FaMulti size={12} style={r.top5}>
                فارسی . ترکی . گیلکی
              </FaMulti>
            </View>
            <View style={g.line} />

            <View style={[r.top10]}>
              <FaBold size={18}>
                <Text> 15 </Text>
                دیدگاه
              </FaBold>
              <View style={[r.rtl, r.top15]}>
                <Image
                  style={[g.reviewAvatar]}
                  source={require('./imgs/profile.jpg')}
                />
                <View style={[r.verticalCenter, r.rightPadd10]}>
                  <FaBold size={12} style={r.grayMid}>علیرضا رضایی</FaBold>
                  <Fa size={9} style={r.grayLight}>1396/6/7</Fa>
                </View>
              </View>
              <View style={[r.vertical10]}>
                <FaMulti size={12} style={[r.grayMid]}>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                </FaMulti>
              </View>
            </View>

            <View style={g.line} />
            <View style={r.vertical10}>
              <Fa size={14} style={g.primary}>همه دیدگاه ها</Fa>
            </View>
            <View style={g.line} />

            <View style={r.vertical20}>
              <FaBold size={13}>اطلاعات تایید شده</FaBold>
              <FaMulti size={12} style={r.top5}>
                تصویر . تلفن ثابت . تلفن همراه . کد ملی . ایمیل . تلگرام
              </FaMulti>
            </View>
            <View style={g.line} />
          </View>

          <View style={[r.bottom20]}>
            <View style={[r.paddHoriz15]}>
              <FaBold size={15} style={[r.grayDark]}>
                خانه ها
              </FaBold>
            </View>
            <InvertibleScrollView
              contentContainerStyle={[r.leftPadd15, r.top10]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyboardDismissMode={'on-drag'}
              inverted
            >
              <View style={[g.hmItem]}>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0.1)'}
                  onPress={() => console.log('hey')}
                >
                  <View>
                    <Image
                      source={require('./imgs/hmTest01.jpg')}
                      style={[g.hmItemImg, g.round]}
                      resizeMode={'cover'}
                    />
                    <View style={r.topPadd5}>
                      <FaMulti numberOfLines={2} style={r.grayDark}>
                        ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس
                      </FaMulti>
                      <View style={[r.rtl, r.spaceBetween, r.rightPadd5]}>
                        <View style={[r.row]}>
                          <FaBold size={19} style={[g.exItemPrice]}>1250</FaBold>
                          <LineIcon name={'money'} size={20} style={r.gray} />
                        </View>
                        <View style={[r.rtl, r.top5]}>
                          <Text>
                            <LineIcon name={'star'} style={g.primary} size={11} />
                            <LineIcon name={'star'} style={g.primary} size={11} />
                            <LineIcon name={'star'} style={g.primary} size={11} />
                            <LineIcon name={'star'} style={g.primary} size={11} />
                            <LineIcon name={'star'} style={g.primary} size={11} />
                          </Text>
                          <Fa style={[r.gray, r.rightMargin5]} size={9}>259 نظر</Fa>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[r.absolute, r.left, r.margin5, r.center, g.heartWrapper]}
                  onPress={() => {
                    this.state.exItemHeart_01 === true ?
                      this.setState({ exItemHeart_01: false }) :
                      this.setState({ exItemHeart_01: true })
                  }}
                >
                  {this.state.exItemHeart_01 === true ? <HeartFull /> : <HeartEmpty />}
                </TouchableOpacity>
              </View>

              <View style={[g.hmItem]}>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0.1)'}
                  onPress={() => console.log('hey')}
                >
                  <View>
                    <Image
                      source={require('./imgs/hmTest01.jpg')}
                      style={[g.hmItemImg, g.round]}
                      resizeMode={'cover'}
                    />
                    <View style={r.topPadd5}>
                      <FaMulti numberOfLines={2} style={r.grayDark}>
                        ویلای فول در شهر نور
                      </FaMulti>
                      <View style={[r.rtl, r.spaceBetween, r.rightPadd5]}>
                        <View style={[r.row]}>
                          <FaBold size={19} style={[g.exItemPrice]}>1250</FaBold>
                          <LineIcon name={'money'} size={20} style={r.gray} />
                        </View>
                        <View style={[r.rtl, r.top5]}>
                          <Text>
                            <LineIcon name={'star'} style={g.primary} size={11} />
                            <LineIcon name={'star'} style={g.primary} size={11} />
                            <LineIcon name={'star'} style={g.primary} size={11} />
                            <LineIcon name={'star'} style={g.primary} size={11} />
                            <LineIcon name={'star'} style={g.primary} size={11} />
                          </Text>
                          <Fa style={[r.gray, r.rightMargin5]} size={9}>259 نظر</Fa>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableHighlight>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[r.absolute, r.left, r.margin5, r.center, g.heartWrapper]}
                  onPress={() => {
                    this.state.exItemHeart_01 === true ?
                      this.setState({ exItemHeart_01: false }) :
                      this.setState({ exItemHeart_01: true })
                  }}
                >
                  {this.state.exItemHeart_01 === true ? <HeartFull /> : <HeartEmpty />}
                </TouchableOpacity>
              </View>
            </InvertibleScrollView>
          </View>

          <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
          <View>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000011', false)}
              onPress={() => {
                this.props.navigator.push({
                  screen: 'mrxrinc.ReportUser'
                })
              }}
            >
              <View
                style={[r.rtl, r.horizCenter, r.verticalPadd20, r.paddHoriz20]}
                pointerEvents={'box-only'}
              >
                <Fa style={[r.grayDark]} size={14}>گزارش این کاربر</Fa>
              </View>
            </TouchableNativeFeedback>
          </View>

        </ScrollView>
      </View>
    )
  }
}
