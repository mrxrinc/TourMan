import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import PersianDatePicker from 'react-native-persian-date-picker'
import Modal from 'react-native-modal'
import ImagePicker from 'react-native-image-crop-picker'
// import ImagePicker from 'react-native-image-picker'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaMulti, FaBold } from './assets/Font'
import { RadioBTN, Checkbox } from './assets/Assets'
import { userRegister, userToStore } from '../actions/userActions'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import airConfig from './assets/air_font_config.json'
import provinces from './assets/provinces.json'
import { baseURL } from '../constants/api'

const AirIcon = createIconSetFromFontello(airConfig)

const NAVBAR_HEIGHT = 75
class ProfileDetails extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    const scrollAnim = new Animated.Value(0)
    const offsetAnim = new Animated.Value(0)
    this.state = {
      scrollY: new Animated.Value(0),
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim
        ),
        0,
        NAVBAR_HEIGHT,
      ),
      sexModal: false,
      birthdayModal: false,
      locationModal: false,
      languagesModal: false,
      // English(EN) - Turkish(TR) - Farsi(FA) - Kurdi(KR) - Gilaki(GL)
      languagesValue: this.props.user.languages.map(item => item), // mutation avoiding
      imageLoading: true
    }
  }

  onScroll(event) {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
    )(event)
  }

  chooseLang = (lang) => {
    this.setState({ languagesModal: false })
    const index = this.state.languagesValue.indexOf(lang)
    const array = this.state.languagesValue
    if (index > -1 && array.length > 1) {
      array.splice(array.indexOf(lang), 1)
      this.setState({ languagesValue: array })
    } else if (index === -1) {
      array.splice(0, 0, lang)
      this.setState({ languagesValue: array })
    }
    axios.put(`${baseURL}api/users/update/${this.props.user._id}`, { languages: this.state.languagesValue })
      .then(res => {
        this.props.userToStore(res.data)
        console.log(res.data)
        ToastAndroid.show('تغییرات اعمال شد', ToastAndroid.SHORT)
      })
      .catch(err => {
        ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
        console.log(err)
      })
    this.props.userRegister(this.state.languagesValue, 'languages')
  }

  pickImage() {
    this.setState({ upload: false })
    ImagePicker.openPicker({
      width: 700,
      height: 600,
      cropping: true,
      cropperActiveWidgetColor: '#008A8A',
      cropperStatusBarColor: '#09686c',
      cropperToolbarColor: '#008A8A',
      cropperToolbarTitle: 'ویرایش تصویر',
      mediaType: 'photo'
    })
    .then(image => {
      console.log(image) 
        this.setState({ imageLoading: true })  
        const data = new FormData()
        data.append('userAvatar', {
          uri: image.path,
          type: image.mime,
          name: `TourMan_users_avatar${image.path.substr(-4)}` // adding extention
        })
        axios.post(`${baseURL}api/users/avatar`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            console.log(res.data)
            this.props.userToStore({ avatar: res.data })
            // now updating database with new user information(including avatar URL)
            axios.put(`${baseURL}api/users/update/${this.props.user._id}`, { ...this.props.user })
              .then(finalRes => {
                console.log('FINAL DB AVATAR RES : ', finalRes.data)
                this.setState({ imageLoading: false })
                ToastAndroid.show('تصویر پروفایل بروزرسانی شد', ToastAndroid.SHORT)
              })
              .catch(err => {
                ToastAndroid.show('مشکلی در بروزرسانی سرور پیش آمد. لطفا دوباره تلاش کنید!', ToastAndroid.LONG)
                console.log(err)
              })
          })
          .catch(err => {
            ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
            console.log(err)
          })
    })
  }

  renderLanguageName = () => {
    const array = []
    const langChars = this.props.user.languages
    for (let i = 0; i < langChars.length; i++) {
      switch (langChars[i]) {
        case 'FA':
          array.push('فارسی')
          break
        case 'TR':
          array.push('ترکی')
          break
        case 'EN':
          array.push('انگلیسی')
          break
        case 'KR':
          array.push('کردی')
          break
        case 'GL':
          array.push('گیلکی')
          break
        default:
          return null
      }
    }
    return array.join(' / ')
  }

  render() {
    const DimWhiteNavBar = this.state.scrollY.interpolate({
      inputRange: [0, 0],
      outputRange: [1, 1],
    })
    const { clampedScroll } = this.state
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT)],
      extrapolate: 'clamp',
    })
    return (
      <View style={[r.full, r.bgWhite]}>
        <Animated.View
          style={[g.homeItemHeader, r.zIndex1,
            { height: NAVBAR_HEIGHT, transform: [{ translateY: navbarTranslate }] }]}
        >
          <NavBar
            animate={DimWhiteNavBar}
            title={'پروفایل من'}
            back={() => this.props.navigator.pop()}
          />
        </Animated.View>
        <ScrollView
          contentContainerStyle={[{ marginTop: NAVBAR_HEIGHT }]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={this.onScroll.bind(this)}
        >
          <View style={[r.horizCenter, r.bgLight3, { height: 220 }]}>
            {this.state.imageLoading && (
              <View 
                style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1, 
                { backgroundColor: 'rgba(255,255,255,0.3)' }]}
              >
                <Loading />
              </View>
            )}
            <Image
              style={[r.wFull, { height: 220 }]}
              source={{ uri: this.props.user.avatar }}
              resizeMode={'contain'}
              onLoad={() => this.setState({ imageLoading: false })}
            />
            <TouchableOpacity
              style={[r.absolute, r.zIndex2, { alignSelf: 'center', bottom: 10 }]}
              onPress={() => this.pickImage()}
            >
              <AirIcon
                name={'photo-upload'} size={35}
                style={[r.white]}
              />
            </TouchableOpacity>
          </View>
          <View style={[r.padd15]}>
            <View style={[r.horizCenter]}>
              <FaBold size={22}>
                <Text>{this.props.user.firstName ? this.props.user.firstName : '-' }</Text>
                <Text> </Text>
                <Text>{this.props.user.lastName ? this.props.user.lastName : '-'}</Text>
              </FaBold>
              <TouchableOpacity
                style={r.top10}
                onPress={() => {
                  this.props.navigator.showModal({
                    screen: 'mrxrinc.ProfileDetailsEdit',
                    passProps: { page: 'name' }
                  })
                }}
              >
                <Fa style={[g.Accent]} size={13}>ویرایش نام</Fa>
              </TouchableOpacity>
            </View>
            <View style={g.line} />
            <View>
              <FaBold size={16}>درباره من</FaBold>
              <FaMulti style={[g.grayDark, r.top10]} size={13}>
                {this.props.user.about ? this.props.user.about : '-'}
              </FaMulti>
              <TouchableOpacity
                style={r.selfCenter}
                onPress={() => {
                  this.props.navigator.showModal({
                    screen: 'mrxrinc.ProfileDetailsEdit',
                    passProps: { page: 'about' }
                  })
                }}
              >
                <Fa style={[g.Accent]} size={13}>ویرایش درباره من</Fa>
              </TouchableOpacity>
            </View>
            <View style={g.line} />

            <Fa size={14} style={[r.grayLight, r.selfCenter, r.top30]}>اطلاعات شخصی</Fa>
            <View style={[r.padd5, r.top10, g.profileBoxOutline]}>
              <ListBTN
                title={'جنسیت'}
                onPress={() => this.setState({ sexModal: true })}
              />
              <Modal
                isVisible={this.state.sexModal}
                onBackdropPress={() => this.setState({ sexModal: false })}
                onBackButtonPress={() => this.setState({ sexModal: false })}
              >
                <View style={[r.modal]}>
                  <View style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}>
                    <Fa size={15}>مرد</Fa>
                    <RadioBTN
                      active={this.props.user.sex === 'male'}
                      onPress={() => {
                        axios.put(`${baseURL}api/users/update/${this.props.user._id}`, { sex: 'male' })
                          .then(res => {
                            this.props.userToStore(res.data)
                            console.log(res.data)
                            ToastAndroid.show('تغییرات اعمال شد', ToastAndroid.SHORT)
                          })
                          .catch(err => {
                            ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
                            console.log(err)
                          })
                      }}
                    />
                  </View>
                  <View style={g.line} />
                  <View style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}>
                    <Fa size={15}>زن</Fa>
                    <RadioBTN
                      active={this.props.user.sex === 'female'}
                      onPress={() => {
                        axios.put(`${baseURL}api/users/update/${this.props.user._id}`, { sex: 'female' })
                          .then(res => {
                            this.props.userToStore(res.data)
                            console.log(res.data)
                            ToastAndroid.show('تغییرات اعمال شد', ToastAndroid.SHORT)
                          })
                          .catch(err => {
                            ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
                            console.log(err)
                          })
                      }}
                    />
                  </View>
                </View>
              </Modal>
              <View style={[r.rtl, r.horizCenter, r.spaceBetween, r.padd10]}>
                <Fa style={[r.grayDark, { width: 80 }]} size={14}>تاریخ تولد</Fa>
                <PersianDatePicker
                  style={g.birthdayEdit}
                  textStyle={[g.birthdayEditText, g.Accent]}
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
                  selectedDate={this.props.user.birthday.join(' - ')}
                  minDate={'1320/1/1'}
                  maxDate={'1379/12/29'}
                  onConfirm={value => {
                    axios.put(`${baseURL}api/users/update/${this.props.user._id}`, { birthday: value })
                      .then(res => {
                        this.props.userToStore(res.data)
                        console.log(res.data)
                        ToastAndroid.show('تغییرات اعمال شد', ToastAndroid.SHORT)
                      })
                      .catch(err => {
                        ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
                        console.log(err)
                      })
                  }}
                />
              </View>
              <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
              <ListBTN
                title={'ایمیل'}
                value={this.props.user.email}
                onPress={() => {
                  this.props.navigator.showModal({
                    screen: 'mrxrinc.ProfileDetailsEdit',
                    passProps: { page: 'email' }
                  })
                }}
              />
              <ListBTN
                title={'موبایل'}
                value={this.props.user.mobile}
                noBottomLine
                onPress={() => {
                  this.props.navigator.showModal({
                    screen: 'mrxrinc.ProfileDetailsEdit',
                    passProps: { page: 'mobile' }
                  })
                }}
              />
            </View>

            <Fa size={14} style={[r.grayLight, r.selfCenter, r.top30]}>اطلاعات اختیاری</Fa>
            <View style={[r.padd5, r.top10, g.profileBoxOutline]}>
              <ListBTN
                title={'محل زندگی'}
                value={this.props.user.location}
                onPress={() => this.setState({ locationModal: true })}
              />
              <Modal
                isVisible={this.state.locationModal}
                useNativeDriver
                onBackdropPress={() => this.setState({ locationModal: false })}
                onBackButtonPress={() => this.setState({ locationModal: false })}
              >
                <View style={[g.provincesModal]}>
                  <ScrollView
                    contentContainerStyle={[r.paddHoriz20, r.bgWhite]}
                    showsVerticalScrollIndicator={false}
                  >
                    {provinces.items.map(item => (
                      <View
                        key={item.id}
                        style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}
                      >
                        <Fa size={15}>{item.name}</Fa>
                        <RadioBTN
                          active={this.props.user.location === item.name}
                          onPress={() => {
                            this.setState({ locationModal: false })
                            axios.put(`${baseURL}api/users/update/${this.props.user._id}`, { location: item.name })
                              .then(res => {
                                this.props.userToStore(res.data)
                                console.log(res.data)
                                ToastAndroid.show('تغییرات اعمال شد', ToastAndroid.SHORT)
                              })
                              .catch(err => {
                                ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
                                console.log(err)
                              })
                          }}
                        />
                      </View>
                    ))}
                  </ScrollView>
                  {/*<View style={[r.wFull, g.bgPrimary, { height: 45 }]}>
                    <TouchableNativeFeedback
                      delayPressIn={0}
                      background={TouchableNativeFeedback.Ripple('#00000022')}
                      onPress={() => this.setState({ locationModal: false })}
                    >
                      <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                        <FaBold size={14} style={[r.white]}>ذخیره</FaBold>
                      </View>
                    </TouchableNativeFeedback>
                  </View>*/}
                </View>
              </Modal>

              <ListBTN
                title={'تحصیلات'}
                value={this.props.user.education}
                onPress={() => {
                  this.props.navigator.showModal({
                    screen: 'mrxrinc.ProfileDetailsEdit',
                    passProps: { page: 'education' }
                  })
                }}
              />
              <ListBTN
                title={'شغل'}
                value={this.props.user.job}
                onPress={() => {
                  this.props.navigator.showModal({
                    screen: 'mrxrinc.ProfileDetailsEdit',
                    passProps: { page: 'job' }
                  })
                }}
              />
              <ListBTN
                title={'زبان ها'}
                value={this.renderLanguageName()}
                noBottomLine
                onPress={() => this.setState({ languagesModal: true })}
              />
              <Modal
                isVisible={this.state.languagesModal}
                useNativeDriver
                onBackdropPress={() => this.setState({ languagesModal: false })}
                onBackButtonPress={() => this.setState({ languagesModal: false })}
              >
                <View style={[g.provincesModal, r.bgWhite]}>
                  <View style={[r.paddHoriz20]}>
                    <View style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}>
                      <Fa size={15}>فارسی</Fa>
                      <Checkbox
                        active={this.state.languagesValue.indexOf('FA') > -1}
                        style={{ borderRadius: 0 }}
                        onPress={() => this.chooseLang('FA')}
                      />
                    </View>
                    <View style={g.line} />
                    <View style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}>
                      <Fa size={15}>ترکی</Fa>
                      <Checkbox
                        active={this.state.languagesValue.indexOf('TR') > -1}
                        style={{ borderRadius: 0 }}
                        onPress={() => this.chooseLang('TR')}
                      />
                    </View>
                    <View style={g.line} />
                    <View style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}>
                      <Fa size={15}>انگلیسی</Fa>
                      <Checkbox
                        active={this.state.languagesValue.indexOf('EN') > -1}
                        style={{ borderRadius: 0 }}
                        onPress={() => this.chooseLang('EN')}
                      />
                    </View>
                    <View style={g.line} />
                    <View style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}>
                      <Fa size={15}>کردی</Fa>
                      <Checkbox
                        active={this.state.languagesValue.indexOf('KR') > -1}
                        style={{ borderRadius: 0 }}
                        onPress={() => this.chooseLang('KR')}
                      />
                    </View>
                    <View style={g.line} />
                    <View style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}>
                      <Fa size={15}>گیلکی</Fa>
                      <Checkbox
                        active={this.state.languagesValue.indexOf('GL') > -1}
                        style={{ borderRadius: 0 }}
                        onPress={() => this.chooseLang('GL')}
                      />
                    </View>
                  </View>
                  {/*<View style={[r.wFull, g.bgPrimary, { height: 45 }]}>
                    <TouchableNativeFeedback
                      delayPressIn={0}
                      background={TouchableNativeFeedback.Ripple('#00000022')}
                      onPress={() => this.setState({ languagesModal: false })}
                    >
                      <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                        <FaBold size={14} style={[r.white]}>ذخیره</FaBold>
                      </View>
                    </TouchableNativeFeedback>
                  </View>*/}
                </View>
              </Modal>
            </View>

          </View>

          <View style={{ height: 100 }}/>
        </ScrollView>
      </View>
    )
  }

}


class ListBTN extends Component {
  render() {
    return (
      <View>
        <TouchableNativeFeedback
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple('#00000011', false)}
          onPress={this.props.onPress}
        >
          <View
            style={[r.rtl, r.horizCenter, r.spaceBetween, r.padd10]}
            pointerEvents={'box-only'}
          >
            <Fa style={[r.grayDark, { width: 80 }]} size={14}>{this.props.title}</Fa>
            {this.props.value ? (
              <Fa style={[g.Accent, r.full, r.leftText]} size={14}>{this.props.value}</Fa>
            ) : (
              <AirIcon name={'left-chevron-bold'} size={16} style={g.Accent} />
            )}
          </View>
        </TouchableNativeFeedback>
        {!this.props.noBottomLine && (
          <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
        )}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)
