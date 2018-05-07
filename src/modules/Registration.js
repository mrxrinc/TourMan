import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import LinearGradient from 'react-native-linear-gradient'
import PersianDatePicker from 'react-native-persian-date-picker'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaMulti, EnBold } from './assets/Font'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

export default class Registration extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
    showPass: false
  }

  render() {
    let renderPage
    switch (this.props.page) {
      case 'SignIn':
        renderPage = (
          <SignIn
            passVisibility={() => this.setState({ showPass: !this.state.showPass })}
            back={() => this.props.navigator.pop()}
            signIn={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Explore'
              })
            }}
            forgetPassword={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'ForgetPassword' }
              })
            }}
          />
        )
        break
      case 'ForgetPassword':
        renderPage = (
          <ForgetPassword
            back={() => this.props.navigator.pop()}
            confirm={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'SignUp' }
              })
            }}
          />
        )
        break
      case 'RegisterName':
        renderPage = (
          <RegisterName
            back={() => this.props.navigator.pop()}
            next={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'RegisterEmail' }
              })
            }}
          />
        )
        break
      case 'RegisterEmail':
        renderPage = (
          <RegisterEmail
            back={() => this.props.navigator.pop()}
            next={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'RegisterPassword' }
              })
            }}
          />
        )
        break
      case 'RegisterPassword':
        renderPage = (
          <RegisterPassword
            back={() => this.props.navigator.pop()}
            next={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'RegisterBirthday' }
              })
            }}
          />
        )
        break
      case 'RegisterBirthday':
        renderPage = (
          <RegisterBirthday
            back={() => this.props.navigator.pop()}
            next={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'Explore' }
              })
            }}
          />
        )
        break
      default:
        renderPage = (
          <SignUp
            signIn={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'SignIn' }
              })
            }}
            register={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'RegisterName' }
              })
            }}
          />
        )
    }

    return (
      <View style={[r.full, r.bgWhite]}>
        <LinearGradient
          style={r.full}
          colors={['#08acac', '#099595', '#037d85', '#007e90']} // lighter => Darker
          start={{ x: 0.3, y: 0.2 }}
          end={{ x: 0.6, y: 1.1 }}
        >
          {renderPage}
        </LinearGradient>
      </View>
    )
  }
}

class SignUp extends Component {
  render() {
    return (
      <View style={r.full}>
        <View style={[r.wFull, r.rtl, r.spaceBetween, { paddingTop: 25 }]}>
          <View style={g.regClose}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#ffffff22')}
              onPress={() => console.log('close')}>
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <AirIcon name={'close-bold'} size={16} color={'#fff'} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={{ width: 100, borderRadius: 50, overflow: 'hidden' }}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#ffffff22')}
              onPress={this.props.signIn}>
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <Fa size={13} style={r.white}>ورود به حساب</Fa>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[r.wFull, r.center, { height: 150 }]}>
          <Image
            style={[g.regLogo]}
            source={require('./imgs/RegLogo.png')}
            resizeMode={'contain'}
          />
        </View>
        <EnBold size={50} style={[r.centerText, { color: 'rgba(255, 255, 255, 0.9)' }]}>
          Tourman
        </EnBold>
        <View style={[r.paddVertical30, r.top50]}>
          <TouchableOpacity
            style={[r.wFull, r.center]}
            onPress={this.props.register}
          >
            <View style={[r.center, g.registerBTN]}>
              <FaBold size={16} style={{ color: 'rgba(255, 255, 255, 0.9)' }} >
                ثبت نام
              </FaBold>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[r.wFull, r.absolute, { bottom: 20 }]}>
          <FaMulti size={12} style={[r.white, r.centerText, { lineHeight: 10 }]}>
            <Text>با ایجاد حساب کاربری، همه </Text>
            <Text
              style={[r.underLine]}
              onPress={this.props.privacy}
            >شرایط و قوانین</Text>
            <Text> را خوانده و قبول کرده ام.</Text>
          </FaMulti>
        </View>
      </View>
    )
  }
}

class SignIn extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={r.full}>
        <View style={[r.wFull, r.rtl, r.spaceBetween, { paddingTop: 25 }]}>
          <View style={g.regClose}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#ffffff22')}
              onPress={this.props.back}>
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <AirIcon name={'left-arrow-bold'} size={16} color={'#fff'} style={r.flipX} />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={[r.regClose, { width: 120 }]}>
            <TouchableOpacity
              style={[r.full, r.center]}
              onPress={this.props.forgetPassword}
            >
              <Fa size={13} style={r.white}>فراموشی رمز ورود</Fa>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[r.wFull, r.top20, r.paddHoriz30]}>
          <FaBold size={22} style={[r.white]}>ورود به حساب کاربری</FaBold>
          <Fa size={16} style={[r.white, r.top40]}>آدرس ایمیل</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
          />

          <View style={[r.top20, r.rtl, r.spaceBetween, r.horizCenter]}>
            <Fa size={16} style={[r.white]}>رمز عبور</Fa>
            <Fa
              size={12} style={[r.white]}
              onPress={this.props.passVisibility}
            >
              {this.props.showPass === false ? 'نمایش' : 'مخفی'}
            </Fa>
          </View>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
            secureTextEntry={!this.props.showPass}
            returnKeyType={'send'}
            returnKeyLabel={'ورود'}
          />
        </View>
        <View style={[g.loginBTN, r.absolute, r.bgWhite]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000022')}
            onPress={this.props.signIn}
          >
            <View pointerEvents={'box-only'} style={[r.full, r.center]}>
              <AirIcon
                name={'left-chevron-bold'}
                size={16}
                color={'#007e90'}
                style={[{ width: 15, height: 20 }]}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    )
  }
}

class RegisterName extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={r.full}>
        <View style={[r.wFull, r.rtl, { paddingTop: 25 }]}>
          <View style={g.regClose}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#ffffff22')}
              onPress={this.props.back}
            >
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <AirIcon name={'left-arrow-bold'} size={16} color={'#fff'} style={r.flipX} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[r.wFull, r.top20, r.paddHoriz30]}>
          <FaBold size={22} style={[r.white]}>نام و نام خانوادگی </FaBold>
          <Fa size={16} style={[r.white, r.top40]}>نام</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
          />

          <Fa size={16} style={[r.white, r.top20]}>نام خانوادگی</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
          />
        </View>
        <View style={[g.loginBTN, r.absolute, r.bgWhite]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000022')}
            onPress={this.props.next}
          >
            <View pointerEvents={'box-only'} style={[r.full, r.center]}>
              <AirIcon
                name={'left-chevron-bold'}
                size={16}
                color={'#007e90'}
                style={[{ width: 15, height: 20 }]}
              />
            </View>
          </TouchableNativeFeedback>
        </View>

      </ScrollView>
    )
  }
}

class RegisterEmail extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={r.full}>
        <View style={[r.wFull, r.rtl, { paddingTop: 25 }]}>
          <View style={g.regClose}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#ffffff22')}
              onPress={this.props.back}>
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <AirIcon name={'left-arrow-bold'} size={16} color={'#fff'} style={r.flipX} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[r.wFull, r.top20, r.paddHoriz30]}>
          <FaBold size={22} style={[r.white]}>لطفا ایمیل خود را وارد کنید</FaBold>
          <Fa size={16} style={[r.white, r.top40]}>آدرس ایمیل</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
          />
        </View>
        <View style={[g.loginBTN, r.absolute, r.bgWhite]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000022')}
            onPress={this.props.next}>
            <View pointerEvents={'box-only'} style={[r.full, r.center]}>
              <AirIcon
                name={'left-chevron-bold'}
                size={16}
                color={'#007e90'}
                style={[{ width: 15, height: 20 }]}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    )
  }
}

class RegisterPassword extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={r.full}>
        <View style={[r.wFull, r.rtl, { paddingTop: 25 }]}>
          <View style={g.regClose}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#ffffff22')}
              onPress={this.props.back}>
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <AirIcon name={'left-arrow-bold'} size={16} color={'#fff'} style={r.flipX} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[r.wFull, r.top20, r.paddHoriz30]}>
          <FaBold size={22} style={[r.white]}>تعیین رمز عبور</FaBold>
          <View style={[r.top40, r.rtl, r.spaceBetween, r.horizCenter]}>
            <Fa size={16} style={[r.white]}>رمز عبور</Fa>
            <Fa
              size={12} style={[r.white]}
              onPress={this.props.passVisibility}
            >
              {this.props.showPass === false ? 'نمایش' : 'مخفی'}
            </Fa>
          </View>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
            secureTextEntry={!this.props.showPass}
            returnKeyType={'send'}
            returnKeyLabel={'ورود'}
          />

        </View>
        <FaMulti
          style={[r.white, r.paddHoriz30, r.top40]}
          numberOfLines={3}
          size={11}
        >
          رمز عبور باید بیش از شش کاراکتر بوده و شامل حروف و اعداد لاتین باشد.
        </FaMulti>
        <View style={[g.loginBTN, r.absolute, r.bgWhite]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000022')}
            onPress={this.props.next}
          >
            <View pointerEvents={'box-only'} style={[r.full, r.center]}>
              <AirIcon
                name={'left-chevron-bold'}
                size={16}
                color={'#007e90'}
                style={[{ width: 15, height: 20 }]}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    )
  }
}

class RegisterBirthday extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={r.full}>
        <View style={[r.wFull, r.rtl, { paddingTop: 25 }]}>
          <View style={g.regClose}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#ffffff22')}
              onPress={this.props.back}>
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <AirIcon name={'left-arrow-bold'} size={16} color={'#fff'} style={r.flipX} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[r.wFull, r.top20, r.paddHoriz30]}>
          <FaBold size={22} style={[r.white]}>تاریخ تولد شما</FaBold>
          <PersianDatePicker
            style={g.datePicker}
            textStyle={[g.datePickerText]}
            pickerTitleText={''}
            pickerConfirmBtnText={'     OK     '}
            pickerCancelBtnText={'CANCEL'}
            pickerConfirmBtnColor={[3, 128, 134, 1]}
            pickerCancelBtnColor={[3, 128, 134, 1]}
            pickerToolBarBg={[255, 255, 255, 1]}
            pickerTitleColor={[0, 0, 0, 1]}
            pickerToolBarFontSize={15}
            pickerFontSize={20}
            pickerBg={[255, 250, 255, 1]}
            selectedDate={'1379/فروردین/1'}
            minDate={'1320/1/1'}
            maxDate={'1379/12/29'}
            onConfirm={data => console.log(data)}
            onCancel={() => console.log('pressed!')}
            onSelect={() => console.log('pressed!')}
          />

        </View>
        <View style={[g.loginBTN, r.absolute, r.bgWhite]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000022')}
            onPress={this.props.next}
          >
            <View pointerEvents={'box-only'} style={[r.full, r.center]}>
              <AirIcon
                name={'ok-alt'}
                size={18}
                color={'#007e90'}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    )
  }
}

class ForgetPassword extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={r.full}>
        <View style={[r.wFull, r.rtl, { paddingTop: 25 }]}>
          <View style={g.regClose}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#ffffff22')}
              onPress={this.props.back}
            >
              <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                <AirIcon name={'left-arrow-bold'} size={16} color={'#fff'} style={r.flipX} />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[r.wFull, r.top20, r.paddHoriz30]}>
          <FaBold size={22} style={[r.white]}>رمز عبور را فراموش کرده اید؟</FaBold>
          <Fa size={16} style={[r.white, r.top40]}>آدرس ایمیل</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
          />
        </View>
        <FaMulti
          style={[r.white, r.paddHoriz30, r.top40]}
          numberOfLines={3}
          size={11}
        >
          مشخصات ورود به ایمیل شما فرستاده می شود، لطفا ایمیل خود را چک کنید.
        </FaMulti>
        <View style={[g.loginBTN, r.absolute, r.bgWhite]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000022')}
            onPress={this.props.confirm}>
            <View pointerEvents={'box-only'} style={[r.full, r.center]}>
              <AirIcon
                name={'left-chevron-bold'}
                size={16}
                color={'#007e90'}
                style={[{ width: 15, height: 20 }]}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
    )
  }
}
