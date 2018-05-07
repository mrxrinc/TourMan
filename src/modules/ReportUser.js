import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)
const NAVBAR_HEIGHT = 75

export default class ReportUser extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  componentDidMount() {
    console.log(this.props.branch)
  }

  onScroll(event) { // needed for NavBar values
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
    )(event)
  }

  renderContent() {
    if (this.props.branch == null) {
      return (
        <MainPage
          firstPressed={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.ReportUser',
              animationType: 'fade',
              passProps: { branch: 1 }
            })
          }}
          secondPressed={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.ReportUser',
              animationType: 'fade',
              passProps: { branch: 2 }
            })
          }}
          thirdPressed={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.ReportUser',
              animationType: 'fade',
              passProps: { branch: 3 }
            })
          }}
        />
      )
    } else if(this.props.branch === 1) {
      return <FirstReport />
    } else if(this.props.branch === 2) {
      return <SecondReport />
    } else if(this.props.branch === 3) {
      return <ThirdReport />
    }
  }

  render() {
    const DimWhiteNavBar = this.state.scrollY.interpolate({
      inputRange: [0, 0],
      outputRange: [1, 1],
    })
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[{ height: NAVBAR_HEIGHT}]}>
          <NavBar
            animate={DimWhiteNavBar}
            back={() => this.props.navigator.pop()}
          />
        </View>
          <View style={[r.full]}>

            {this.renderContent()}

          </View>
      </View>
    )


  }
}

class MainPage extends Component {
  render() {
    return (
      <View>
        <a.FaBoldMulti size={20} style={[r.margin20]}>
          بصورت ناشناس این محتوا را گزارش کنید
        </a.FaBoldMulti>
        <View style={r.top40}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000011', false)}
            onPress={this.props.firstPressed}>
            <View style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30 ,
            r.paddHoriz20]}
              pointerEvents={'box-only'}>
              <a.Fa style={[r.grayDark]} size={14}>این کاربر نباید در تورمن باشد</a.Fa>
              <AirIcon name={'chevron-left'}  size={20} style={[r.light4]}/>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={[g.line,{marginVertical:0, marginHorizontal:15}]}></View>

        <View>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000011',false)}
            onPress={this.props.secondPressed}>
            <View style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30 ,
            r.paddHoriz20]}
              pointerEvents={'box-only'}>
              <a.Fa style={[r.grayDark]} size={14}>تمایل به اشتراک اطلاعات شخصی دارد</a.Fa>
              <AirIcon name={'chevron-left'}  size={20} style={[r.light4]}/>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={[g.line,{marginVertical:0, marginHorizontal:15}]}></View>

        <View>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000011',false)}
            onPress={this.props.thirdPressed}>
            <View style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30 ,
            r.paddHoriz20]}
              pointerEvents={'box-only'}>
              <a.Fa style={[r.grayDark]} size={14}>محتوای نامناسب یا اسپم</a.Fa>
              <AirIcon name={'chevron-left'}  size={20} style={[r.light4]}/>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={[g.line,{marginVertical:0, marginHorizontal:15}]}></View>
      </View>
    )
  }
}

class FirstReport extends Component {
  render() {
    return (
      <View style={r.full}>
        <a.FaBoldMulti size={20} style={[r.margin20, r.top40]}>
          این کاربر نباید در تورمن باشد!
        </a.FaBoldMulti>
        <View style={r.top20}>
          <View
            style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30,
            r.paddHoriz20]}>
            <a.FaMulti style={[r.grayDark]} size={14}>
              ممکنه این پروفایل متعلق به یک کلاهبردار ، جنایتکار یا برای اهداف خطرناک باشه!
            </a.FaMulti>
          </View>
        </View>
        <Footer
          onPress={this.props.pressed}
        />
      </View>
    )
  }
}

class SecondReport extends Component {
  render() {
    return(
      <View style={r.full}>
        <a.FaBoldMulti size={20} style={[r.margin20, r.top40]}>
          تمایل به اشتراک اطلاعات شخصی دارد!
        </a.FaBoldMulti>
        <View style={r.top20}>
          <View
            style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30,
            r.paddHoriz20]}>
            <a.FaMulti style={[r.grayDark]} size={14}>
              در این پروفایل آدرس ایمیل، شماره تلفن یا آدرس وب سایت شخصی وجود دارد.
            </a.FaMulti>
          </View>
        </View>
        <Footer
          onPress={this.props.pressed}
        />
      </View>
    )
  }
}

class ThirdReport extends Component {
  render() {
    return(
      <View style={r.full}>
        <a.FaBoldMulti size={20} style={[r.margin20, r.top40]}>
          محتوای نامناسب یا اسپم!
        </a.FaBoldMulti>
        <View style={r.top20}>
          <View
            style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30,
            r.paddHoriz20]}>
            <a.FaMulti style={[r.grayDark]} size={14}>
              تصاوی یا توضیحات پروفایل شامل محتوای غیر قانونی، مجرمانه، نامناسب یا تبلیغاتی است.
            </a.FaMulti>
          </View>
        </View>
        <Footer
          onPress={this.props.pressed}
        />
      </View>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <View style={[g.reportFooter, r.absolute, r.bottom, r.wFull, r.verticalCenter,
        r.leftPadd40, {alignItems: 'flex-start'}]}>
        <View style ={[g.bgPrimary, r.round5, { width:140, height:45 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#ffffff33', false)}
            onPress={this.props.onPress}>
            <View style={[r.full, r.center]} pointerEvents={'box-only'}>
              <a.FaBold style={[r.white]} size={18}>گزارش</a.FaBold>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}
