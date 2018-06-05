import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
  ToastAndroid,
  FlatList,
  Share
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import Swiper from 'react-native-swiper'
import StarRating from 'react-native-star-rating'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaMulti, FaBoldMulti } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import { RowItem, MapStyle } from './assets/Assets'
import { baseURL } from '../constants/api'
import airConfig from './assets/air_font_config.json'
import lineConfig from './assets/line_font_config.json'
import { stageHome } from '../actions/generalActions'
import { userToStore } from '../actions/userActions'

const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)

const HEADER_MAX_HEIGHT = 250
const HEADER_MIN_HEIGHT = 75
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class HomeItem extends Component {
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
      loading: true,
      lastReview: null,
      activeImage: 0,
      homeHeart_01: false,
      reviewExtendLines: 2,
      debug: 'debug'
    }
  }

  componentWillMount() {
    const { homeId } = this.props
    axios.get(`${baseURL}api/homes/${homeId}`)
      .then(result => {
        this.props.stageHome(result.data)
        setTimeout(() => {
          this.setState({ loading: false })
          console.log('home data : ', this.props.home)

          // getting review and rating
          axios.get(`${baseURL}api/reviews/${this.props.home._id}`)
            .then(res => {
              this.setState({ lastReview: res.data[0] })            
            })
            .catch(err => {
              ToastAndroid.show('در دریافت نظرات کاربران مشکلی پیش آمد!', ToastAndroid.LONG)
              console.log(err)
            })
        }, 0)
      })
      .catch(err => {
        ToastAndroid.show('مشکلی در دریافت اطلاعات خانه پیش آمد!', ToastAndroid.SHORT)
        console.log(err)
      })
  }

  componentWillUnmount() {
    this.props.stageHome({})
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

  share = () => {
    Share.share({
      message: `
        ${this.props.home.title}
        فقط ${this.props.home.price} هزار تومن برای هر شب! 
        مشاهده و رزرو در تورمن 
        http://www.mrxrinc.com
      `,
      url: 'http://www.mrxrinc.com',
      dialogTitle: this.props.home.title
    })
  }

  liked = () => {
    if (this.props.user.likes.indexOf(this.props.home._id) === -1) {
      return false
    }
    return true
  }

  handleLike = (homeId) => {
    const sendToServer = (data, status = 'add') => {
      const msg = status === 'remove' ? 
        'از لیست علاقه مندی ها حذف شد' : 
        'به لیست علاقه مندی های شما اضافه شد'
      axios.put(`${baseURL}api/users/update/${this.props.user._id}`, data)
        .then(res => {
          ToastAndroid.show(msg, ToastAndroid.LONG)
        })
        .catch(err => {
          ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
          console.log(err)
        })
    }
    if (this.props.user.likes.indexOf(homeId) === -1) {
      const likes = this.props.user.likes.map(item => item)
      likes.push(homeId)
      const data = {
        ...this.props.user,
        likes
      }
      this.props.userToStore(data)
      sendToServer(data)
    } else {
      const index = this.props.user.likes.indexOf(homeId)
      const likes = this.props.user.likes.slice(0, index)
        .concat(this.props.user.likes.slice(index + 1))
      const data = {
        ...this.props.user,
        likes
      }
      this.props.userToStore(data)
      sendToServer(data, 'remove')
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
            liked={this.liked()}
            pressLike={() => this.handleLike(this.props.home._id)}
            pressShare={() => this.share()}
          />
          <View style={[r.full]}>
            {!this.state.loading && 
              <Swiper
                paginationStyle={{ bottom: 5 }}
                dotStyle={{ 
                  backgroundColor: '#ffffff55',
                  width: 3,
                  height: 3,
                  borderRadius: 6
                }}
                activeDotStyle={{
                  backgroundColor: '#ffffffdd',
                  width: 6,
                  height: 6,
                  marginHorizontal: 2
                }}
                autoplay
                autoplayTimeout={6}
                loadMinimal
                loadMinimalSize={3}
                loadMinimalLoader={<Loading />}
              >
                {this.props.home.images.map((item, index) => (
                  <View key={index}>
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
                        style={[ r.bgLight3, { height: headerHeight, opacity: headerBG }]}
                        source={{ uri: item }}
                      />
                    </TouchableNativeFeedback>
                  </View>
                ))}
              </Swiper>
            }
          </View>
        </Animated.View>
        {this.state.loading ? (
          <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
            <Loading />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT, paddingBottom: HEADER_MAX_HEIGHT }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={this.onScroll.bind(this)}
          >
            <View style={r.margin15}>
              <FaBoldMulti style={[r.grayDark]} size={16}>
                {this.props.home.title}
              </FaBoldMulti>
              <View style={[r.row, r.top10, { height: 100 }]}>
                <View style={[r.center, { flex: 1 }]}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.navigator.push({
                        screen: 'mrxrinc.Host',
                        passProps: { hostId: this.props.home.host.id }
                      })
                    }}
                  >
                    <View>
                      <Image
                        style={[g.profileThumb]}
                        source={{ uri: this.props.home.host.avatar }}
                      />
                      {this.props.home.host.verified && 
                        <View style={[g.thumbBadge, r.absolute, r.center]}>
                          <LineIcon
                            name={'certificate'}
                            size={20}
                            style={[g.primaryLight]}
                          />
                        </View>
                      }
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[r.verticalCenter, r.rightItems, { flex: 2 }]}>
                  <View>
                    <Fa style={[r.grayMid]} size={13}>
                      {this.props.home.homeType.entire && <Text>کل ملک</Text>}
                      {this.props.home.homeType.privateRoom && <Text>اتاق اختصاصی</Text>}
                      {this.props.home.homeType.sharedRoom && <Text>اتاق مشترک</Text>}
                    </Fa>
                    <View style={[r.rtl, r.verticalCenter]}>
                      <Fa style={[r.grayMid, r.top3]} size={12}>میزبانی توسط</Fa>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          this.props.navigator.push({
                            screen: 'mrxrinc.Host',
                            passProps: { hostId: this.props.home.host.id }
                          })
                        }}
                      >
                        <FaBold style={[g.primaryLight, r.rightMargin10]}>
                            {this.props.home.host.fullName}
                        </FaBold>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <View style={g.line} />
              <View style={[r.rtl, r.spaceBetween, { height: 100, alignItems: 'center' }]}>
                <View style={r.horizCenter}>
                  <Text style={[r.centerText, {width: 40, height: 40 }]}>
                    <AirIcon name={'group'} size={35} style={[r.grayDark]} />
                  </Text>
                  <Fa style={[r.grayDark]} size={12}>{this.props.home.capacity.adults} مهمان</Fa>
                </View>
                <View style={r.horizCenter}>
                  <Text style={[r.centerText, { width: 40, height: 40 }]}>
                    <AirIcon name={'rooms'} size={35} style={[r.grayDark]} />
                  </Text>
                  <Fa style={[r.grayDark]} size={12}>{this.props.home.rooms} اتاق</Fa>
                </View>
                <View style={r.horizCenter}>
                  <Text style={[r.centerText, { width: 40, height: 40 }]}>
                    <AirIcon name={'sofa-bed'} size={35} style={[r.grayDark]} />
                  </Text>
                  <Fa style={[r.grayDark]} size={12}>{this.props.home.beds} تختخواب</Fa>
                </View>
                <View style={r.horizCenter}>
                  <Text style={[r.centerText, { width: 40, height: 40 }]}>
                    <AirIcon name={'bathtub'} size={35} style={[r.grayDark]} />
                  </Text>
                  <Fa style={[r.grayDark]} size={12}>{this.props.home.bathrooms} سرویس بهداشتی</Fa>
                </View>
              </View>
              <View style={g.line} />

              <View style={[r.verticalPadd20]}>
                <TouchableNativeFeedback
                  delayPressIn={0}
                  background={TouchableNativeFeedback.Ripple('#00000011', true)}
                  onPress={() => {
                    this.props.navigator.push({
                      screen: 'mrxrinc.HomeDetails'
                    })
                  }}>
                  <View pointerEvents='box-only'>
                    <FaBold style={r.grayDark} size={14}>درباره این ملک</FaBold>
                    <FaMulti style={[r.grayMid, r.top5]} size={12} numberOfLines={5}>
                      {this.props.home.about.details}
                    </FaMulti>
                    <Fa style={[g.primaryLight, r.leftMargin15, { alignSelf: 'flex-start' }]} size={12}>
                      بیشتر بخوانید ...
                    </Fa>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={g.line} />
              <View style={r.vertical10}>
                <Fa style={[g.grayDark]} size={12}>
                حداقل 
                <Text> {this.props.home.minimumNights} </Text>
                 شب اقامت
                </Fa>
              </View>
              <View style={g.line} />
              <View>
                <TouchableNativeFeedback
                  delayPressIn={0}
                  background={TouchableNativeFeedback.Ripple('#00000011', false)}
                  onPress={() => {
                    this.props.navigator.push({
                      screen: 'mrxrinc.Amenities'
                    })
                  }}
                >
                  <View style={[r.topPadd10]} pointerEvents={'box-only'}>
                    <FaBold style={[r.grayDark]} size={15}>امکانات</FaBold>
                    <View style={[r.rtl, r.vertical10, r.center, r.spaceBetween, { height: 50 }]}>
                      {this.props.home.amenities.wifi && 
                        <AirIcon name={'wifi'} size={30} style={[r.grayMid]} />
                      }
                      {this.props.home.amenities.cooler &&
                        <AirIcon name={'air-conditioning'} size={30} style={[r.grayMid]} />
                      }
                      {this.props.home.amenities.kitchen &&
                        <AirIcon name={'meal'} size={30} style={[r.grayMid]} />
                      }
                      {this.props.home.amenities.heat &&
                        <AirIcon name={'heating'} size={30} style={[r.grayMid]} />
                      }
                      {this.props.home.amenities.accessories &&
                        <AirIcon name={'bathtub'} size={30} style={[r.grayMid]} />
                      }
                      <View style={[r.center, r.paddHoriz10, r.leftMargin10]}>
                        <AirIcon name={'arrow-left'} size={20} style={[g.primary]} />
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
                  latitude: this.props.home.location.latitude + 0.0018,
                  longitude: this.props.home.location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }}
                liteMode
                customMapStyle={MapStyle}
              >
                <MapView.Circle
                  center={{
                    latitude: this.props.home.location.latitude,
                    longitude: this.props.home.location.longitude
                  }}
                  radius={270}
                  strokeWidth={1.5}
                  strokeColor={'#32888b'}
                  fillColor={'rgba(23, 228, 216, 0.06)'} 
                />
              </MapView>
              <InfoBox 
                address={`ایران ، ${this.props.home.province}`} 
                style={[r.absolute, { top: 20 }]} 
              />
            </View>
            <View style={r.margin15}>
              <View style={[r.rtl, r.spaceBetween, { marginBottom: 10 }]}>
                <Fa style={g.grayDark} size={13}>ساعت ورود</Fa>
                <Fa style={g.grayDark} size={13}>{this.props.home.visitHours[0]} به بعد</Fa>
              </View>
              <View style={g.line} />
              <View style={[r.vertical10, r.rtl, r.spaceBetween]}>
                <Fa style={g.grayDark} size={13}>ساعت خروج</Fa>
                <Fa style={g.grayDark} size={13}>قبل از {this.props.home.visitHours[1]}</Fa>
              </View>
              <View style={g.line} />

              <View style={[r.top10]}>
                <FaBold style={[r.grayDark]} size={15}>دیدگاه ها</FaBold>

                {this.state.lastReview && (
                  <View>
                    <View style={[r.rtl, r.top5]}>
                      <Image
                        style={[g.reviewAvatar]}
                        source={{ uri: this.state.lastReview.avatar }} />
                      <View style={[r.verticalCenter, r.rightPadd10]}>
                        <FaBold size={12} style={r.grayMid}>{this.state.lastReview.userFullName}</FaBold>
                        <StarRating
                          disabled
                          maxStars={5}
                          rating={this.state.lastReview.rate}
                          starSize={12}
                          fullStarColor={'#02a4a4'}
                          emptyStarColor={'#d3d3d3'}
                        />
                        <Fa size={9} style={r.grayLight}>{this.state.lastReview.date}</Fa>
                      </View>
                    </View>
                    <View style={[r.vertical10]}>
                      <FaMulti
                        size={12} style={[r.grayMid]}
                        numberOfLines={this.state.reviewExtendLines}
                        onPress={() => this.setState({ reviewExtendLines: 20 })}
                      >
                        {this.state.lastReview.comment}
                      </FaMulti>
                    </View>
                  </View>
                )}

                <View style={[r.row, r.spaceBetween, r.horizCenter, r.top20]}>
                  <StarRating
                    disabled
                    maxStars={5}
                    rating={this.props.home.overallRate}
                    starSize={12}
                    fullStarColor={'#02a4a4'}
                    emptyStarColor={'#d3d3d3'}
                  />
                  <Fa 
                    style={[g.primary, r.rightMargin5]} size={14}
                    onPress={() => {
                      this.props.navigator.push({
                        screen: 'mrxrinc.Reviews',
                        passProps: { parent: this.props.home._id, from: 'home' }
                      })
                    }}
                  >
                    {this.props.home.reviewsCount > 0 ? (
                      `همه ${this.props.home.reviewsCount} دیدگاه`
                    ) : (
                      'ارسال دیدگاه'
                    )}
                    
                  </Fa>
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
                  background={TouchableNativeFeedback.Ripple('#00000011', false)}
                  onPress={() => {
                    this.props.navigator.push({
                      screen: 'mrxrinc.Cancelation'
                    })
                  }}
                >
                  <View 
                    style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd20, r.paddHoriz20]}
                    pointerEvents={'box-only'}
                  >
                    <Fa style={[r.grayDark]} size={14}>شرایط لغو رزرو</Fa>
                    <Fa style={[g.primary]} size={14}>
                      {this.props.home.cancelation === 1 ? 'سختگیرانه' : null}
                      {this.props.home.cancelation === 2 ? 'متعادل' : null}
                      {this.props.home.cancelation === 3 ? 'انعطاف پذیر' : null}
                    </Fa>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]}></View>
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

          </ScrollView>
        )}

        <View style={[g.homeItemFooter, r.bgWhite, r.bottom, r.wFull, r.row]}>
          <View style={[r.center, { flex: 5 }]}>
            <View style={[g.checkAccessBtn, r.overhide]}>
              <TouchableNativeFeedback
                delayPressIn={0}
                onPress={() => {
                  this.props.navigator.showModal({
                    screen: 'mrxrinc.ReservationReviewYourTrip'
                  })
                }}
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
                  <FaBold size={19} style={[g.hmItemPrice, r.grayDark]}>
                    {this.props.home.price}
                  </FaBold>
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
                    screen: 'mrxrinc.Reviews',
                    passProps: { parent: this.props.home._id, from: 'home' }
                  })
                }}
              >
                <View style={[r.rtl, { width: 100 }]} pointerEvents='box-only'>
                  <StarRating
                    disabled
                    maxStars={5}
                    rating={this.props.home.overallRate}
                    starSize={12}
                    fullStarColor={'#02a4a4'}
                    emptyStarColor={'#d3d3d3'}
                  />
                  <FaBold style={[r.gray, r.rightMargin5]} size={9}>
                    {this.props.home.reviewsCount} نظر
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


class InfoBox extends Component {
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

function mapStateToProps(state) {
  return {
    home: state.home,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stageHome: homeInfo => dispatch(stageHome(homeInfo)),
    userToStore: homeInfo => dispatch(userToStore(homeInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeItem)
