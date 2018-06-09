import React, { Component } from 'react'
import {
  View,
  Animated,
  Easing,
  TouchableNativeFeedback
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from '../styles/Rinc'
import g from '../styles/General'
import { FaBold } from './Font'
import airConfig from './air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)
const AnimatableAirIcon = Animatable.createAnimatableComponent(AirIcon)

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
    }) 
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
      <Animatable.View
        style={[g.navBar, r.rtl, this.props.style,
          { borderBottomWidth: bottomBorder }]}
        animation={'fadeIn'}
        duration={500}
      >
        <Animated.View style={[g.navBarGradient, { opacity: gradient }]}>
          <LinearGradient
            style={g.navBarGradient}
            colors={['rgba(0,0,0,0.4)', 'transparent']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 1 }} 
          />
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
          {this.props.pressLike && (
            <TouchableNativeFeedback
              onPress={this.props.pressLike}
              background={TouchableNativeFeedback.Ripple('#00000011', true)}
              delayPressIn={0}
            >
              <View pointerEvents='box-only' style={[g.navBarBtn, r.center]}>
                  {this.props.liked ? (
                    <Animatable.View
                      animation={'zoomIn'}
                      duration={300}
                      easing={'ease-out-back'}
                    >
                      <AirIcon
                        name={'heart'}
                        size={17}
                        style={[r.red, r.centerText, { width: 20 }]}
                      />
                      <AirIcon
                        name={'heart-alt'}
                        size={19}
                        color={'#fff'}
                        style={[r.absolute, r.centerText, { top: -1, left: 0, width: 20 }]}
                      />
                    </Animatable.View>
                  ) : (
                    <Animatable.View
                      animation={'zoomOut'}
                      duration={300}
                      easing={'ease-in-back'}
                      direction={'reverse'}
                    >
                      <AnimatableAirIcon
                        name={'heart-outlined-bold'}
                        size={16}
                        style={[r.centerText, { width: 20, color: iconColor }]}
                      />
                    </Animatable.View>
                  )}
              </View>
            </TouchableNativeFeedback>)
          }

          {this.props.pressShare && (
            <TouchableNativeFeedback
              onPress={this.props.pressShare}
              background={TouchableNativeFeedback.Ripple('#00000011', true)}
              delayPressIn={0}
            >
              <View pointerEvents='box-only' style={[g.navBarBtn, r.center]}>
                <Animated.Text style={[{ color: iconColor }, g.navBarBtnIcon]}>
                  <AirIcon name={'share-android-bold'} size={18} />
                </Animated.Text>
              </View>
            </TouchableNativeFeedback>)
          }

          {this.props.sendReview && (
            <TouchableNativeFeedback
              onPress={this.props.sendReview}
              background={TouchableNativeFeedback.Ripple('#00000011', true)}
              delayPressIn={0}
            >
              <View pointerEvents='box-only' style={[g.navBarBtn, r.center]}>
                <Animated.Text style={[g.primary, g.navBarBtnIcon]}>
                  <AirIcon name={'add'} size={22} />
                </Animated.Text>
              </View>
            </TouchableNativeFeedback>)
          }
        </View>
      </Animatable.View>
    )
  }
}
