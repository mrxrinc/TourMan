import React, { Component } from 'react'
import {
  View,
  Animated,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaMulti, FaBoldMulti } from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import airConfig from './assets/air_font_config.json'
import { reportingUser } from '../actions/generalActions'
import { baseURL } from '../constants/api'

const AirIcon = createIconSetFromFontello(airConfig)
const NAVBAR_HEIGHT = 75

class ReportUser extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      loading: false
    }
  }

  componentWillMount() {
    const hostId = this.props.hostId ? { hostId: this.props.hostId } : null
    const reportType = this.props.branch ? { reportType: this.props.branch } : null
    this.props.reportingUser({ 
      userId: this.props.user._id,
      ...hostId,
      ...reportType
     })
    console.log('branch :', this.props.branch)
    console.log('host Id ', this.props.hostId)
    console.log('user From Store : ', this.props.user)
    setTimeout(() => {
      console.log('report state From Store : ', this.props.reportUser)           
    }, 0)
  }

  onScroll(event) { // needed for NavBar values
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
    )(event)
  }

  submitReport = () => {
    this.setState({ loading: true })
    axios.post(`${baseURL}api/reportUser`, this.props.reportUser)
      .then(res => {
        this.setState({ loading: false }, () => {
          ToastAndroid.show('گزارش ارسال شد', ToastAndroid.SHORT)
          this.props.navigator.dismissAllModals()
          console.log(res.data)
        })
      })
      .catch(err => {
        ToastAndroid.show('مشکلی در ارسال گزارش پیش امد، لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
        console.log(err)
      })
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
    } else if (this.props.branch === 1) {
      return <FirstReport onReport={() => this.submitReport()} />
    } else if (this.props.branch === 2) {
      return <SecondReport onReport={() => this.submitReport()} />
    } else if (this.props.branch === 3) {
      return <ThirdReport onReport={() => this.submitReport()} />
    }
  }

  render() {
    const DimWhiteNavBar = this.state.scrollY.interpolate({
      inputRange: [0, 0],
      outputRange: [1, 1],
    })
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[{ height: NAVBAR_HEIGHT }]}>
          <NavBar
            animate={DimWhiteNavBar}
            back={() => this.props.navigator.dismissModal()}
          />
        </View>
          <View style={[r.full]}>
            {this.state.loading ? (
              <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
                <Loading />
              </View>
            ) : 
              this.renderContent() 
            }

          </View>
      </View>
    )


  }
}

class MainPage extends Component {
  render() {
    return (
      <View>
        <FaBoldMulti size={20} style={[r.margin20]}>
          بصورت ناشناس این محتوا را گزارش کنید
        </FaBoldMulti>
        <View style={r.top40}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000011', false)}
            onPress={this.props.firstPressed}>
            <View style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30 ,
            r.paddHoriz20]}
              pointerEvents={'box-only'}>
              <Fa style={[r.grayDark]} size={14}>این کاربر نباید در تورمن باشد</Fa>
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
              <Fa style={[r.grayDark]} size={14}>تمایل به اشتراک اطلاعات شخصی دارد</Fa>
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
              <Fa style={[r.grayDark]} size={14}>محتوای نامناسب یا اسپم</Fa>
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
        <FaBoldMulti size={20} style={[r.margin20, r.top40]}>
          این کاربر نباید در تورمن باشد!
        </FaBoldMulti>
        <View style={r.top20}>
          <View
            style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30,
            r.paddHoriz20]}>
            <FaMulti style={[r.grayDark]} size={14}>
              ممکنه این پروفایل متعلق به یک کلاهبردار ، جنایتکار یا برای اهداف خطرناک باشه!
            </FaMulti>
          </View>
        </View>
        <Footer
          onPress={this.props.onReport}
        />
      </View>
    )
  }
}

class SecondReport extends Component {
  render() {
    return(
      <View style={r.full}>
        <FaBoldMulti size={20} style={[r.margin20, r.top40]}>
          تمایل به اشتراک اطلاعات شخصی دارد!
        </FaBoldMulti>
        <View style={r.top20}>
          <View
            style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30,
            r.paddHoriz20]}>
            <FaMulti style={[r.grayDark]} size={14}>
              در این پروفایل آدرس ایمیل، شماره تلفن یا آدرس وب سایت شخصی وجود دارد.
            </FaMulti>
          </View>
        </View>
        <Footer
          onPress={this.props.onReport}
        />
      </View>
    )
  }
}

class ThirdReport extends Component {
  render() {
    return(
      <View style={r.full}>
        <FaBoldMulti size={20} style={[r.margin20, r.top40]}>
          محتوای نامناسب یا اسپم!
        </FaBoldMulti>
        <View style={r.top20}>
          <View
            style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd30,
            r.paddHoriz20]}>
            <FaMulti style={[r.grayDark]} size={14}>
              تصاوی یا توضیحات پروفایل شامل محتوای غیر قانونی، مجرمانه، نامناسب یا تبلیغاتی است.
            </FaMulti>
          </View>
        </View>
        <Footer
          onPress={this.props.onReport}
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
              <FaBold style={[r.white]} size={18}>گزارش</FaBold>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    reportUser: state.reportUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    reportingUser: data => dispatch(reportingUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportUser)
