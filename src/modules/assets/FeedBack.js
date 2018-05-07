import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './air_font_config.json'
import r from '../styles/Rinc'
import g from '../styles/General'
import { Fa } from './Font'

const AirIcon = createIconSetFromFontello(airConfig)


export default class FeedBack extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state={
    borderColor: '#e6e6e6'
  }

  render() {
    return (
      <ScrollView style={[g.feedBackWrap, r.bgWhite]}>
        <View style={[r.rtl, r.topPadd15, { height: 75 }]}>
          <View style={g.regClose}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={() => this.props.navigator.dismissModal()}>
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <AirIcon name={'left-arrow-bold'} size={18}
                  style={[r.grayDark, r.flipX, r.centerText, { width: 25 }]}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={[r.padd20, r.top20]}>
          <Fa>درخواست خود را وارد کنید</Fa>
          <TextInput
            style={[r.top20, g.feedbackBox, r.rightText, r.grayDark, r.padd20,
              { borderColor: this.state.borderColor }]}
            multiline
            onFocus={() => this.setState({ borderColor: '#0c98a6' })}
            onBlur={() => this.setState({ borderColor: '#e6e6e6' })}
            underlineColorAndroid={'transparent'}
            placeholder={'هرگونه نظر، پیشنهاد، انتقاد، نقص برنامه یا موارد دیگر را میتوانید با ما در میان بگذارید...'}
            placeholderTextColor={'#d7d7d7'}
          />
          <View style={[r.center, r.top10, r.bgWhite, g.tripsBtnWrap]}>
            <TouchableOpacity
              style={[g.tripsBTN, r.bgWhite, r.center]}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigator.push({
                  screen: 'mrxrinc.Explore',
                  animationType: 'fade'
                })
              }}
            >
              <Fa size={13} style={{ color: '#00A596' }}>ارسال</Fa>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    )
  }
}
