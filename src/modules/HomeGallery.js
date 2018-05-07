import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  ViewPagerAndroid,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

const window = Dimensions.get('window')

export default class HomeGallery extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props)
    this.state = {
      activeImage: 0,
      allImages: 25,
    }
  }

  pagerPage(e) {
    const index = e.nativeEvent.position
    this.setState({ activeImage: index })
  }

  render() {
    const imagesHeight = 450
    return (
      <View style={[r.full, r.verticalCenter, r.bgBlack]}>
        <View style={[g.navBar, r.top]}>
          <View style={[r.full, r.rtl]}>
            <TouchableNativeFeedback
              onPress={() => {
                this.props.navigator.pop()
              }}
              background={TouchableNativeFeedback.Ripple('#ffffff33',true)}
              delayPressIn={0}>
              <View pointerEvents='box-only' style={[g.navBarBtn, r.center]}>
                <Animated.Text style={[r.white, r.flipX, g.navBarBtnIcon]}>
                  <AirIcon name={'left-arrow-bold'} size={18} />
                </Animated.Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View>
          <ViewPagerAndroid
            style={{ height: imagesHeight }}
            onPageSelected={(e) => { this.pagerPage(e) }}
          >
            <View style={[r.center]}>
              <Image
                style={{ height: imagesHeight, }}
                resizeMode={'contain'}
                source={require('./imgs/exTest01.jpg')}
              />
            </View>
            <View style={[r.center]}>
              <Image
                style={{ height: imagesHeight, }}
                resizeMode={'contain'}
                source={require('./imgs/hmTest01.jpg')}
              />
            </View>
            <View style={[r.center]}>
              <Image
                style={{ height: imagesHeight, }}
                resizeMode={'contain'}
                source={require('./imgs/hmTest01.jpg')}
              />
            </View>
          </ViewPagerAndroid>
        </View>
        <View style={[r.absolute, r.bottom, r.padd20, {width: 120}]}>
          <a.FaBold style={[r.centerText, { color: '#ffffff88' }]} size={20}>
            <Text>{this.state.activeImage + 1}</Text>
            <Text> / </Text>
            <Text>{this.state.allImages}</Text>
          </a.FaBold>
        </View>

      </View>
    )
  }
}
