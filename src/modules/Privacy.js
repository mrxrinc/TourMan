import React, { Component } from 'react'
import {
  View,
  FlatList,
  ScrollView,
  Animated,
  ToastAndroid
} from 'react-native'
import axios from 'axios'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './assets/air_font_config.json'
import r from './styles/Rinc'
import g from './styles/General'
import { FaMulti } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import { baseURL } from '../constants/api'

const AirIcon = createIconSetFromFontello(airConfig)
const NAVBAR_HEIGHT = 75

export default class Privacy extends Component {
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
    axios.get(`${baseURL}api/privacy`)
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
            title={'قوانین و شرایط استفاده'}
            back={() => {
              if (this.props.modal) this.props.navigator.dismissModal()
              else this.props.navigator.pop()
            }}
          />
        </Animated.View>

          {this.state.data === null ? (
            <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
              <Loading />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={[{ marginTop: NAVBAR_HEIGHT }]}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={this.onScroll.bind(this)}
            >
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <View style={[r.top20, r.rtl]}>
                    <AirIcon name={'tag'} size={16} style={[r.leftMargin10, r.top5]} />
                    <FaMulti size={12} style={[r.grayDark, r.full]}>
                      {item.text}
                    </FaMulti>
                  </View>
                )}
                keyExtractor={item => `${item._id}`}
                showsVerticalScrollIndicator={false}
                initialNumToRender={7}
                ItemSeparatorComponent={() => <View style={g.line} />}
                ListHeaderComponent={() => (
                  <FaMulti size={12} style={r.bottom10}>
                    ما چند قانون برای استفاده از تورمن داریم که شما با استفاده از خدمات این اپلیکیشن موافقت خود رو با این قوانین اعلام می کنید. در صورتی که در قوانین ما تغییراتی صورت بگیرد از طریق همین صفحه بروز رسانی خواهد شد و استفاده مستمر شما از اپلیکشن نشانه آگاهی و موافقت با قوانین مذکور می باشد.
              </FaMulti>
                )}
                contentContainerStyle={[r.padd20, { paddingBottom: 100 }]}
              />
            </ScrollView>
          )}
          
      </View>
    )
  }
}
