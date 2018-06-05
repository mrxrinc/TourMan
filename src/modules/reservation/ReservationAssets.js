import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from '../assets/air_font_config.json'
import lineConfig from '../assets/line_font_config.json'
import r from '../styles/Rinc'
import g from '../styles/General'
import { Fa, FaBold } from '../assets/Font'
import Loading from '../assets/Loading'

const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)

export class NavBar extends Component {
  render() {
    return (
      <View 
        style={[g.navBar, r.rtl, r.relative, r.horizCenter, r.spaceBetween, r.bgWhite, 
          { borderBottomWidth: 1, marginBottom: 0 }]} 
      >
        <TouchableNativeFeedback
          onPress={this.props.back}
          background={TouchableNativeFeedback.Ripple('#00000022', true)}
          delayPressIn={0}
        >
          <View pointerEvents='box-only' style={[g.navBarBtn, r.center, r.rightMargin5]}>
            <Text style={[r.grayMid, r.flipX, g.navBarBtnIcon]}>
              <AirIcon name={'left-arrow-bold'} size={18} style={r.grayDark} />
            </Text>
          </View>
        </TouchableNativeFeedback>

        <View style={[r.center, r.leftMargin20]}>
          <Fa size={16} style={[r.grayLight]}>
            {`مرحله ${this.props.steps[0]} از ${this.props.steps[1]}`}
          </Fa>
        </View>

      </View>
    )
  }
}

export class ReserveBTN extends Component {
  render() {
    const active = this.props.active
    const loading = this.props.loading
    const color = active ? '#fff' : '#00a699'
    const bg = active ? '#00a699' : '#fff'
    const ripple = active ? '#ffffff99' : '#00a69944'
    return (
      <View
        style={[r.vertical5, r.selfCenter, r.overhide,
        {
          width: 250,
          height: 45,
          backgroundColor: bg,
          borderColor: color,
          borderRadius: 25,
          borderWidth: 1,
          opacity: active ? 1 : 0.4
        }]}
      >
        {loading ? (
          <View style={[r.full, r.center]}>
            <Loading white />
          </View>
        ) : (
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple(ripple)}
            onPress={active && !loading ? this.props.onPress : null}
          >
            {this.props.edit ? (
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <Fa size={18} style={[r.leftMargin10, { color }]}>ویرایش خانه</Fa>
                <AirIcon
                  name={'edit'}
                  size={23}
                  color={color}
                  style={[r.absolute, { left: 20 }]}
                />
              </View>
            ) : (
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <Fa size={18} style={[r.leftMargin10, { color }]}>انتشار در تورمن</Fa>
                <AirIcon
                  name={'host-home-alt'}
                  size={23}
                  color={color}
                  style={[r.absolute, { left: 20 }]}
                />
              </View>
            )}
          </TouchableNativeFeedback>
        )}
      </View>
    )
  }
}

export class ReserveFooter extends Component {
  handlePrice = (totalPrice) => {
    if (totalPrice.toString().length > 3 && totalPrice.toString().length < 5) {
      return ` ${totalPrice.toString().substr(0, 1)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    } else if (totalPrice.toString().length >= 5 && totalPrice.toString().length < 6) {
      return ` ${totalPrice.toString().substr(0, 2)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    } else if (totalPrice.toString().length >= 6 && totalPrice.toString().length < 7) {
      return ` ${totalPrice.toString().substr(0, 3)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    }
    return ` ${totalPrice} هزار تومان`
  }
  render() {
    const totalNights = 50
    const totalPrice = `${this.props.price * this.props.totalNights}`
    return (
      <View style={[g.homeItemFooter, this.props.style, r.bgWhite, r.bottom, r.wFull]}>
        {this.props.finish ? (
          <View style={[r.full, r.center]}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={this.props.onPress}
            >
              <View
                style={[r.center, g.bgAccent, r.round3, r.wFull, { height: 45 }]}
                pointerEvents='box-only'
              >
                <FaBold size={20} style={r.white}>رزرو خانه</FaBold>
              </View>
            </TouchableNativeFeedback>
          </View>
        ) : (
            <View style={[r.row, r.full]}>
              <View style={[r.center, { flex: 2 }]}>
                <TouchableNativeFeedback
                  delayPressIn={ 0 }
                  background={TouchableNativeFeedback.Ripple('#00000022')}
                  onPress={this.props.onPress}
                >
                  <View
                    style={[r.center, g.bgPrimaryLight, r.round3, r.leftMargin20,
                    { width: 130, height: 45 }]}
                    pointerEvents='box-only'
                  >
                    <FaBold size={15} style={r.white}>
                      {this.props.agree ? 'موافقم' : 'بعدی'}
                    </FaBold>
                  </View>
                </TouchableNativeFeedback>
              </View >
          <View style={[r.verticalCenter, { flex: 4 }]}>
            <View style={[r.rightItems]}>
              <View>
                <View style={[r.rtl, r.horizCenter]}>
                  <FaBold size={20} style={[r.grayDark, r.leftMargin3]}>{this.props.price}</FaBold>
                  <LineIcon name={'money'} size={20} style={[r.grayMid]} />
                  <FaBold size={12} style={[r.grayMid, r.rightMargin5, { top: 2 }]}>
                    برای هر شب
                      </FaBold>
                </View>
              </View>
              <View pointerEvents='box-only'>
                <FaBold style={[g.primary]} size={10}>
                  {`هزینه ${totalNights} شب = `}
                  {this.handlePrice(totalPrice)}
                </FaBold>
              </View>
            </View>
          </View>
        </View >
        )}
      </View>
    )
  }
}
