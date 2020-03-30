import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from '../assets/air_font_config.json'
import r from '../styles/Rinc'
import g from '../styles/General'
import { BTN, PublishBTN } from './HostAssets'
import { FaBold, FaMulti } from '../assets/Font'
import { addHome, addHomeStepsFunc } from '../../actions/generalActions'
import { baseURL } from '../../constants/api'

const AirIcon = createIconSetFromFontello(airConfig)

class BeginHosting extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = { loading: false }

  componentWillMount() {
    if (this.props.editItem) {
      this.props.addHome(this.props.editItem, 'edit')
      this.props.addHomeStepsFunc(4)
    }
    setTimeout(() => {
      console.log(this.props.addHomeState)
    }, 1000)
  }

  componentWillUnmount() {
    this.props.addHomeStepsFunc(1)
    this.props.addHome(null, null)
  }

  publishHome = () => {
    this.setState({ loading: true })
    if (!this.props.editItem) {
      axios.post(`${baseURL}api/homes`, { ...this.props.addHomeState })
        .then(res => {
          this.props.addHomeStepsFunc(1)
          this.props.addHome(null, null)
          this.props.navigator.resetTo({
            screen: 'mrxrinc.Listings'
          })
          this.props.navigator.showInAppNotification({
            screen: 'mrxrinc.Notification',
            autoDismissTimerSec: 3,
            passProps: {
              alarm: false,
              success: true,
              message: 'ملک شما با موفقیت در تورمن ثبت شد!'
            }
          })
        })
        .catch(err => {
          this.setState({ loading: false })
          this.props.navigator.showInAppNotification({
            screen: 'mrxrinc.Notification',
            autoDismissTimerSec: 2,
            passProps: {
              alarm: true,
              message: 'مشکلی در ارسال  درخواست شما بوجود آمد. لطفا بعدا تلاش بفرمایید.'
            }
          })
          console.log(err)
        })
    } else {
      axios.put(`${baseURL}api/homes/${this.props.editItem._id}`, { ...this.props.addHomeState })
        .then(res => {
          this.props.addHomeStepsFunc(1)
          this.props.addHome(null, null)
          this.props.navigator.resetTo({
            screen: 'mrxrinc.Listings'
          })
          this.props.navigator.showInAppNotification({
            screen: 'mrxrinc.Notification',
            autoDismissTimerSec: 3,
            passProps: {
              alarm: false,
              success: true,
              message: 'تغییرات با موفقیت ذخیره شدند!'
            }
          })
        })
        .catch(err => {
          ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
          console.log(err) 
        })    
    }
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[{ height: 150, backgroundColor: '#00a699' }]}>
            <TouchableOpacity
              style={[r.absolute, r.right, r.topPadd25, r.center, r.zIndex2, 
                { width: 50, height: 75, }]}
              onPress={() => this.props.navigator.pop()}
            >
              <Text style={[r.grayMid, r.flipX, g.navBarBtnIcon]}>
                <AirIcon name={'close-bold'} size={15} style={r.white} />
              </Text>
            </TouchableOpacity>
            <View style={[r.full, r.center, r.topPadd25]}>
              <FaBold size={22} style={[r.white]}>
                برای میزبانی از مهمان ها آماده شویم!
              </FaBold>
            </View>
          </View>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark]}>با مقدمات شروع کنیم</FaBold>
            <FaMulti size={14} style={r.grayMid}>
              ما چند سوال درباره تعداد اتاق، تختخواب، سرویس بهداشتی  و امکانات خانه می پرسیم.
            </FaMulti>
            <BTN 
              active
              edit={this.props.addHomeSteps > 1}
              onPress={() => this.props.navigator.showModal({
                screen: 'mrxrinc.HostingHomeTypes'
              })}
            />
            <View style={[g.line, r.vertical20]} />

            <FaBold size={20} style={[r.grayDark]}>چشم انداز خانه را تعیین کنید</FaBold>
            <FaMulti size={14} style={r.grayMid}>
              تصاویر، تیتر و توضیحاتی که مهمانها در جستجوی آن هستند را وارد کنید.
            </FaMulti>
            <BTN
              active={this.props.addHomeSteps >= 2}
              addPhoto={this.props.addHomeSteps === 2}
              edit={this.props.addHomeSteps > 2}
              onPress={() => this.props.navigator.showModal({
                screen: 'mrxrinc.HostingPhoto'
              })}
            />
            <View style={[g.line, r.vertical20]} />

            <FaBold size={20} style={[r.grayDark]}>جمع بندی و آماده شدن برای مهمان ها</FaBold>
            <FaMulti size={14} style={r.grayMid}>
              قیمت ، قوانین خانه و آدرس محل روی نقشه را تعیین می کنید.
            </FaMulti>
            <BTN
              active={this.props.addHomeSteps >= 3}
              edit={this.props.addHomeSteps > 3}
              onPress={() => this.props.navigator.showModal({
                screen: 'mrxrinc.HostingHomeRules'
              })}
            />
            <View style={[g.line, r.vertical20]} />
            
            {this.props.editItem ? (
              <PublishBTN 
                active
                edit
                loading={this.state.loading}
                onPress={() => this.publishHome()}
              />
            ) : (
              <PublishBTN 
                active={this.props.addHomeSteps === 4}
                loading={this.state.loading}
                onPress={() => this.publishHome()}
              />
            )}
            
          
          </View>
        </ScrollView>

      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    addHomeSteps: state.addHomeSteps,
    addHomeState: state.addHomeState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addHome: (data, section) => dispatch(addHome(data, section)),
    addHomeStepsFunc: (data) => dispatch(addHomeStepsFunc(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeginHosting)
