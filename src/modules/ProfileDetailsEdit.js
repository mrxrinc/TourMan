import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableNativeFeedback,
  ToastAndroid,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './assets/air_font_config.json'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaMulti } from './assets/Font'
import { userRegister, userToStore } from '../actions/userActions'
import { baseURL } from '../constants/api'
import Loading from './assets/Loading'

const AirIcon = createIconSetFromFontello(airConfig)

class ProfileDetailsEdit extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = { 
    borderColor: '#e6e6e6',
    user: { // must insert the values to local state then to Redux store and API
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      about: this.props.user.about,
      email: this.props.user.email,
      mobile: this.props.user.mobile,
      education: this.props.user.education,
      job: this.props.user.job,
    }
  }
  componentWillMount() {
    axios.get(`${baseURL}api/users/${this.props.user._id}`)
      .then(user => {
        this.props.userToStore(user.data)
        console.log('FRom axios : ', this.props.user)
      })
      .catch(err => console.log(err))

    // Realm.open({
    //   schema: [{ name: 'localToken', properties: { key: 'string', id: 'string' } }]
    // }).then(realm => {
    //   console.log('realm : ', realm.objects('localToken')[0])
    // })
    // axios.defaults.headers.common.Authorization = `Bearer ${realm.objects('localToken')[0].key}`
  }

  updateState = (value, section) => {
    const updatedUser = this.state.user
    updatedUser[section] = value
    this.setState({ user: updatedUser }, () => console.log('STATE user : ', this.state.user))
  }

  render() {
    return (
      <View style={[g.feedBackWrap, r.bgWhite]}>
        <View
          style={[r.rtl, r.spaceBetween, r.topPadd25,
          { height: 75, borderBottomWidth: 1, borderColor: '#dadada' }]}
        >
          <View>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={() => this.props.navigator.dismissModal()}>
              <View pointerEvents={'box-only'} style={[r.full, r.center, { width: 60 }]}>
                <AirIcon 
                  name={'left-arrow-bold'} 
                  size={18}
                  style={[r.grayDark, r.flipX, r.centerText, { width: 25 }]}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={() => {
                axios.put(`${baseURL}api/users/update/${this.props.user._id}`, { ...this.state.user })
                .then(res => {
                  console.log(res.data)
                  Keyboard.dismiss()
                  this.props.userToStore(this.state.user)
                  ToastAndroid.show('تغییرات اعمال شد', ToastAndroid.SHORT)
                  this.props.navigator.dismissModal()
                })
                .catch(err => {
                  ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
                  console.log(err)
                })
              }}
            >
              <View pointerEvents={'box-only'} style={[r.full, r.center, { width: 80 }]}>
                <Fa size={15} style={{ color: '#009689' }}>ذخیره</Fa>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        {this.props.page === 'name' && (
          <View style={[r.horizCenter, r.padd20]}>
            <Fa size={13}>نام</Fa>
            <TextInput
              style={[r.wFull, r.font, r.bigText, r.centerText, r.grayDark, r.top10]}
              underlineColorAndroid={'#d4d4d4'}
              returnKeyType={'next'}
              value={this.state.user.firstName}
              onChangeText={value => this.updateState(value, 'firstName')}
              onChange={() => console.log(this.props.user)}
            />

            <Fa size={13} style={[r.top30]}>نام خانوادگی</Fa>
            <TextInput
              style={[r.wFull, r.font, r.bigText, r.centerText, r.grayDark, r.top10]}
              underlineColorAndroid={'#d4d4d4'}
              value={this.state.user.lastName}
              onChangeText={value => this.updateState(value, 'lastName')}
              onChange={() => console.log(this.props.user)}
            />
          </View>
        )}

        {this.props.page === 'about' && (
          <View style={[r.padd20]}>
            <Fa size={13}>درباره من</Fa>
            <TextInput
              style={[r.top10, g.feedbackBox, r.rightText, r.grayDark, r.padd20,
                { borderColor: this.state.borderColor }]}
              multiline
              onFocus={() => this.setState({ borderColor: '#0c98a6' })}
              onBlur={() => this.setState({ borderColor: '#e6e6e6' })}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'#d7d7d7'}
              value={this.state.user.about}
              onChangeText={value => this.updateState(value, 'about')}
              onChange={() => console.log(this.props.user)}
            />
            {AboutMeDescriptions}
          </View>
        )}

        {this.props.page === 'email' && (
          <View style={[r.horizCenter, r.padd20]}>
            <Fa size={13}>ایمیل</Fa>
            <TextInput
              style={[r.wFull, r.font, r.bigText, r.centerText, r.grayDark, r.top10]}
              underlineColorAndroid={'#d4d4d4'}
              keyboardType={'email-address'}
              value={this.state.user.email}
              onChangeText={value => this.updateState(value, 'email')}
              onChange={() => console.log(this.props.user)}
            />
            <FaMulti size={12} style={[r.top20, r.grayMid]}>
              ایمیل برای ورود به اکانت شما استفاده می شود و با کسی به اشتراک گذاشته نخواهد شد.
            </FaMulti>
          </View>
        )}

        {this.props.page === 'mobile' && (
          <View style={[r.horizCenter, r.padd20]}>
            <Fa size={13}>شماره موبایل</Fa>
            <TextInput
              style={[r.wFull, r.font, r.bigText, r.centerText, r.grayDark, r.top10]}
              underlineColorAndroid={'#d4d4d4'}
              keyboardType={'phone-pad'}
              value={this.state.user.mobile}
              onChangeText={value => this.updateState(value, 'mobile')}
              onChange={() => console.log(this.props.user)}
            />
            <FaMulti size={12} style={[r.top20, r.grayMid]}>
              شماره موبایل شما با کسی به اشتراک گذاشته نمی شود
            </FaMulti>
          </View>
        )}

        {this.props.page === 'education' && (
          <View style={[r.horizCenter, r.padd20]}>
            <Fa size={13}>تحصیلات</Fa>
            <TextInput
              style={[r.wFull, r.font, r.bigText, r.centerText, r.grayDark, r.top10]}
              underlineColorAndroid={'#d4d4d4'}
              value={this.state.user.education}
              onChangeText={value => this.updateState(value, 'education')}
              onChange={() => console.log(this.props.user)}
            />
          </View>
        )}

        {this.props.page === 'job' && (
          <View style={[r.horizCenter, r.padd20]}>
            <Fa size={13}>شغل</Fa>
            <TextInput
              style={[r.wFull, r.font, r.bigText, r.centerText, r.grayDark, r.top10]}
              underlineColorAndroid={'#d4d4d4'}
              value={this.state.user.job}
              onChangeText={value => this.updateState(value, 'job')}
              onChange={() => console.log(this.props.user)}
            />
          </View>
        )}

      </View>
    )
  }
}

const AboutMeDescriptions = (
  <View>
    <FaMulti size={12} style={[r.top20, r.grayMid]}>
    -  ما در تورمن  روی روابط دوستانه بین مهمانها و میزبانها تمرکز داریم. با معرفی خودتان به دیگرن کمک کنید تا شناخت بهتری از شما داشته باشند.
    </FaMulti>
    <FaMulti size={12} style={[r.grayMid]}>
    -  از چیزهایی که دوست دارید برایشان بگید، مثلا مقاصد، کتابها، فیلم ها، غذاها یا موزیک های مورد علاقه تان.
    </FaMulti>
    <FaMulti size={12} style={[r.grayMid]}>
    -  بهشون بگید که چطور مهمان یا میزبانی هستید سبک مسافرت یا میزبانی تان چیه؟
    </FaMulti>
  </View>
)

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetailsEdit)