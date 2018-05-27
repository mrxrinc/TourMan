import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Animated,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native'
import axios from 'axios'
import StarRating from 'react-native-star-rating'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBoldMulti, FaMulti, FaBold } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import { RowItem } from './assets/Assets'
import { baseURL } from '../constants/api'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

const HEADER_MAX_HEIGHT = 250
const HEADER_MIN_HEIGHT = 75
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

export default class Host extends Component {
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
        HEADER_MIN_HEIGHT,
      ),
      host: { languages: [] },
      lastReview: null,
      loading: true,
      homeHeart_01: false,
    }
  }

  componentWillMount() {
    const { hostId } = this.props
    axios.get(`${baseURL}api/users/${hostId}`)
      .then(user => {
        this.setState({ host: user.data }, () => {
          console.log('Host data : ', this.state.host)

          // getting review and rating
          axios.get(`${baseURL}api/reviews/${this.state.host._id}`)
            .then(res => {
              this.setState({ lastReview: res.data[0], loading: false })
            })
            .catch(err => {
              ToastAndroid.show('در دریافت نظرات کاربران مشکلی پیش آمد!', ToastAndroid.LONG)
              console.log(err)
            })
        })

        
      })
      .catch(err => {
        ToastAndroid.show('مشکلی در دریافت اطلاعات میزبان پیش آمد!', ToastAndroid.SHORT)
        console.log(err)
      })
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

  renderLanguageName = () => {
    const array = []
    const langChars = this.state.host.languages
    for (let i = 0; i < langChars.length; i++) {
      switch (langChars[i]) {
        case 'FA':
          array.push('فارسی')
          break
        case 'TR':
          array.push('ترکی')
          break
        case 'EN':
          array.push('انگلیسی')
          break
        case 'KR':
          array.push('کردی')
          break
        case 'GL':
          array.push('گیلکی')
          break
        default:
          return null
      }
    }
    return array.join(' / ')
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
          <NavBar animate={navAnimate} back={() => this.props.navigator.pop()} />
          <View>
            {!this.state.loading && (
              <Animated.Image
                style={[r.wFull, r.bgLight3, { height: headerHeight, opacity: headerBG }]}
                source={{ uri: this.state.host.avatar }}
              />
            )}
          </View>
        </Animated.View>
        {this.state.loading ? (
          <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
            <Loading />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ 
              marginTop: HEADER_MAX_HEIGHT,
              paddingBottom: HEADER_MAX_HEIGHT 
            }}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={this.onScroll.bind(this)}
          >
            <View style={r.margin15}>
              <FaBoldMulti size={23}>
                <Text>{this.state.host.firstName}</Text>
                <Text> </Text>
                <Text>{this.state.host.lastName}</Text>
              </FaBoldMulti>
              {this.state.host.location && (
                <Fa style={[r.grayMid]} size={13}>{this.state.host.location} - ایران</Fa>
              )}
              {this.state.host.verified && (
                <View style={[r.rtl, r.spaceBetween, r.verticalPadd10, r.top10]}>
                  <Fa style={[r.grayMid, r.top3]} size={12}>کاربر تایید شده</Fa>
                  <AirIcon
                    name={'ok-fill'}
                    size={22}
                    style={[r.green, r.centerText, { width: 22 }]}
                  />
                </View>
              )}
              <View style={g.line} />
  
              <View style={[r.verticalPadd20]}>
                <FaMulti size={12}>
                  {this.state.host.about}
                </FaMulti>
              </View>
              <View style={g.line} />
              <View style={r.vertical10}>
                <Fa size={12}>
                  <Text>عضویت از</Text>
                  <Text style={{ textAlign: 'left'}}>   {this.state.host.registerDate}</Text>
                </Fa>
              </View>
              <View style={g.line} />
  
              <View style={r.vertical10}>
                <FaBold size={13}>شغل</FaBold>
                <FaMulti size={12} style={r.top5}>
                  {this.state.host.job}
                </FaMulti>
              </View>
              <View style={g.line} />
  
              <View style={r.vertical10}>
                <FaBold size={13}>تحصیلات</FaBold>
                <FaMulti size={12} style={r.top5}>
                  {this.state.host.education}
                </FaMulti>
              </View>
              <View style={g.line} />
  
              <View style={r.vertical10}>
                <FaBold size={13}>زبان محاوره</FaBold>
                <FaMulti size={12} style={r.top5}>
                  {this.renderLanguageName()}
                </FaMulti>
              </View>
              <View style={g.line} />
              
              {this.state.lastReview && (
                  <View>
                    <View style={[r.top10]}>
                      <FaBold size={18}>
                        <Text> {this.state.host.reviewsCount} </Text>
                        دیدگاه
                  </FaBold>
                      <View style={[r.rtl, r.top15]}>
                        <Image
                          style={[g.reviewAvatar]}
                          source={{ uri: this.state.lastReview.avatar }}
                        />
                        <View style={[r.verticalCenter, r.rightPadd10]}>
                          <FaBold size={12} style={r.grayMid}>{this.state.lastReview.userFullName}</FaBold>
                          <StarRating
                            disabled
                            maxStars={5}
                            rating={this.state.host.overallRate}
                            starSize={12}
                            fullStarColor={'#02a4a4'}
                            emptyStarColor={'#d3d3d3'}
                          />
                          <Fa size={9} style={r.grayLight}>{this.state.lastReview.date}</Fa>
                        </View>
                      </View>
                      <View style={[r.vertical10]}>
                        <FaMulti size={12} style={[r.grayMid]}>
                          {this.state.lastReview.comment}
                        </FaMulti>
                      </View>
                    </View>

                    <View style={g.line} />
                    <View style={r.vertical10}>
                      <Fa
                        size={14}
                        style={g.primary}
                        onPress={() => {
                          this.props.navigator.push({
                            screen: 'mrxrinc.Reviews',
                            passProps: {
                              parent: this.props.hostId,
                              from: 'user',
                              overallRate: this.state.host.overallRate
                            }
                          })
                        }}
                      >همه دیدگاه ها</Fa>
                    </View>
                    <View style={g.line} />
                  </View>
              )}
  
              {this.state.host.verifiedInfo && (
                <View>
                  <View style={r.vertical20}>
                    <FaBold size={13}>اطلاعات تایید شده</FaBold>
                    <FaMulti size={12} style={r.top5}>
                      {this.state.host.verifiedInfo}
                    </FaMulti>
                  </View>
                  <View style={g.line} />
                </View>
              )}
              
            </View>
  
            <View style={[r.bottom20]}>
              <View style={[r.paddHoriz15]}>
                <FaBold size={15} style={[r.grayDark]}>
                  خانه های 
                  <Text> </Text>
                  <Text>{this.state.host.firstName}</Text>
                </FaBold>
              </View>
              <FlatList
                data={[
                  {
                    id: 1,
                    title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                    image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                    price: 1250,
                    reviews: 152,
                    stars: 5,
                    like: true,
                  },
                  {
                    id: 2,
                    title: 'آپارتمان لوکس سعادت آباد',
                    image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                    price: 1250,
                    reviews: 152,
                    stars: 5,
                    like: false,
                  },
                  {
                    id: 3,
                    title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                    image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                    price: 1250,
                    reviews: 152,
                    stars: 5,
                    like: false,
                  },
                  {
                    id: 4,
                    title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                    image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                    price: 1250,
                    reviews: 152,
                    stars: 5,
                    like: false,
                  },
                ]}
                renderItem={({ item }) => (
                  <RowItem
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    rate={5}
                    reviews={168}
                    price={1260}
                    like={item.like}
                    likePress={() => null}
                    onPress={() => console.log(item.id)}
                  />
                )}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={[r.leftPadd15, r.top10]}
                horizontal
                showsHorizontalScrollIndicator={false}
                initialNumToRender={2}
                keyboardDismissMode={'on-drag'}
                inverted
              />
            </View>
  
            <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
            <View>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', false)}
                onPress={() => {
                  this.props.navigator.showModal({
                    screen: 'mrxrinc.ReportUser',
                    passProps: { hostId: this.state.host._id }
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
        )}
      </View>
    )
  }
}

