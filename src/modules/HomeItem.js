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
import * as Animatable from 'react-native-animatable'
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
import { resetDays, homeDays } from '../actions/dateActions'

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
      duplicateReserve: false,
      similar: []
    }
  }

  componentWillMount() {
    const { homeId } = this.props
    axios.get(`${baseURL}api/homes/${homeId}`)
      .then(result => {
        this.props.stageHome(result.data)
        setTimeout(() => {
          this.setState({ loading: false })
          this.calcThisHomeOffDays()
          this.duplicateReserveCheck()

          // getting review and rating
          axios.get(`${baseURL}api/reviews/${this.props.home._id}`)
            .then(res => {
              this.setState({ lastReview: res.data[0] })            
            })
            .catch(err => {
              ToastAndroid.show('???? ???????????? ?????????? ?????????????? ?????????? ?????? ??????!', ToastAndroid.LONG)
              console.log(err)
            })
          
          // getting similar houses
          axios.get(`${baseURL}api/homes`, { 
            params: { 
              province: this.props.home.province,
              price: [this.props.home.price - 50, this.props.home.price + 50],
              not: this.props.home._id
             } 
          })
            .then(similarItems => {
              this.setState({ similar: similarItems.data }, () => {
                console.log('SIMILAR : ', this.state.similar)
              })
            })
            .catch(err => console.log('Error on getting similar Homes : ', err))
        }, 0)
      })
      .catch(err => {
        ToastAndroid.show('?????????? ???? ???????????? ?????????????? ???????? ?????? ??????!', ToastAndroid.SHORT)
        console.log(err)
      }) 
    }

  componentWillUnmount() {
    // in case user come here from host page, we shouldnt erase home data,
    //cox he will pop back to home!
    if (!this.props.dontEraseHomeData) { 
      this.props.stageHome({})
    }
    this.props.resetDays()
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

  duplicateReserveCheck = () => {
    axios.get(`${baseURL}api/reserve/duplicateCheck/${this.props.user._id}/${this.props.home._id}`)
      .then(res => {
        if (res.data.length) {
          this.setState({ duplicateReserve: true })
        }
      }).catch(err => console.log('duplicate Reserve error', err))
  }

  calcThisHomeOffDays = () => {
    const thisHomeOffDays = this.props.home.reservedDays
    const homeDate = this.props.date.loadedDate.map(month => {
      const newDays = month.days.map(day => {
        let offDay = null
        thisHomeOffDays.forEach(element => {
          if (month.value === element[0] && day.value === element[1]) {
            offDay = true 
          }
        })
        if (offDay) {
          return { ...day, off: true }
        }
        return day
      })
      return { ...month, days: newDays }
    })
    console.log(homeDate)
    this.props.homeDays(homeDate)
  }

  share = () => {
    Share.share({
      message: `
        ${this.props.home.title}
        ?????? ${this.props.home.price} ???????? ???????? ???????? ???? ????! 
        ???????????? ?? ???????? ???? ?????????? 
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

  likedSimilar = (item) => {
    if (this.props.user.likes.indexOf(item) === -1) {
      return false
    }
    return true
  }

  handleLike = (homeId) => {
    const sendToServer = (data, status = 'add') => {
      const msg = status === 'remove' ? 
        '???? ???????? ?????????? ???????? ???? ?????? ????' : 
        '???? ???????? ?????????? ???????? ?????? ?????? ?????????? ????'
      axios.put(`${baseURL}api/users/update/${this.props.user._id}`, data)
        .then(res => {
          ToastAndroid.show(msg, ToastAndroid.LONG)
        })
        .catch(err => {
          ToastAndroid.show('?????????? ???? ???????????? ???? ???????? ?????? ??????!', ToastAndroid.LONG)
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
                        style={[r.bgLight3, { height: headerHeight, opacity: headerBG }]}
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
              <Animatable.View
                style={[r.row, r.top10, { height: 100 }]}
                animation={'fadeIn'}
                duration={2000}
                easing={'ease-out-back'}
                useNativeDriver
              >
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
                      {this.props.home.homeType.entire && <Text>???? ??????</Text>}
                      {this.props.home.homeType.privateRoom && <Text>???????? ??????????????</Text>}
                      {this.props.home.homeType.sharedRoom && <Text>???????? ??????????</Text>}
                    </Fa>
                    <View style={[r.rtl, r.verticalCenter]}>
                      <Fa style={[r.grayMid, r.top3]} size={12}>?????????????? ????????</Fa>
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
              </Animatable.View>
              <View style={g.line} />
              <Animatable.View
                style={[r.rtl, r.spaceBetween, { height: 100, alignItems: 'center' }]}
                animation={'fadeIn'}
                duration={3000}
                easing={'ease-out-back'}
                useNativeDriver
              >
                <View style={r.horizCenter}>
                  <Text style={[r.centerText, {width: 40, height: 40 }]}>
                    <AirIcon name={'group'} size={35} style={[r.grayDark]} />
                  </Text>
                  <Fa style={[r.grayDark]} size={12}>{this.props.home.capacity.adults} ??????????</Fa>
                </View>
                <View style={r.horizCenter}>
                  <Text style={[r.centerText, { width: 40, height: 40 }]}>
                    <AirIcon name={'rooms'} size={35} style={[r.grayDark]} />
                  </Text>
                  <Fa style={[r.grayDark]} size={12}>{this.props.home.rooms} ????????</Fa>
                </View>
                <View style={r.horizCenter}>
                  <Text style={[r.centerText, { width: 40, height: 40 }]}>
                    <AirIcon name={'sofa-bed'} size={35} style={[r.grayDark]} />
                  </Text>
                  <Fa style={[r.grayDark]} size={12}>{this.props.home.beds} ??????????????</Fa>
                </View>
                <View style={r.horizCenter}>
                  <Text style={[r.centerText, { width: 40, height: 40 }]}>
                    <AirIcon name={'bathtub'} size={35} style={[r.grayDark]} />
                  </Text>
                  <Fa style={[r.grayDark]} size={12}>{this.props.home.bathrooms} ?????????? ??????????????</Fa>
                </View>
              </Animatable.View>
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
                    <FaBold style={r.grayDark} size={14}>???????????? ?????? ??????</FaBold>
                    <FaMulti style={[r.grayMid, r.top5]} size={12} numberOfLines={5}>
                      {this.props.home.about.details}
                    </FaMulti>
                    <Fa style={[g.primaryLight, r.leftMargin15, { alignSelf: 'flex-start' }]} size={12}>
                      ?????????? ?????????????? ...
                    </Fa>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={g.line} />
              <View style={r.vertical10}>
                <Fa style={[g.grayDark]} size={12}>
                ?????????? 
                <Text> {this.props.home.minimumNights} </Text>
                 ???? ??????????
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
                    <FaBold style={[r.grayDark]} size={15}>??????????????</FaBold>
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
                address={`?????????? ?? ${this.props.home.province}`} 
                style={[r.absolute, { top: 20 }]} 
              />
            </View>
            <View style={r.margin15}>
              <View style={[r.rtl, r.spaceBetween, { marginBottom: 10 }]}>
                <Fa style={g.grayDark} size={13}>???????? ????????</Fa>
                <Fa style={g.grayDark} size={13}>{this.props.home.visitHours[0]} ???? ??????</Fa>
              </View>
              <View style={g.line} />
              <View style={[r.vertical10, r.rtl, r.spaceBetween]}>
                <Fa style={g.grayDark} size={13}>???????? ????????</Fa>
                <Fa style={g.grayDark} size={13}>?????? ???? {this.props.home.visitHours[1]}</Fa>
              </View>
              <View style={g.line} />

              <View style={[r.top10]}>
                <FaBold style={[r.grayDark]} size={15}>???????????? ????</FaBold>

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
                      `?????? ${this.props.home.reviewsCount} ????????????`
                    ) : (
                      '?????????? ????????????'
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
                    <Fa style={[r.grayDark]} size={14}>???????????? ????????</Fa>
                    <Fa style={[g.primary]} size={14}>?????????? ...</Fa>
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
                    <Fa style={[r.grayDark]} size={14}>?????????? ?????? ????????</Fa>
                    <Fa style={[g.primary]} size={14}>
                      {this.props.home.cancelation === 1 ? '??????????????????' : null}
                      {this.props.home.cancelation === 2 ? '????????????' : null}
                      {this.props.home.cancelation === 3 ? '???????????? ????????' : null}
                    </Fa>
                  </View>
                </TouchableNativeFeedback>
              </View>
              <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
            </View>

            {this.state.similar.length !== 0 && (
              <View style={[r.top40, r.bottom20]}>
                <View style={[r.paddHoriz15]}>
                  <FaBold size={15} style={[r.grayDark]}>???????? ?????? ??????????</FaBold>
                </View>
                <FlatList
                  data={this.state.similar}
                  renderItem={({ item }) => (
                    <RowItem
                      title={item.title}
                      image={item.images[0]}
                      rate={item.overallRate}
                      reviews={item.reviewsCount}
                      price={item.price}
                      verified={item.verified}
                      type={item.homeType}
                      luxury={item.luxury}
                      like={this.likedSimilar(item._id)}
                      likePress={() => this.handleLike(item._id)}
                      onPress={() => {
                        this.props.navigator.push({
                          screen: 'mrxrinc.HomeItem',
                          passProps: { homeId: item._id, fromSimilarHome: true }
                        })
                      }}
                    />
                  )}
                  keyExtractor={item => `${item._id}`}
                  contentContainerStyle={[r.leftPadd15, r.top10]}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  initialNumToRender={2}
                  inverted
                />
              </View>
            )}

          </ScrollView>
        )}

        <Animatable.View
          style={[g.homeItemFooter, r.bgWhite, r.bottom, r.wFull, r.row]}
          animation={'fadeInUp'}
          duration={200}
          delay={500}
          easing={'ease-out-quint'}
          useNativeDriver
        >
          <View style={[r.center, { flex: 5 }]}>
            <View style={[g.checkAccessBtn, r.overhide]}>
              {this.state.duplicateReserve ? (
                <TouchableNativeFeedback
                  delayPressIn={0}
                  onPress={() => null}
                >
                  <View style={[r.full, r.center, { backgroundColor: '#ffb9bb' }]}
                    pointerEvents='box-only'
                  >
                    <FaBold size={15} style={r.white}>???????? ???????? ???????? ??????!</FaBold>
                  </View>
                </TouchableNativeFeedback>
              ) : (
                <TouchableNativeFeedback
                  delayPressIn={0}
                  onPress={() => {
                    this.props.navigator.showModal({
                      screen: 'mrxrinc.When',
                      passProps: { reserve: true }
                    })
                  }}
                >
                  <View style={[r.full, r.center, { backgroundColor: '#ff5555' }]}
                    pointerEvents='box-only'
                  >
                    <FaBold size={15} style={r.white}>???? ????????????</FaBold>
                  </View>
                </TouchableNativeFeedback>
              )}
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
                  ???? ????
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
                    {this.props.home.reviewsCount} ??????
                  </FaBold>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </Animatable.View>
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
                ???????? ???????? ?????? ???? ???????? ???????? ?????????? ????
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
    user: state.user,
    date: state.date
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stageHome: homeInfo => dispatch(stageHome(homeInfo)),
    userToStore: homeInfo => dispatch(userToStore(homeInfo)),
    homeDays: days => dispatch(homeDays(days)),
    resetDays: () => dispatch(resetDays())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeItem)
