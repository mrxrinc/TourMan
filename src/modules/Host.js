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
import { connect } from 'react-redux'
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
import { userToStore } from '../actions/userActions'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

const HEADER_MAX_HEIGHT = 250
const HEADER_MIN_HEIGHT = 75
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class Host extends Component {
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
      ownedHouses: []
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
          
          // getting similar houses
          axios.get(`${baseURL}api/homes`, { params: { host: hostId } })
            .then(ownedHouses => {
              this.setState({ ownedHouses: ownedHouses.data }, () => {
                console.log('OwnedHouses : ', this.state.ownedHouses)
              })
            })
            .catch(err => console.log('Error on getting OwnedHouses : ', err))
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

  liked = (item) => {
    if (this.props.user.likes.indexOf(item) === -1) {
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
          this.setState({
            loading: false,
            pullRefresh: false
          })
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
                <View>
                  <View style={[r.rtl, r.spaceBetween, r.verticalPadd10, r.top10]}>
                    <Fa style={[r.grayMid, r.top3]} size={12}>کاربر تایید شده</Fa>
                    <AirIcon
                      name={'ok-fill'}
                      size={22}
                      style={[r.green, r.centerText, { width: 22 }]}
                    />
                  </View>
                  <View style={g.line} />
                </View>
              )}
  
              {this.state.host.about && (
                <View style={[r.verticalPadd20]}>
                  <FaMulti size={12}>
                    {this.state.host.about}
                  </FaMulti>
                  <View style={g.line} />
                </View>
              )}

              <View style={r.vertical10}>
                <Fa size={12}>
                  عضویت از   {this.state.host.registerDate}
                </Fa>
                <View style={g.line} />
              </View>
  
              {this.state.host.job && (
                <View style={r.vertical10}>
                  <FaBold size={13}>شغل</FaBold>
                  <FaMulti size={12} style={r.top5}>
                    {this.state.host.job}
                  </FaMulti>
                  <View style={g.line} />
                </View>
              )}
  
              {this.state.host.education && (
                <View style={r.vertical10}>
                  <FaBold size={13}>تحصیلات</FaBold>
                  <FaMulti size={12} style={r.top5}>
                    {this.state.host.education}
                  </FaMulti>
                  <View style={g.line} />
                </View>
              )}
  
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
                  </View>
              )}
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
                >
                  {this.state.host.reviewsCount > 0 ? (
                    `همه ${this.state.host.reviewsCount} دیدگاه`
                  ) : (
                      'ارسال دیدگاه'
                  )}
                </Fa>
              </View>
              <View style={g.line} />
  
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

              {this.state.ownedHouses.length !== 0 && (
                <View style={[r.bottom20]}>
                  <View style={[r.paddHoriz15]}>
                    <FaBold size={15} style={[r.grayDark]}>
                        {`خانه های ${this.state.host.firstName}`}
                    </FaBold>
                  </View>
                  <FlatList
                    data={this.state.ownedHouses}
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
                        like={this.liked(item._id)}
                        likePress={() => this.handleLike(item._id)}
                        onPress={() => {
                          this.props.navigator.push({
                            screen: 'mrxrinc.HomeItem',
                            passProps: { homeId: item._id, dontEraseHomeData: true }
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


function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userToStore: (userInfo) => dispatch(userToStore(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Host)
