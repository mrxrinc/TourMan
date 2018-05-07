import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  ViewPagerAndroid,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback
} from 'react-native'
import MapView from 'react-native-maps'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import InvertibleScrollView from 'react-native-invertible-scroll-view'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaMulti, FaBoldMulti } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import { HeartFull, HeartEmpty, MapStyle } from './assets/Assets'
import airConfig from './assets/air_font_config.json'
import lineConfig from './assets/line_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)
// import * as Animatable from 'react-native-animatable'
// import {createAnimatableComponent} from 'react-native-animatable'
// const AnimatableLineIcon = createAnimatableComponent(LineIcon)
const Pager = Animated.createAnimatedComponent(ViewPagerAndroid)
const window = Dimensions.get('window')

const HEADER_MAX_HEIGHT = 250
const HEADER_MIN_HEIGHT = 75
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export default class HomeItem extends Component {
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
      reviewExtendLines: 2,
      debug: 'debug'
    }
  }

  pagerPage(e) {
    switch (e.nativeEvent.position) {
      case 0:
        this.setState({ activeImage: 0 })
        break
      case 1:
        this.setState({ activeImage: 1 })
        break
      case 2:
        this.setState({ activeImage: 2 })
        break
      case 3:
        this.setState({ activeImage: 3 })
        break
      case 4:
        this.setState({ activeImage: 4 })
        break
      default:
        this.setState({ activeImage: 0 })
    }
  }
  pagerNavDot(e) {
    if (this.state.activeImage === e) {
      return 'rgba(255,255,255,0.9)'
    }
    return 'rgba(255,255,255,0.3)'
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
      // easing: Easing.bezier(0.165, 0.84, 0.44, 1)
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
    const { clampedScroll } = this.state
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
          <NavBar
            animate={navAnimate}
            back={() => this.props.navigator.pop()}
            like={() => console.log('like pressed!')}
            share={() => console.log('share pressed!')}
          />
          <View>
            <Pager
              style={{ height: headerHeight }}
              onPageSelected={(e) => this.pagerPage(e)}
            >
              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#ffffff33', true)}
                  delayPressIn={0}
                  onPress={() => {
                    this.props.navigator.push({
                      screen: 'mrxrinc.HomeGallery'
                    })
                  }}
                >
                  <Animated.Image
                    style={{ height: headerHeight, opacity: headerBG }}
                    source={require('./imgs/hmTest01.jpg')}
                  />
                </TouchableNativeFeedback>
              </View>
              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#ffffff33', true)}
                  delayPressIn={0}
                  onPress={() => {
                    this.props.navigator.push({
                      screen: 'mrxrinc.HomeGallery'
                    })
                  }}
                >
                  <Animated.Image
                    style={{ height: headerHeight, opacity: headerBG }}
                    source={require('./imgs/hmTest01.jpg')}
                  />
                </TouchableNativeFeedback>
              </View>
              <View>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#ffffff33', true)}
                  delayPressIn={0}
                  onPress={() => {
                    this.props.navigator.push({
                      screen: 'mrxrinc.HomeGallery'
                    })
                  }}
                >
                  <Animated.Image
                    style={{ height: headerHeight, opacity: headerBG }}
                    source={require('./imgs/hmTest01.jpg')}
                  />
                </TouchableNativeFeedback>
              </View>
            </Pager>
            <View style={[r.absolute, r.bottom, r.horizCenter, { width: window.width }]}>
              <View style={[g.pagerNav, r.horizCenter, r.row]}>
                <View style={[g.pagerNavDot, { backgroundColor: this.pagerNavDot(0) }]} />
                <View style={[g.pagerNavDot, { backgroundColor: this.pagerNavDot(1) }]} />
                <View style={[g.pagerNavDot, { backgroundColor: this.pagerNavDot(2) }]} />
              </View>
            </View>
          </View>
        </Animated.View>
        <ScrollView
          contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT, paddingBottom: HEADER_MAX_HEIGHT }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={this.onScroll.bind(this)}
        >
          <View style={r.margin15}>
            <FaBoldMulti style={[r.grayDark]} size={16}>
              ویلا در شهر نور با تمامی امکانات
            </FaBoldMulti>
            <View style={[r.row, r.top10, { height: 100 }]}>
              <View style={[r.center, { flex: 1 }]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.props.navigator.push({
                      screen: 'mrxrinc.Host'
                    })
                  }}
                >
                  <View>
                    <Image
                      style={[g.profileThumb]}
                      source={require('./imgs/profile.jpg')}
                    />
                    <View style={[g.thumbBadge, r.absolute, r.center]}>
                      <LineIcon
                        name={'certificate'}
                        size={20}
                        style={[g.primaryLight]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[r.verticalCenter, r.rightItems, { flex: 2 }]}>
                <View>
                  <Fa style={[r.grayMid]} size={13}>کل ملک</Fa>
                  <View style={[r.rtl, r.verticalCenter]}>
                    <Fa style={[r.grayMid, r.top3]} size={12}>میزبانی توسط</Fa>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.props.navigator.push({
                          screen: 'mrxrinc.Host'
                        })
                      }}
                    >
                      <FaBold style={[g.primaryLight, r.rightMargin10]}>
                        علیرضا رضایی
                      </FaBold>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={g.line}></View>
            <View style={[r.rtl, r.spaceBetween, {height: 100, alignItems:'center'}]}>
              <View style={r.horizCenter}>
                <Text style={[r.centerText,{width: 40, height: 40}]}>
                  <AirIcon name={'group'} size={35} style={[r.grayDark]} />
                </Text>
                <Fa style={[r.grayDark]} size={12}>5 مهمان</Fa>
              </View>
              <View style={r.horizCenter}>
                <Text style={[r.centerText,{width: 40, height: 40}]}>
                  <AirIcon name={'rooms'} size={35} style={[r.grayDark]} />
                </Text>
                <Fa style={[r.grayDark]} size={12}>3 اتاق</Fa>
              </View>
              <View style={r.horizCenter}>
                <Text style={[r.centerText,{width: 40, height: 40}]}>
                  <AirIcon name={'sofa-bed'} size={35} style={[r.grayDark]} />
                </Text>
                <Fa style={[r.grayDark]} size={12}>4 تختخواب</Fa>
              </View>
              <View style={r.horizCenter}>
                <Text style={[r.centerText,{width: 40, height: 40}]}>
                  <AirIcon name={'bathtub'} size={35} style={[r.grayDark]} />
                </Text>
                <Fa style={[r.grayDark]} size={12}>2 سرویس بهداشتی</Fa>
              </View>
            </View>
            <View style={g.line}></View>

            <View style={[r.verticalPadd20]}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011',true)}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.HomeDetails'
                  })
                }}>
                <View pointerEvents='box-only'>
                  <FaBold style={r.grayDark} size={14}>درباره این ملک</FaBold>
                  <FaMulti style={[r.grayMid, r.top5]} size={12}>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                  </FaMulti>
                  <Fa style={[g.primaryLight, r.leftMargin15, {alignSelf: 'flex-start'}]} size={12}>
                    بیشتر بخوانید ...
                  </Fa>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={g.line}></View>
            <View style={r.vertical10}>
              <Fa style={[g.grayDark,]} size={12}>حداقل یک شب اقامت</Fa>
            </View>
            <View style={g.line}></View>
            <View>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011',false)}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.Amenities'
                  })
                }}>
                <View style={[r.topPadd10]} pointerEvents={'box-only'}>
                  <FaBold style={[r.grayDark]} size={15}>امکانات</FaBold>
                  <View style={[r.rtl, r.vertical10, r.center, r.spaceBetween,{height:50}]}>
                    <AirIcon name={'wifi'} size={30}  style={[r.grayMid]}/>
                    <AirIcon name={'bathtub'} size={30}  style={[r.grayMid]}/>
                    <AirIcon name={'air-conditioning'} size={30}  style={[r.grayMid]}/>
                    <AirIcon name={'meal'} size={30}  style={[r.grayMid]}/>
                    <AirIcon name={'heating'} size={30}  style={[r.grayMid]}/>
                    <View style={[r.row,r.center, r.paddHoriz10,r.leftMargin10,r.topPadd5]}>
                      <Fa style={[g.primary]} size={30}>5</Fa>
                      <Fa size={15} style={[g.primary, r.leftMargin3]}>+</Fa>
                    </View>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View>
            <MapView
              ref={'map'}
              style={[r.map, g.homeItemMap, r.vertical10]}
              showsCompass={false}
              region={{
                latitude: this.state.locLat + 0.0018,
                longitude: this.state.locLong,
                latitudeDelta: this.state.delta,
                longitudeDelta: this.state.delta,
              }}
              liteMode={true}
              customMapStyle={MapStyle}>
              <MapView.Circle
                center={{
                  latitude: parseFloat(this.state.locLat),
                  longitude: parseFloat(this.state.locLong)
                }}
                radius={270}
                strokeWidth={1.5}
                strokeColor={'#32888b'}
                fillColor={'rgba(23, 228, 216, 0.06)'} />
            </MapView>
            <InfoBox
              address={'تهران ، اقدسیه'}
              style={[r.absolute,{top:20}]} />
          </View>
          <View style={r.margin15}>
            <View style={[r.rtl, r.spaceBetween,{marginBottom:10}]}>
              <Fa style={g.grayDark} size={13}>ساعت شروع بازدید</Fa>
              <Fa style={g.grayDark} size={13}>14 به بعد</Fa>
            </View>
            <View style={g.line}></View>
            <View style={[r.vertical10, r.rtl, r.spaceBetween]}>
              <Fa style={g.grayDark} size={13}>ساعت اتمام بازدید</Fa>
              <Fa style={g.grayDark} size={13}>23 شب</Fa>
            </View>
            <View style={g.line}></View>

            <View style={[r.top10]}>
              <FaBold style={[r.grayDark]} size={15}>دیدگاه ها</FaBold>
              <View style={[r.rtl, r.top5]}>
                <Image
                  style={[g.reviewAvatar]}
                  source={require('./imgs/profile.jpg')}/>
                <View style={[r.verticalCenter, r.rightPadd10]}>
                  <FaBold size={12} style={r.grayMid}>علیرضا رضایی</FaBold>
                  <Fa size={9} style={r.grayLight}>1396/6/7</Fa>
                </View>
              </View>
              <View style={[r.vertical10]}>
                <FaMulti size={12} style={[r.grayMid]}
                  numberOfLines={this.state.reviewExtendLines} >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
                </FaMulti>

                {this.state.reviewExtendLines == 2 ? (
                  <Fa style={[g.primary, r.leftMargin10, {alignSelf: 'flex-start'}]}
                    size={12}
                    onPress={()=> this.setState({reviewExtendLines: 20})}>
                    ادامه ...
                  </Fa>
                ):null}

                <View style={[r.row, r.spaceBetween, r.horizCenter, r.top20]}>
                  <Text>
                    <LineIcon name={'star'} style={g.primary} size={12} />
                    <LineIcon name={'star'} style={g.primary} size={12} />
                    <LineIcon name={'star'} style={g.primary} size={12} />
                    <LineIcon name={'star'} style={g.primary} size={12} />
                    <LineIcon name={'star'} style={g.primary} size={12} />
                  </Text>
                  <Fa style={[g.primary, r.rightMargin5]} size={14}
                    onPress={() => {
                      this.props.navigator.push({
                        screen: 'mrxrinc.Reviews'
                      })
                    }}>
                    همه <Text> 285 </Text> نظر
                  </Fa>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
            <View>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', false)}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.HomeRules'
                  })
                }}
              >
                <View
                  style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd20, r.paddHoriz20]}
                  pointerEvents={'box-only'}
                >
                  <Fa style={[r.grayDark]} size={14}>قوانین مکان</Fa>
                  <Fa style={[g.primary]} size={14}>بخوان ...</Fa>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
            <View>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011',false)}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.Cancelation'
                  })
                }}>
                <View style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd20 ,
                r.paddHoriz20]}
                  pointerEvents={'box-only'}>
                  <Fa style={[r.grayDark]} size={14}>شرایط لغو رزرو</Fa>
                  <Fa style={[g.primary]} size={14}>سختگیرانه</Fa>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[g.line,{marginVertical:0, marginHorizontal:15}]}></View>
          </View>

          <View style={[r.top40, r.bottom20]}>
            <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
              <FaBold size={15} style={[r.grayDark]}>
                خانه های مشابه
              </FaBold>
              <Fa size={13} style={[r.grayLight]}>
                همه
              </Fa>
            </View>
            <InvertibleScrollView
              contentContainerStyle={[r.leftPadd15, r.top10]}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyboardDismissMode={'on-drag'}
              inverted
            >
              <View style={[g.hmItem]}>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0.1)'}
                  onPress={()=> console.log('hey')}
                >
                  <View>
                    <Image
                      source={require('./imgs/hmTest01.jpg')}
                      style={[g.hmItemImg, g.round]}
                      resizeMode={'cover'} />
                    <View style={r.topPadd5}>
                      <FaMulti numberOfLines={2} style={r.grayDark}>
                        ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس
                      </FaMulti>
                      <View style={[r.rtl, r.spaceBetween, r.rightPadd5]}>
                        <View style={[r.row]}>
                          <FaBold size={19} style={[g.hmItemPrice]}>1250</FaBold>
                          <LineIcon name={'money'} size={20} style={r.gray}/>
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
                  onPress={()=>{
                    this.state.exItemHeart_01 == true ?
                      this.setState({exItemHeart_01: false}) :
                      this.setState({exItemHeart_01: true})
                  }}
                >
                  {this.state.exItemHeart_01 == true ? <HeartFull/> : <HeartEmpty/>}
                </TouchableOpacity>
              </View>

              <View style={[g.hmItem]}>
                <TouchableHighlight
                  underlayColor={'rgba(0,0,0,0.1)'}
                  onPress={()=> console.log('hey')}
                >
                  <View>
                    <Image
                      source={require('./imgs/hmTest01.jpg')}
                      style={[g.hmItemImg, g.round]}
                      resizeMode={'cover'} />
                    <View style={r.topPadd5}>
                      <FaMulti numberOfLines={2} style={r.grayDark}>
                        ویلای فول در شهر نور
                      </FaMulti>
                      <View style={[r.rtl, r.spaceBetween, r.rightPadd5]}>
                        <View style={[r.row]}>
                          <FaBold size={19} style={[g.hmItemPrice]}>1250</FaBold>
                          <LineIcon name={'money'} size={20} style={r.gray}/>
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
                  onPress={()=>{
                    this.state.exItemHeart_01 == true ?
                      this.setState({exItemHeart_01: false}) :
                      this.setState({exItemHeart_01: true})
                  }}>
                  {this.state.exItemHeart_01 == true ? <HeartFull/> : <HeartEmpty/>}
                </TouchableOpacity>
              </View>
            </InvertibleScrollView>
          </View>

        </ScrollView>
        <View style={[g.homeItemFooter, r.bgWhite, r.bottom, r.wFull, r.row]}>
          <View style={[r.center, { flex: 5 }]}>
            <View style={[g.checkAccessBtn, r.overhide]}>
              <TouchableNativeFeedback
                delayPressIn={0}
              >
                <View
                  style={[r.full, r.center, { backgroundColor: '#ff5555' }]}
                  pointerEvents='box-only'
                >
                  <FaBold size={15} style={r.white}>
                    چک دسترسی
                  </FaBold>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={[r.verticalCenter, { flex: 4 }]}>
            <View style={[r.topPadd5, r.rightItems]}>
              <View style={[r.rtl, g.hmItemBigTitle]}>
                <View style={[r.rtl]}>
                  <LineIcon name={'money'} size={20} style={r.gray} />
                  <FaBold size={19} style={[g.hmItemPrice, r.grayDark]}>1250</FaBold>
                </View>
                <Fa style={[r.grayMid, r.top5]} size={12}>
                  هر شب
                </Fa>
              </View>
              <TouchableNativeFeedback
                style={r.top}
                delayPressIn={0}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.Reviews'
                  })
                }}
              >
                <View style={[r.rtl, { width: 100 }]} pointerEvents='box-only'>
                  <Text>
                    <LineIcon name={'star'} style={g.primary} size={11} />
                    <LineIcon name={'star'} style={g.primary} size={11} />
                    <LineIcon name={'star'} style={g.primary} size={11} />
                    <LineIcon name={'star'} style={g.primary} size={11} />
                    <LineIcon name={'star'} style={g.primary} size={11} />
                  </Text>
                  <FaBold style={[r.gray, r.rightMargin5]} size={9}>
                    259 نظر
                  </FaBold>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    )
  }
}


class InfoBox extends Component{
  render() {
    return (
      <View style={[r.horizCenter, r.wFull, { height: 70 }, this.props.style]}>
        <View style={[r.horizCenter, r.full, { width: 250 }]}>
          <View
            style={[r.bgWhite, r.verticalCenter, r.rightPadd10,
              { width: 230, height: 50, elevation: 5 }]}
          >
            <View>
              <FaBold style={[r.grayMid]} size={12}>
                {this.props.address}
              </FaBold>
              <Fa style={[r.grayLight]} size={9}>
                مکان دقیق بعد از رزرو مشخص خواهد شد
              </Fa>
            </View>
          </View>
          <View
            style={[r.absolute, r.bgWhite, {
              width: 13,
              height: 13,
              transform: [{ rotate: '45deg' }],
              bottom: 13,
              right: 122,
              elevation: 5
            }]}
          />
        </View>
      </View>
    )
  }
}
