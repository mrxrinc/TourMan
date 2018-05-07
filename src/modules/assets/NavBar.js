import React, { Component } from 'react'
import {
  View,
  Animated,
  Easing,
  TouchableNativeFeedback
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from '../styles/Rinc'
import g from '../styles/General'
import { FaBold } from './Font'
import airConfig from './air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animate: this.props.animate
    }
  }
  render() {
    const iconColor = this.state.animate.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: ['#fff', '#fff', '#697989'],
      extrapolate: 'clamp',
      easing: Easing.ease
    });
    const bottomBorder = this.state.animate.interpolate({
      inputRange: [0, 0.99, 1],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    })
    const gradient = this.state.animate.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[g.navBar, r.rtl, this.props.style,
          { borderBottomWidth: bottomBorder }]}
      >
        <Animated.View style={[g.navBarGradient, { opacity: gradient }]}>
          <LinearGradient
            style={g.navBarGradient}
            colors={["rgba(0,0,0,0.4)", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 1 }} />
        </Animated.View>

        <View style={[r.rtl, { width: 50 }]}>
          <TouchableNativeFeedback
            onPress={this.props.back}
            background={TouchableNativeFeedback.Ripple('#00000011', true)}
            delayPressIn={0}
          >
            <View pointerEvents='box-only' style={[g.navBarBtn, r.center]}>
              <Animated.Text style={[{ color: iconColor }, r.flipX, g.navBarBtnIcon]}>
                <AirIcon name={'left-arrow-bold'} size={18} />
              </Animated.Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        {this.props.title && (
          <View style={[r.full, r.verticalCenter]}>
            <FaBold size={14} style={[r.grayMid, { top: -1 }]}>
              {this.props.title}
            </FaBold>
          </View>
        )}
        <View style={[r.full, r.row, { paddingLeft: 10 }]}>
          {this.props.like && (
            <TouchableNativeFeedback
              onPress={this.props.like}
              background={TouchableNativeFeedback.Ripple('#00000011',true)}
              delayPressIn={0}>
              <View pointerEvents='box-only' style={[g.navBarBtn, r.center]}>
                <Animated.Text style={[{color:iconColor}, g.navBarBtnIcon]}>
                  <AirIcon name={"heart-outlined-bold"} size={18}/>
                </Animated.Text>
              </View>
            </TouchableNativeFeedback>)
          }
          {this.props.share && (
            <TouchableNativeFeedback
              onPress={this.props.share}
              background={TouchableNativeFeedback.Ripple('#00000011',true)}
              delayPressIn={0}>
              <View pointerEvents='box-only' style={[g.navBarBtn, r.center]}>
                <Animated.Text style={[{color:iconColor}, g.navBarBtnIcon]}>
                  <AirIcon name={"share-android-bold"} size={18}/>
                </Animated.Text>
              </View>
            </TouchableNativeFeedback>)
          }
        </View>
      </Animated.View>
    )
  }
}
