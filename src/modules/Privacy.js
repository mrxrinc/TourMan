import React, { Component } from 'react'
import {
  View,
  FlatList,
  ScrollView,
  Animated
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './assets/air_font_config.json'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaMulti } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'

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
      data: [
        {
          id: 1,
          text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
        },
        {
          id: 2,
          text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
        },
        {
          id: 3,
          text: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
        },
      ]
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
            title={'قوانین و شرایط استفاده'}
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
            <FaMulti size={12} style={r.bottom10}>
              ما چند قانون برای استفاده از تورمن داریم که شما با استفاده از خدمات این اپلیکیشن موافقت خود رو با این قوانین اعلام می کنید. در صورتی که در قوانین ما تغییراتی صورت بگیرد از طریق همین صفحه بروز رسانی خواهد شد و استفاده مستمر شما از اپلیکشن نشانه آگاهی و موافقت با قوانین مذکور می باشد.
            </FaMulti>

            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <View style={[r.top20, r.rtl]}>
                  <AirIcon name={'tag'} size={16} style={[r.leftMargin10, r.top5]}/>
                  <FaMulti size={12} style={[r.grayDark, r.full]} key={item.id}>
                    {item.text}
                  </FaMulti>
                </View>
              )}
              keyExtractor={item => `${item.id}`}
              showsVerticalScrollIndicator={false}
              initialNumToRender={7}
              ItemSeparatorComponent={() => <View style={g.line} />}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}
