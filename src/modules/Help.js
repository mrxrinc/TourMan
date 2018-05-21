import React, { Component } from 'react'
import {
  View,
  FlatList,
  ScrollView,
  Animated,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native'
import axios from 'axios'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './assets/air_font_config.json'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold, FaBoldMulti, FaMulti } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import { baseURL } from '../constants/api'

const AirIcon = createIconSetFromFontello(airConfig)
const NAVBAR_HEIGHT = 75

export default class Help extends Component {
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
      data: null
    }
  }

  componentWillMount() {
    axios.get(`${baseURL}api/help`)
      .then(res => {
        this.setState({ data: res.data })
      })
      .catch(err => {
        ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
        console.log(err)
      })
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
            title={'راهنمای اپلیکشن'}
            back={() => this.props.navigator.pop()}
          />
        </Animated.View>

        {this.state.data === null ? (
          <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
            <Loading />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ marginTop: NAVBAR_HEIGHT, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={this.onScroll.bind(this)}
          >
            <View style={[r.bottom50, r.padd20]}>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <View style={[r.rtl]}>
                    <AirIcon name={'question-alt'} size={16} style={[r.leftMargin10]}/>
                    <View style={r.full}>
                      <FaBoldMulti size={14}>{item.question}</FaBoldMulti>
                      <FaMulti size={12} style={[r.grayDark, r.full]} key={item.id}>
                        {item.answer}
                      </FaMulti>
                    </View>
                  </View>
                )}
                keyExtractor={item => `${item._id}`}
                showsVerticalScrollIndicator={false}
                initialNumToRender={7}
                ItemSeparatorComponent={() => <View style={g.line} />}
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
                    screen: 'mrxrinc.FeedBack'
                  })
                }}
              >
                <View
                  style={[r.full, r.center, g.bgPrimary]}
                  pointerEvents='box-only'
                >
                  <FaBold size={15} style={r.white}>
                    پیام بفرستید
                  </FaBold>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={[r.verticalCenter, { flex: 4 }]}>
            <FaBold size={13} style={[g.hmItemPrice, g.primary]}>
              سوال دیگه ای دارید؟
            </FaBold>
          </View>
        </View>
      </View>
    )
  }
}
