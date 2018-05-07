import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import PersianDatePicker from 'react-native-persian-date-picker'
import Modal from 'react-native-modal'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaMulti, FaBold } from './assets/Font'
import { RadioBTN, Checkbox } from './assets/Assets'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)
import provinces from './assets/provinces.json'

const NAVBAR_HEIGHT = 75
export default class ProfileDetails extends Component {
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
      sexValue: 'male',
      birthdayModal: false,
      birthdayValue: '1380/2/1',
      locationModal: false,
      locationValue: 'تهران',
      languagesModal: false,
      // English(EN) - Turkish(TR) - Farsi(FA) - Kurdi(KR) - Gilaki(GL)
      languagesValue: ['FA']
    }
  }

  onScroll(event) {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
    )(event)
  }

  chooseLang = (lang) => {
    const index = this.state.languagesValue.indexOf(lang)
    const array = this.state.languagesValue
    if (index > -1 && array.length > 1) {
      array.splice(array.indexOf(lang), 1)
      this.setState({ languagesValue: array })
    } else if (index === -1) {
      array.splice(0, 0, lang)
      this.setState({ languagesValue: array })
    }
    console.log('langs : ', this.state.languagesValue)
  }
  renderLanguageName = () => {
    const array = []
    const langChars = this.state.languagesValue
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
          <View>
            <Image
              style={[r.wFull, r.bgLight3, { height: 220 }]}
              source={require('./imgs/hostPic.jpg')}
              resizeMode={'contain'}
            />
            <TouchableOpacity
              style={[r.absolute, { alignSelf: 'center', bottom: 10 }]}
            >
              <AirIcon
                name={'photo-upload'} size={35}
                style={[r.white]}
              />
            </TouchableOpacity>
          </View>
          <View style={[r.padd15]}>
            <View style={[r.horizCenter]}>
              <FaBold size={22}>علیرضا رضایی</FaBold>
              <TouchableOpacity
                style={r.top10}
                onPress={() => {
                  this.props.navigator.push({
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
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
              </FaMulti>
              <TouchableOpacity
                style={r.selfCenter}
                onPress={() => {
                  this.props.navigator.push({
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
                      active={this.state.sexValue === 'male'}
                      onPress={() => this.setState({ sexValue: 'male' })}
                    />
                  </View>
                  <View style={g.line} />
                  <View style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}>
                    <Fa size={15}>زن</Fa>
                    <RadioBTN
                      active={this.state.sexValue === 'female'}
                      onPress={() => this.setState({ sexValue: 'female' })}
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
                  selectedDate={'1379/فروردین/1'}
                  minDate={'1320/1/1'}
                  maxDate={'1379/12/29'}
                  onConfirm={data => console.log(data)}
                  onCancel={() => console.log('pressed!')}
                  onSelect={() => console.log('pressed!')}
                />
              </View>
              <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
              <ListBTN
                title={'ایمیل'}
                value={'admin@gmail.com'}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.ProfileDetailsEdit',
                    passProps: { page: 'email' }
                  })
                }}
              />
              <ListBTN
                title={'موبایل'}
                value={'09114556318'}
                noBottomLine
                onPress={() => {
                  this.props.navigator.push({
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
                value={this.state.locationValue}
                onPress={() => this.setState({ locationModal: true })}
              />
              <Modal
                isVisible={this.state.locationModal}
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
                          active={this.state.locationValue === item.name}
                          onPress={() => this.setState({ locationValue: item.name })}
                        />
                      </View>
                    ))}
                  </ScrollView>
                  <View style={[r.wFull, g.bgPrimary, { height: 45 }]}>
                    <TouchableNativeFeedback
                      delayPressIn={0}
                      background={TouchableNativeFeedback.Ripple('#00000022')}
                      onPress={() => this.setState({ locationModal: false })}
                    >
                      <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                        <FaBold size={14} style={[r.white]}>ذخیره</FaBold>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                </View>
              </Modal>

              <ListBTN
                title={'تحصیلات'}
                value={'لیسانس گردشگری'}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.ProfileDetailsEdit',
                    passProps: { page: 'education' }
                  })
                }}
              />
              <ListBTN
                title={'شغل'}
                value={'تور لیدر'}
                onPress={() => {
                  this.props.navigator.push({
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
                  <View style={[r.wFull, g.bgPrimary, { height: 45 }]}>
                    <TouchableNativeFeedback
                      delayPressIn={0}
                      background={TouchableNativeFeedback.Ripple('#00000022')}
                      onPress={() => this.setState({ languagesModal: false })}
                    >
                      <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                        <FaBold size={14} style={[r.white]}>ذخیره</FaBold>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
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
