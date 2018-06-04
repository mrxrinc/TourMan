import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from '../assets/air_font_config.json'
import r from '../styles/Rinc'
import g from '../styles/General'
import { Fa, FaBold } from '../assets/Font'
import Loading from '../assets/Loading'
import { Switch, Checkbox, IncDecBTN } from '../assets/Assets'

const AirIcon = createIconSetFromFontello(airConfig)

export class NavBar extends Component {
  render() {
    const close = this.props.close ? 'close-bold' : 'left-arrow-bold'
    return (
      <View 
        style={[g.navBar, r.rtl, r.relative, r.horizCenter, r.spaceBetween,
          !this.props.close && r.bgWhite, 
          { borderBottomWidth: this.props.noBorder ? 0 : 1, marginBottom: 0 }]} 
      >
        <TouchableNativeFeedback
          onPress={this.props.back}
          background={TouchableNativeFeedback.Ripple('#00000022', true)}
          delayPressIn={0}
        >
          <View pointerEvents='box-only' style={[g.navBarBtn, r.center, r.rightMargin5]}>
            <Text style={[r.grayMid, r.flipX, g.navBarBtnIcon]}>
              <AirIcon name={close} size={18} style={this.props.close && r.white} />
            </Text>
          </View>
        </TouchableNativeFeedback>
        {this.props.addHome && (
          <TouchableNativeFeedback
            onPress={this.props.addHome}
            background={TouchableNativeFeedback.Ripple('#00000022', true)}
            delayPressIn={0}
          >
            <View pointerEvents='box-only' style={[g.navBarBtn, r.center, r.leftMargin5]}>
              <Text style={[g.primary, g.navBarBtnIcon]}>
                <AirIcon name={'add-listing'} size={22} />
              </Text>
            </View>
          </TouchableNativeFeedback>
        )}
        {this.props.saveAndExit && (
          <TouchableNativeFeedback
            onPress={this.props.saveAndExit}
            background={TouchableNativeFeedback.Ripple('#00000022', true)}
            delayPressIn={0}
          >
            <View pointerEvents='box-only' style={[r.center, { width: 90 }]}>
              <Fa style={[g.primary]}>
                ذخیره و خروج
              </Fa>
            </View>
          </TouchableNativeFeedback>
        )}
        {this.props.addPhotos && (
          <TouchableNativeFeedback
            onPress={this.props.addPhotos}
            background={TouchableNativeFeedback.Ripple('#00000022', true)}
            delayPressIn={0}
          >
            <View pointerEvents='box-only' style={[g.navBarBtn, r.center, r.leftMargin5]}>
              <Text style={[g.primary, g.navBarBtnIcon]}>
                <AirIcon name={'add'} size={25} />
              </Text>
            </View>
          </TouchableNativeFeedback>
        )}
      </View>
    )
  }
}

export class BTN extends Component {
  render() {
    const active = this.props.active
    const color = active ? '#fff' : '#00a699'
    const bg = active ? '#00a699' : '#fff'
    const ripple = active ? '#ffffff99' : '#00a69911'
    return (
      <View
        style={[g.beginHostingBTN, r.top15, this.props.style,
        {
          backgroundColor: bg,
          borderColor: color,
          borderWidth: 1,
          opacity: active ? 1 : 0.4
        }]}
      >
        <TouchableNativeFeedback
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple(ripple)}
          onPress={active ? this.props.onPress : null}
        >
          <View
            pointerEvents={'box-only'}
            style={[r.full, r.center]}
          >
            <Fa size={18} style={[r.white, r.leftMargin10, { color }]}>
              {this.props.next && 'بعدی'}
              {this.props.addPhoto && 'افزودن تصویر'}
              {this.props.edit && 'ویرایش'}
              {!this.props.addPhoto && !this.props.next && !this.props.edit && 'ادامه'}
            </Fa>
            <AirIcon
              name={'left-chevron-bold'}
              size={15}
              color={color}
              style={[r.absolute, { left: 20 }]}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

export class PublishBTN extends Component {
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

export class Next extends Component {
  render() {
    const activeBTN = this.props.active
    return (
      <View style={[g.loginBTN, r.absolute, g.bgPrimary, { opacity: activeBTN ? 1 : 0.5 }]}>
        <TouchableNativeFeedback
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple('#ffffff99')}
          onPress={activeBTN ? this.props.onPress : null}
        >
          <View pointerEvents={'box-only'} style={[r.full, r.center]}>
            <AirIcon
              name={'left-chevron-bold'}
              size={18}
              color={'#fff'}
              style={[{ width: 20, height: 25 }]}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

export class SwitchRow extends Component {
  render() {
    return (
      <View style={[r.rtl, r.horizCenter, r.spaceBetween, { height: 55 }]}>
        <View style={[r.rightMargin5, { flex: 3 }]}>
          <Fa style={[r.grayMid]} size={18}>{this.props.title}</Fa>
          {this.props.description && (
            <Fa style={r.grayLight} size={10}>
              {this.props.description}
            </Fa>
          )}
        </View>
        <View style={[r.center, { flex: 1 }]}>
          <Switch
            state={this.props.state}
            onPress={this.props.onPress}
          />
        </View>
      </View>
    )
  }
}

export class CheckboxRow extends Component {
  render() {
    return (
      <View style={[r.rtl, r.horizCenter, r.spaceBetween, { height: 55 }]}>
        <View style={[r.rightMargin5, { flex: 3 }]}>
          <Fa style={[r.grayMid]} size={18}>{this.props.title}</Fa>
        </View>
        <View style={[r.center, { flex: 1 }]}>
          <Checkbox
            active={this.props.state}
            onPress={this.props.onPress}
          />
        </View>
      </View>
    )
  }
}

export class IncDecRow extends Component {
  render() {
    return (
      <View style={[r.rtl, r.horizCenter, r.spaceBetween, { height: 55 }]}>
        <View style={[r.rightMargin5, { flex: 1.5 }]}>
          <Fa style={[r.grayMid]} size={18}>{this.props.title}</Fa>
        </View>
        <View style={[r.center, r.rtl, r.spaceBetween, { flex: 1 }]}>
          <IncDecBTN type={'minus'} onPress={this.props.decPress} />
          <View style={[r.center, { width: 60 }]}>
            <Fa size={18} style={[r.grayMid, r.topPadd3]}>
              {this.props.count}
            </Fa>
          </View>
          <IncDecBTN type={'add'} onPress={this.props.incPress} />
        </View>
      </View>
    )
  }
}

export class MyMarker extends Component {
  render() {
    return (
      <View>
        <View style={[g.hostingMarker, r.center]}>
          <AirIcon name={'map-marker-alt'} size={20} style={r.white} />
        </View>
        <View style={[g.hostingMarkerArrow, { backgroundColor: '#08a299' }]} />
      </View>
    )
  }
}