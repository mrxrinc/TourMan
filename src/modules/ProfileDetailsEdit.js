import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './assets/air_font_config.json'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaBoldMulti, FaMulti } from './assets/Font'
import Loading from './assets/Loading'

const AirIcon = createIconSetFromFontello(airConfig)


export default class ProfileDetailsEdit extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      borderColor: '#e6e6e6'
    }
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
              onPress={() => this.props.navigator.pop()}>
              <View pointerEvents={'box-only'} style={[r.full, r.center, { width: 60 }]}>
                <AirIcon name={'left-arrow-bold'} size={18}
                  style={[r.grayDark, r.flipX, r.centerText, { width: 25 }]}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={() => this.props.navigator.dismissModal()}>
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
            />

            <Fa size={13} style={[r.top30]}>نام خانوادگی</Fa>
            <TextInput
              style={[r.wFull, r.font, r.bigText, r.centerText, r.grayDark, r.top10]}
              underlineColorAndroid={'#d4d4d4'}
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
            />
          </View>
        )}

        {this.props.page === 'job' && (
          <View style={[r.horizCenter, r.padd20]}>
            <Fa size={13}>شغل</Fa>
            <TextInput
              style={[r.wFull, r.font, r.bigText, r.centerText, r.grayDark, r.top10]}
              underlineColorAndroid={'#d4d4d4'}
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
