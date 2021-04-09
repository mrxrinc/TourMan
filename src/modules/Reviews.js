import React, { Component } from 'react'
import {
  View,
  Image,
  ScrollView,
  FlatList,
  Animated,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import StarRating from 'react-native-star-rating'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaMulti } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import { baseURL } from '../constants/api'
import { storeReviews } from '../actions/generalActions'

const NAVBAR_HEIGHT = 75
class Reviews extends Component {
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
      loading: true
    } 
  }

  componentWillMount() {
    const { parent } = this.props
    axios.get(`${baseURL}api/reviews/${parent}`)
      .then(res => {
        this.props.storeReviews(res.data)
          console.log('reviews hereeeeee :', this.props.reviews)          
          this.setState({ loading: false })
      })
      .catch(err => {
        ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
        console.log(err)
      })
  }

  componentWillUnmount() {
    this.props.storeReviews({})
  }

  onScroll(event) {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
    )(event)
  }

  selectorHomeOrUser = () => {
    switch (this.props.from) {
      case 'home':
        return this.props.home.overallRate
      case 'user':
        return this.props.overallRate
      default: return 0
    }
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
            sendReview={() => {
              this.props.navigator.showModal({
                screen: 'mrxrinc.ReviewSend',
                passProps: { parent: this.props.parent }
              })
            }}
            back={() => this.props.navigator.pop()}
          />
        </Animated.View>

        {this.state.loading && (
          <View style={[r.full, r.center]}>
            <Loading />
          </View>
        )}
        
        {this.props.reviews.length > 0 ? (
          <ScrollView
            contentContainerStyle={{ marginTop: NAVBAR_HEIGHT, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={this.onScroll.bind(this)}
          >
            <View style={[r.bottom50, r.padd20]}>
              <View style={[r.rtl, r.top10, r.bottom30, r.spaceBetween, r.horizCenter]}>
                <FaBold size={25}>نظرات</FaBold>
                <StarRating
                  disabled
                  maxStars={5}
                  rating={this.selectorHomeOrUser()}
                  starSize={22}
                  halfStarEnabled
                  fullStarColor={'#007979'}
                  emptyStarColor={'#d3d3d3'}
                />
              </View>

              <FlatList
                data={this.props.reviews}
                renderItem={({ item }) => (
                  <View>
                    <View style={[r.rtl, r.top15]}>
                      <Image style={[g.reviewAvatar]} source={{ uri: item.avatar }} />
                      <View style={[r.verticalCenter, r.rightPadd10]}>
                        <FaBold size={12} style={r.grayMid}>{item.userFullName}</FaBold>
                        <StarRating
                          disabled
                          maxStars={5}
                          rating={item.rate}
                          starSize={12}
                          fullStarColor={'#02a4a4'}
                          emptyStarColor={'#d3d3d3'}
                        />
                        <Fa size={9} style={r.grayLight}>{item.date}</Fa>
                      </View>
                    </View>
                    <View style={[r.vertical10]}>
                      <FaMulti size={12} style={[r.grayMid]}>
                        {item.comment}
                      </FaMulti>
                    </View>
                  </View>
                )}
                keyExtractor={item => `${item._id}`}
                showsVerticalScrollIndicator={false}
                initialNumToRender={7}
                ItemSeparatorComponent={() => <View style={[g.line, r.vertical20]} />}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={[r.full, r.center]}>
            <FaBold size={20} style={[r.light4]}>اولین دیدگاه را ارسال کنید...</FaBold>
          </View>
        )}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    user: state.user,
    reviews: state.reviews
  }
}

function mapDispatchToProps(dispatch) {
  return {
    storeReviews: (data) => dispatch(storeReviews(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
