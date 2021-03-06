import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler,
  AsyncStorage
} from 'react-native'
import { connect } from 'react-redux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import LinearGradient from 'react-native-linear-gradient'
import PersianDatePicker from 'react-native-persian-date-picker'
import axios from 'axios'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaMulti, EnBold } from './assets/Font'
import Loading from './assets/Loading'
import { userRegister, userToStore } from '../actions/userActions'
import { baseURL } from '../constants/api'
import airConfig from './assets/air_font_config.json'


const AirIcon = createIconSetFromFontello(airConfig)

class Registration extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={ 
    showPass: false,
    loading: false 
  }

  async componentDidMount() {
    try {
      const userKey = await AsyncStorage.getItem('userKey')
      if (userKey !== null) { 
        axios.defaults.headers.common.Authorization = `Bearer ${userKey}` // Global Auth for All pages
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }


  handleSignup = () => {
    this.setState({ loading: true })
    console.log('BEFORE REQUEST ==> ', `${baseURL}api/users/signup`)
    console.log('USER DATA  ==> ', { ...this.props.user })
    axios.post(`${baseURL}api/users/signup`, { ...this.props.user })
    .then(res => {
      console.log('Register Raw result : ', res)      
      if (res.data.userState !== 'duplicate') {

        try {
          AsyncStorage.setItem('userId', res.data._id)
          AsyncStorage.setItem('userKey', res.data.token)
        } catch (error) {
          console.log("ERROR ON SETTING ASYNCSTORAGE ON REGISTRATION", error)
          this.props.navigator.showInAppNotification({
            screen: 'mrxrinc.Notification',
            autoDismissTimerSec: 2,
            passProps: { 
              alarm: true, 
              message: '?????????? ???? ?????????? ?????????????? ?????????? ?????? ???????????? ?????? ?????? ??????. ???????? ???? ???? ???????? ???????? ?? ???????????? ?????? ?????? ???? ?????????? ????????.' 
            }
          })
        }

        this.props.userToStore(res.data)
        this.props.navigator.resetTo({
          screen: 'mrxrinc.Splash'
        })
        console.log(this.props.user)

      } else { // duplicated user found
        console.log('Duplicate user')   
        this.setState({ loading: false })
        this.props.navigator.showInAppNotification({
          screen: 'mrxrinc.Notification',
          passProps: {
            message: '?????????? ???????? ?????? ???????? ?????? ?????? ??????!',
            alarm: true,
          },
          autoDismissTimerSec: 1
        })      
      }
    })
    .catch(err => {
      this.setState({ loading: false })
      this.props.navigator.showInAppNotification({
        screen: 'mrxrinc.Notification',
        autoDismissTimerSec: 2,
        passProps: { 
          alarm: true, 
          message: '?????????? ???? ??????????  ?????????????? ?????? ?????????? ??????. ???????? ???????? ???????? ????????????????.' 
        }
      })
      console.log('SIGN UP ERROR', err)
    })
  }

  handleSignin = () => {
    this.setState({ loading: true })
    axios.post(`${baseURL}api/users/signin`, { 
      email: this.props.user.email,
      password: this.props.user.password
    })
    .then(res => {   
      if (res.data.userState !== 'noUser') {

        try {
          AsyncStorage.setItem('userId', res.data._id)
          AsyncStorage.setItem('userKey', res.data.token)
        } catch (error) {
          console.log("ERROR ON ADDING ASYNCSTORAGE ON LOGIN", error)
          this.props.navigator.showInAppNotification({
            screen: 'mrxrinc.Notification',
            autoDismissTimerSec: 2,
            passProps: { 
              alarm: true, 
              message: '?????????? ???? ?????????? ?????????????? ?????????? ?????? ???????????? ?????? ?????? ??????. ???????? ???? ???? ???????? ???????? ?? ???????????? ?????????? ????????.' 
            }
          })
        }
        this.props.userToStore(res.data)
        this.props.navigator.resetTo({
          screen: 'mrxrinc.Splash'
        })
      } else { // no user found
        console.log('No user!')    
        this.setState({ loading: false })
        this.props.navigator.showInAppNotification({
          screen: 'mrxrinc.Notification',
          passProps: {
            message: '???????????? ???????? ???????????? ??????!',
            alarm: true,
          },
          autoDismissTimerSec: 1
        })      
      }
    })
    .catch(err => {
      this.setState({ loading: false })
      this.props.navigator.showInAppNotification({
        screen: 'mrxrinc.Notification',
        autoDismissTimerSec: 3,
        passProps: {
          alarm: true,
          message: '?????????? ???? ??????????  ?????????????? ?????? ?????????? ??????. ???????? ???????? ???????? ????????????????.'
        }
      })
      console.log(err)
    })
  }

  render() {
    let renderPage
    switch (this.props.page) {
      case 'SignIn':
        renderPage = (
          <SignIn
            {...this.props}
            passVisibility={() => this.setState({ showPass: !this.state.showPass })}
            showPass={this.state.showPass}
            back={() => this.props.navigator.pop()}
            signIn={() => this.handleSignin()}
            loading={this.state.loading}
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
            {...this.props}
            back={() => this.props.navigator.pop()}
            confirm={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Registration',
                passProps: { page: 'SignIn' }
              })
            }}
          />
        )
        break
      case 'RegisterName':
        renderPage = (
          <RegisterName
            {...this.props}
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
            {...this.props}
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
            {...this.props}
            passVisibility={() => this.setState({ showPass: !this.state.showPass })}
            showPass={this.state.showPass}
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
            {...this.props}
            loading={this.state.loading}
            back={() => this.props.navigator.pop()}
            next={() => this.handleSignup()}
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
            privacy={() => {
              this.props.navigator.push({ screen: 'mrxrinc.Privacy' })
            }}
            exit={() => BackHandler.exitApp()}
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
              onPress={this.props.exit}>
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
                <Fa size={13} style={r.white}>???????? ???? ????????</Fa>
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
                ?????? ??????
              </FaBold>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[r.wFull, r.absolute, { bottom: 20 }]}>
          <FaMulti size={12} style={[r.white, r.centerText, { lineHeight: 10 }]}>
            <Text>???? ?????????? ???????? ?????????????? ?????? </Text>
            <Text
              style={[r.underLine]}
              onPress={this.props.privacy}
            >?????????? ?? ????????????</Text>
            <Text> ???? ???????????? ?? ???????? ???????? ????.</Text>
          </FaMulti>
        </View>
      </View>
    )
  }
}

class SignIn extends Component {
  render() {
    const activeBTN = this.props.user.email && this.props.user.password ? true : false    
    return (
      <KeyboardAvoidingView style={[r.full, r.hFull]}>
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
              <Fa size={13} style={r.white}>?????????????? ?????? ????????</Fa>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[r.wFull, r.top20, r.paddHoriz30]}>
          <FaBold size={22} style={[r.white]}>???????? ???? ???????? ????????????</FaBold>
          <Fa size={16} style={[r.white, r.top40]}>???????? ??????????</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
            onChangeText={(value) => this.props.userRegister(value, 'email')}
          />

          <View style={[r.top20, r.rtl, r.spaceBetween, r.horizCenter]}>
            <Fa size={16} style={[r.white]}>?????? ????????</Fa>
            <Fa
              size={12} style={[r.white]}
              onPress={this.props.passVisibility}
            >
              {this.props.showPass === false ? '??????????' : '????????'}
            </Fa>
          </View>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            returnKeyType={'next'}
            autoCorrect={false}
            underlineColorAndroid={'#ccc'}
            secureTextEntry={!this.props.showPass}
            returnKeyType={'send'}
            returnKeyLabel={'????????'}
            onChangeText={(value) => this.props.userRegister(value, 'password')}
            onSubmitEditing={activeBTN ? this.props.signIn : null}
          />
        </View>
        <View style={[g.loginBTN, r.absolute, r.bgWhite, { opacity: activeBTN ? 1 : 0.3 }]}>
          {this.props.loading === true ? (
            <View style={[r.absolute, r.wFull, r.hFull, r.center]}>
              <Loading style={{ transform: [{ scale: 0.8 }] }} />
            </View>
          ) : (
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={activeBTN ? this.props.signIn : null}
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
          )}
        </View>
      </KeyboardAvoidingView>
    )
  }
}

class RegisterName extends Component {
  render() {
    const activeBTN = this.props.user.firstName && this.props.user.lastName ? true : false    
    return (
      <KeyboardAvoidingView style={[r.full, r.hFull]}>
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
          <FaBold size={22} style={[r.white]}>?????? ?? ?????? ???????????????? </FaBold>
          <Fa size={16} style={[r.white, r.top40]}>??????</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
            onChangeText={(value) => this.props.userRegister(value, 'firstName')}
          />

          <Fa size={16} style={[r.white, r.top20]}>?????? ????????????????</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
            onChangeText={(value) => this.props.userRegister(value, 'lastName')}
            onSubmitEditing={this.props.next}
          />
        </View>
        <View style={[g.loginBTN, r.absolute, r.bgWhite, { opacity: activeBTN ? 1 : 0.3 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000022')}
            onPress={activeBTN ? this.props.next : null}
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

      </KeyboardAvoidingView>
    )
  }
}

class RegisterEmail extends Component {
  render() {
    const activeBTN = this.props.user.email ? true : false  
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
          <FaBold size={22} style={[r.white]}>???????? ?????????? ?????? ???? ???????? ????????</FaBold>
          <Fa size={16} style={[r.white, r.top40]}>???????? ??????????</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
            onChangeText={(value) => this.props.userRegister(value, 'email')} 
            onSubmitEditing={this.props.next}
          />
        </View>
          <View style={[g.loginBTN, r.absolute, r.bgWhite, { opacity: activeBTN ? 1 : 0.3 }]}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={activeBTN ? this.props.next : null}
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

class RegisterPassword extends Component {
  render() {
    const activeBTN = this.props.user.password ? true : false  
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
          <FaBold size={22} style={[r.white]}>?????????? ?????? ????????</FaBold>
          <View style={[r.top40, r.rtl, r.spaceBetween, r.horizCenter]}>
            <Fa size={16} style={[r.white]}>?????? ????????</Fa>
            <Fa
              size={12} style={[r.white]}
              onPress={this.props.passVisibility}
            >
              {this.props.showPass === false ? '??????????' : '????????'}
            </Fa>
          </View>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
            secureTextEntry={!this.props.showPass}
            returnKeyType={'next'}
            onChangeText={(value) => this.props.userRegister(value, 'password')}
            onSubmitEditing={this.props.next}
          />

        </View>
        <FaMulti
          style={[r.white, r.paddHoriz30, r.top40]}
          numberOfLines={3}
          size={11}
        >
          ?????? ???????? ???????? ?????? ???? ???? ?????????????? ???????? ?? ???????? ???????? ?? ?????????? ?????????? ????????.
        </FaMulti>
          <View style={[g.loginBTN, r.absolute, r.bgWhite, { opacity: activeBTN ? 1 : 0.3 }]}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={activeBTN ? this.props.next : null}
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
    const activeBTN = this.props.user.birthday ? true : false  
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
          <FaBold size={22} style={[r.white]}>?????????? ???????? ??????</FaBold>
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
            selectedDate={'1370/??????/21'}
            minDate={'1320/1/1'}
            maxDate={'1379/12/29'}
            onConfirm={(data) => this.props.userRegister(data, 'birthday')}
            onCancel={() => console.log('pressed!')}
            onSelect={() => console.log('pressed!')}i
          />

        </View>
          <View style={[g.loginBTN, r.absolute, r.bgWhite, { opacity: activeBTN ? 1 : 0.3 }]}>
            {this.props.loading === true ? (
              <View style={[r.absolute, r.wFull, r.hFull, r.center]}>
                <Loading style={{ transform: [{ scale: 0.8 }] }} />
              </View>
            ) : (
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000022')}
                onPress={activeBTN ? this.props.next : null}
              >
                <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                  <AirIcon
                    name={'ok-alt'}
                    size={18}
                    color={'#007e90'}
                  />
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
      </ScrollView>
    )
  }
}

class ForgetPassword extends Component {
  render() {
    const activeBTN = this.props.user.forget ? true : false  
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
          <FaBold size={22} style={[r.white]}>?????? ???????? ???? ???????????? ???????? ????????</FaBold>
          <Fa size={16} style={[r.white, r.top40]}>???????? ??????????</Fa>
          <TextInput
            style={[r.white, r.centerText, { fontSize: 18 }]}
            keyboardType={'email-address'}
            returnKeyType={'next'}
            underlineColorAndroid={'#ccc'}
            onChangeText={(value) => this.props.userRegister(value, 'forget')}
            onSubmitEditing={this.props.confirm}
          />
        </View>
        <FaMulti
          style={[r.white, r.paddHoriz30, r.top40]}
          numberOfLines={3}
          size={11}
        >
          ???????????? ???????? ???? ?????????? ?????? ?????????????? ???? ???????? ???????? ?????????? ?????? ???? ???? ????????.
        </FaMulti>
          <View style={[g.loginBTN, r.absolute, r.bgWhite, { opacity: activeBTN ? 1 : 0.3 }]}>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={activeBTN ? this.props.confirm : null}
            >
              <View 
                pointerEvents={'box-only'} 
                style={[r.full, r.rtl, r.center, r.paddHoriz5]}
              >
                <AirIcon
                  name={'arrow-left'}
                  size={15}
                  color={'#007e90'}
                  style={[{ width: 15, height: 18 }]}
                />
                <AirIcon
                  name={'envelope'}
                  size={15}
                  color={'#007e90'}
                  style={[r.centerText, { width: 25, height: 18 }]}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userRegister: (data, section) => dispatch(userRegister(data, section)),
    userToStore: userInfo => dispatch(userToStore(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)