import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

const NAVBAR_HEIGHT = 75

export default class Where extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[r.wFull, { height: 150, elevation: 2, borderRadius: 0.1}]}>
          <View style={[r.wFull, r.rtl, { height: 75, paddingTop: 25 }]}>
            <View style={{ width: 60, height: 50 }}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', true)}
                onPress={() => this.props.navigator.dismissModal()}>
                <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                  <AirIcon name={'close-bold'} size={14} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={[r.full, r.padd15]}>
            <TextInput
              style={[r.full, r.font, r.bold, r.rightPadd10, r.rightText, { fontSize:20 }]}
              placeholder={'کجا ؟'}
              placeholderTextColor={'#bebebe'}
              returnKeyType={'search'}
              underlineColorAndroid={'transparent'}
              autoFocus
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View>
            <View>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', false)}
                onPress={() => console.log('global search')}>
                <View style={[r.rtl, r.horizCenter, r.verticalPadd20 , r.paddHoriz20]}
                  pointerEvents={'box-only'}>
                  <AirIcon name={'map-marker'}  size={16} style={[r.grayDark]}/>
                  <a.Fa style={[r.grayDark, r.rightMargin5]} size={14}>کل کشور</a.Fa>
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={[g.line,{marginVertical:0, marginHorizontal:15}]}></View>
          </View>

        </ScrollView>
      </View>
    )
  }
}
