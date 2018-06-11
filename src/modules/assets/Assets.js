import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import StarRating from 'react-native-star-rating'
import { Fa, FaBold, FaMulti, EnBold } from './Font'
import r from '../styles/Rinc'
import g from '../styles/General'
import airConfig from './air_font_config.json'
import lineConfig from './line_font_config.json'

const LineIcon = createIconSetFromFontello(lineConfig)
const AirIcon = createIconSetFromFontello(airConfig)

export class HeartEmpty extends Component {
  render() {
    return (
      <Animatable.View
        animation={'zoomOut'}
        duration={100}
        easing={'ease-in-back'}
        direction={'reverse'}
        useNativeDriver
      >
        <AirIcon
          name={'heart-alt'}
          size={19}
          color={'rgba(255,255,255,0.6)'}
          style={[r.centerText, { width: 40 }]}
        />
      </Animatable.View>
    )
  }
}

export class HeartFull extends Component {
  render() {
    return (
      <View
        animation={'zoomIn'}
        duration={100}
        easing={'ease-out-back'}
        direction={'reverse'}
        useNativeDriver
      >
        <AirIcon
          name={'heart'}
          size={18}
          style={[r.red, r.centerText, { width: 40 }]}
        />
        <AirIcon
          name={'heart-alt'}
          size={20}
          color={'rgba(255,255,255,0.7)'}
          style={[r.absolute, r.centerText, { top: -1, left: 0, width: 40 }]}
        />
      </View>
    )
  }
}

export class IncDecBTN extends Component {
  render() {
    return (
      <View style={[g.increaseDecrease]}>
        <TouchableNativeFeedback
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple('#00000033', true)}
          onPress={this.props.onPress}
        >
          <View style={[r.full, r.center]} pointerEvents={'box-only'}>
            <AirIcon
              name={this.props.type}
              size={15}
              style={g.primary}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

export class IncDec extends Component {
  render() {
    const height = this.props.height ? this.props.height : 75
    return (
      <View style={[r.rtl, r.horizCenter, r.spaceBetween]}>
        <Fa style={[r.rightMargin5, this.props.titleStyle, { flex: 1.5 }]} size={15}>
          {this.props.title}
        </Fa>
        <View style={[r.center, { flex: 1, height }]}>
          <View style={[r.rtl, r.spaceBetween, r.center]}>
            <IncDecBTN type={'minus'} onPress={this.props.decPress} />
            <View style={[r.center, { width: 60 }]}>
              <Fa size={18} style={[r.grayMid, r.topPadd3]}>
                {this.props.count}
              </Fa>
            </View>
            <IncDecBTN type={'add'} onPress={this.props.incPress} />
          </View>
        </View>
      </View>
    )
  }
}

export class Switch extends Component {
  componentDidMount() {
    this.switchAnimation()
  }
  componentDidUpdate() {
    this.switchAnimation()
  }
  switchAnimation() {
    if (this.props.state === true) {
      this.refs.switch.transitionTo({ transform: [{ translateX: -1 }] }, 1000, 'ease-out-circ')
      this.refs.switcherWrap.transitionTo({ backgroundColor: '#008489' }, 500)
    } else {
      this.refs.switch.transitionTo({ transform: [{ translateX: 14 }] }, 1000, 'ease-out-circ')
      this.refs.switcherWrap.transitionTo({ backgroundColor: '#fff' }, 500)
    }
  }
  render() {
    const sign = this.props.state === true ? 'ok-alt' : 'remove'
    return (
      <Animatable.View
        ref={'switcherWrap'}
        style={[g.switcherWrap]}
      >
        <Animatable.View
          style={[g.switcherHandle]}
          ref={'switch'}
          useNativeDriver
        >
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#ffffff', true)}
            onPress={this.props.onPress}
          >
            <View
              style={[r.full, r.center]}
              pointerEvents={'box-only'}>
              <AirIcon
                name={sign}
                size={11}
                style={g.primary}
              />
            </View>
          </TouchableNativeFeedback>
        </Animatable.View>
      </Animatable.View>
    )
  }
}

export class Checkbox extends Component {
  render() {
    const activeBox = this.props.active ? 1 : 0
    const borderColor = this.props.active ? '#00a19c' : '#d4d4d4'
    return (
      <View style={[r.center, { width: 55, height: 55 }]}>
        <TouchableNativeFeedback
          style={r.full}
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple('#00e9e911', true)}
          onPress={this.props.onPress}
        >
          <View
            pointerEvents={'box-only'}
            style={[r.center, {
              width: 25,
              height: 25,
              borderWidth: 1,
              borderColor,
              borderRadius: 5,
            }, this.props.style]} // style is coz of languages border not disapier
          >
            <AirIcon
              name='ok-alt'
              size={18}
              color={'#00a19c'}
              style={{ opacity: activeBox }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

export class CustomMarker extends Component {
  render() {
    return (
      <View
        style={{
          width: 25,
          height: 25,
          backgroundColor: '#fff',
          borderColor: '#008489',
          borderWidth: 1,
          borderRadius: 20
        }}
      />
    )
  }
}

export class Stars extends Component{
  render() {
    return (
      <View style={[r.rtl, r.top5, this.props.style]}>
        <StarRating
          disabled
          maxStars={5}
          rating={this.props.rate}
          starSize={12}
          fullStarColor={'#02a4a4'}
          emptyStarColor={'#d3d3d3'}
        />
        <Fa style={[r.gray, r.rightMargin5]} size={9}>{this.props.reviews} نظر</Fa>
      </View>
    )
  }
}

export class RowItem extends Component {
  render() {
    const mapList = this.props.mapList === true ? 0.7 : 1
    return (
      <Animatable.View
        style={[g.hmItem, { transform: [{ scale: mapList }] }]}
        animation={'fadeIn'}
        duration={3000}
        easing={'ease-out-back'}
        useNativeDriver
      >
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          onPress={this.props.onPress}
        >
          <View>
            <Image
              source={{ uri: this.props.image }}
              style={[g.hmItemImg, g.round, r.bgLight2]}
              resizeMode={'cover'}
            />
            <View style={r.topPadd5}>
              <FaMulti numberOfLines={1} style={r.grayDark}>{this.props.title}</FaMulti>
              <View style={[r.rtl, r.spaceBetween, r.rightPadd5, { height: 25 }]}>
                <View style={[r.row]}>
                  {this.props.luxury && (
                    <EnBold style={[g.luxuryBadge, { marginRight: 5, marginTop: 2 }]} size={9}>Luxury</EnBold>
                  )}
                  <FaBold size={19} style={[g.hmItemPrice]}>{this.props.price}</FaBold>
                  <LineIcon name={'money'} size={20} style={r.gray} />
                </View>
                <Stars rate={this.props.rate} reviews={this.props.reviews} />
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[r.absolute, r.left, r.margin5, r.center, g.heartWrapper]}
          onPress={this.props.likePress}
        >
          {this.props.like === true ? <HeartFull /> : <HeartEmpty />}
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}

export class MapRowItem extends Component {
  render() {
    return (
      <Animatable.View
        style={[g.mapHmItem]}
        animation={'fadeIn'}
        duration={3000}
        easing={'ease-out-back'}
        useNativeDriver
      >
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          onPress={this.props.onPress}
        >
          <View>
            <Image
              source={{ uri: this.props.images[0] }}
              style={[g.mapHmItemImg, g.round, r.bgLight2]}
              resizeMode={'cover'}
            />
            <View style={r.topPadd10}>
              <View style={[r.rtl, r.spaceBetween, r.rightPadd5]}>
                <View style={r.row}>
                  <Fa size={14} style={[r.paddHoriz3, { top: -2 }]}>{this.props.price}</Fa>
                  <LineIcon name={'money'} size={15} style={r.gray} />
                </View>
                <Fa size={11} style={[r.full, r.grayDark]}>{this.props.title}</Fa>
              </View>
              <View style={[r.rtl]}>
                <Stars
                  rate={this.props.overallRate}
                  reviews={this.props.reviewsCount}
                  style={{ marginTop: -5 }}
                />
                {this.props.luxury &&
                  <EnBold style={[g.luxuryBadge, { top: -5 }]} size={9}>Luxury</EnBold>
                }
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[r.absolute, r.left, r.margin5, r.center, g.heartWrapper]}
          onPress={this.props.likePress}
        >
          {this.props.like === true ? <HeartFull /> : <HeartEmpty />}
        </TouchableOpacity>
        {this.props.focused && (
          <View style={[r.absolute, r.top, r.wFull, g.bgPrimaryLight, g.mapListFocus]} />
        )}
      </Animatable.View>
    )
  }
}

export class ItemBig extends Component {
  render() {
    return (
      <Animatable.View
        style={[g.hmItemBig, r.margin15]}
        animation={'fadeIn'}
        duration={2000}
        easing={'ease-out-back'}
        useNativeDriver
      >
        <TouchableHighlight
          underlayColor={'rgba(0,0,0,0.1)'}
          onPress={this.props.onPress} >
          <View>
            <Image
              source={{ uri: this.props.image }}
              style={[g.hmItemBigImg, g.round, r.bgLight2]}
              resizeMode={'cover'}
            />
            <View style={r.topPadd5}>
              <View style={[r.rtl, g.hmItemBigTitle]}>
                <View style={r.rtl}>
                  <LineIcon name={'money'} size={20} style={r.grayDark} />
                  <FaBold size={19} style={[g.hmItemPrice, r.grayDark]}>
                    {this.props.price}
                  </FaBold>
                  {this.props.verified && <LineIcon name={'certificate'} size={18} style={[r.leftPadd5]} />}
                </View>
                <View style={[r.full]}>
                  <FaBold>{this.props.title}</FaBold>
                </View>
              </View>
              <View style={[r.rtl]}>
                {this.props.type.entire && <Fa style={[r.grayLight, r.top]} size={12}>کل ملک</Fa>}
                {this.props.type.privateRoom && <Fa style={[r.grayLight, r.top]} size={12}>اتاق اختصاصی</Fa>}
                {this.props.type.sharedRoom && <Fa style={[r.grayLight, r.top]} size={12}>اتاق اشتراکی</Fa>}
                {this.props.luxury && <EnBold style={[g.luxuryBadge]} size={9}>Luxury</EnBold>}
              </View>
              <Stars rate={this.props.rate} reviews={this.props.reviews} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[r.absolute, r.left, g.heartWrapper, r.center]}
          onPress={this.props.likePress}
        >
          {this.props.like === true ? <HeartFull /> : <HeartEmpty />}
        </TouchableOpacity>
      </Animatable.View>
    )
  }
}

export class FilterInMap extends Component {
  render() {
    return (
      <View
        style={[g.mapFilter, r.absolute, r.bgLight1, r.rtl, r.horizCenter,
          { width: 70, bottom: 20 }]}
      >
        <View style={[r.full]}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.showModal({
                screen: 'mrxrinc.Filters'
              })
            }}
          >
            <View style={[r.rtl, r.center]}>
              <FaBold size={11} style={r.leftPadd5}>فیلتر</FaBold>
              <AirIcon name={'filter'} size={12} style={[r.black, { width: 15 }]} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export class MapFilter extends Component {
  render() {
    return (
      <View style={[g.mapFilter, r.absolute, r.bgLight1, r.rtl, r.horizCenter]}>
        <View style={[r.full]}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.showModal({
                screen: 'mrxrinc.Filters'
              })
            }}
          >
            <View style={[r.rtl, r.center]}>
              <FaBold size={11} style={r.leftPadd5}>فیلتر</FaBold>
              <AirIcon name={'filter'} size={12} style={[r.black, { width: 15 }]} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[r.bgGrayLight, { width: 1, height: 18 }]} />
        <View style={[r.full]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.props.navigator.showModal({
                screen: 'mrxrinc.Map'
              })
            }}
          >
            <View style={[r.rtl, r.center]}>
              <FaBold size={11} style={r.leftPadd5}>نقشه</FaBold>
              <AirIcon name={'map-marker-alt'} size={12} style={[r.black, { width: 15 }]} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

 export class MyMarker extends Component {
  render() {
    const { focused } = this.props
    const focusedText = focused ? '#fff' : '#697989'
    return (
      <View>
        <View
          style={[g.myMarker, 
          { backgroundColor: focused ? '#08a299' : '#fff', borderWidth: focused ? 0 : 0.5 }]}
        >
          <View style={[r.row, r.horizCenter]}>
            <Text style={[g.myMarkerText, { color: focusedText }]}>{this.props.price}</Text>
            <LineIcon name={'money'} size={12} color={focusedText} />
          </View>
        </View>
        <View style={[g.myMarkerArrow, { backgroundColor: focused ? '#08a299' : '#90999f' }]} />
      </View>
    )
  }
}

export class MessageItem extends Component {
  render() {
    return (
      <View style={[g.messageItem, r.bottom30, r.bgLight2]}>
        <View style={r.padd10}>
          <FaBold size={14} style={[r.grayDark]}>
            {this.props.title}
          </FaBold>
          <FaMulti size={11} style={[r.grayMid, r.top10]}>
            {this.props.description}
          </FaMulti>
        </View>
        <View style={[r.bgLight3, r.row, r.top10, r.spaceBetween, { height: 40 }]}>
          {!this.props.archive && (
            <TouchableOpacity
              style={[r.center, { width: 80, backgroundColor: '#079e9e' }]}
              onPress={this.props.archivePress}
            >
              <FaBold size={12} style={[r.white]}>آرشیو</FaBold>
            </TouchableOpacity>
          )}
          <View style={[r.verticalCenter, r.paddHoriz15]}>
            <Fa size={10} style={[r.grayLight]}>{this.props.date}</Fa>
          </View>
        </View>
      </View>
    )
  }
}

export class RadioBTN extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[r.center, { width: 50, height: 40 }]}
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        <View style={[r.radioBTN, r.center]}>
          {this.props.active && <View style={[r.radioBTNActive]} />}
        </View>
      </TouchableOpacity>
    )
  }
}

export const MapStyle =
  [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#eaeaea" }, { "lightness": 20 }, { "weight": "1" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "lightness": 17 }, { "color": "#ffffff" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }]
