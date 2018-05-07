import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback
} from 'react-native'
import Swiper from 'react-native-swiper'
import * as Animatable from 'react-native-animatable'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold, FaBoldMulti } from './assets/Font'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

export default class HomeGallery extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  changeImage(index) {
    this.refs.img.fadeOut(500)
    this.setState({ index })
    this.refs.img.fadeIn(500)
  }

  render() {
    let img = (
      <Image
        style={[{ height: '100%', width: '100%' }]}
        resizeMode={'cover'}
        source={require('./imgs/AboutSlide01.jpg')}
      />)

    if (this.state.index === 1) {
      img = (
        <Image
          style={[{ height: '100%', width: '100%' }]}
          resizeMode={'cover'}
          source={require('./imgs/AboutSlide02.jpg')}
        />
      )
    } else if (this.state.index === 2) {
      img = (
        <Image
          style={[{ height: '100%', width: '100%' }]}
          resizeMode={'cover'}
          source={require('./imgs/AboutSlide03.jpg')}
        />
      )
    } else if (this.state.index === 3) {
      img = (
        <Image
          style={[{ height: '100%', width: '100%' }]}
          resizeMode={'cover'}
          source={require('./imgs/AboutSlide04.jpg')}
        />
      )
    }

    return (
      <View style={[r.full, r.bgBlack]}>
        <View style={[r.absolute, r.zIndex5, { top: 20, right: 0 }]}>
          <TouchableNativeFeedback
            onPress={() => {
              this.props.navigator.pop()
            }}
            background={TouchableNativeFeedback.Ripple('#ffffff33', true)}
            delayPressIn={0}>
            <View
              pointerEvents='box-only'
              style={[r.center, r.full, { width: 70, height: 70 }]}
            >
              <Text style={[r.white, r.flipX, g.navBarBtnIcon]}>
                <AirIcon name={'left-arrow-bold'} size={18} />
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <Animatable.View
          ref={'img'}
          style={[r.full, r.absolute, { height: '100%', width: '100%' }]}
        >
          {img}
        </Animatable.View>

        <View style={[r.full, r.zIndex1]}>
          <Swiper
            onIndexChanged={index => this.changeImage(index)}
            loop={false}
            dotStyle={{ backgroundColor: '#ffffff55' }}
            activeDotStyle={{
              backgroundColor: '#ffffffdd',
              width: 12,
              height: 12,
              borderRadius: 6,
              marginHorizontal: 2
            }}
            autoplay
            autoplayTimeout={6}
          >
            <View style={[r.full, r.center, r.paddHoriz40]}>
              <FaBoldMulti style={[r.white, r.centerText]} size={25}>
                با اشتراک بخش یا کل خانه تان کسب درآمد کنید
              </FaBoldMulti>
            </View>
            <View style={[r.full, r.center, r.paddHoriz40]}>
              <FaBoldMulti style={[r.white, r.centerText]} size={25}>
                از همسایگی با مهمان هایی از سراسر ایران لذت ببرید
              </FaBoldMulti>
            </View>
            <View style={[r.full, r.center, r.paddHoriz40]}>
              <FaBoldMulti style={[r.white, r.centerText]} size={25}>
                با اکانت تایید شده و معتبرتان، شما تصمیم میگیرید که چه کسانی می توانند درخواست اجاره خانه شما را بدهند
              </FaBoldMulti>
            </View>
            <View style={[r.full, r.center, r.paddHoriz40]}>
              <FaBoldMulti style={[r.white, r.centerText]} size={25}>
                برای خانه تان شرایط استفاده و قوانین مشخصی تعیین کنید
              </FaBoldMulti>
            </View>
          </Swiper>
        </View>
        <View style={[g.bgAccent, { height: 50 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            onPress={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.About'
              })
            }}
          >
            <View style={[r.full, r.center]} pointerEvents='box-only' >
              <FaBold style={r.white} size={15}>
                خانه خود را لیست کنید!
              </FaBold>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}
