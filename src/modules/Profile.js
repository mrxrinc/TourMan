import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold } from './assets/Font'
import airConfig from './assets/air_font_config.json'
import Tabs from './assets/Tabs'

const AirIcon = createIconSetFromFontello(airConfig)

export default class Profile extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
    // data: [
    //   {
    //     id: 1,
    //     title: 'درخواست اجاره آپارتمان',
    //     description: 'سلام. لطفا شرایط آپارتمان رو برای اجاره کردن 10 روزه بفرمایین.',
    //     date: '1397/4/15',
    //     archive: true,
    //   },
    //   {
    //     id: 2,
    //     title: 'اجاره ویلای چالوس',
    //     description: 'سلام. لطفا شرایط آپارتمان رو برای اجاره کردن 10 روزه بفرمایین.',
    //     date: '1397/4/15',
    //     archive: false,
    //   },
    // ]
    data: null
  }
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[r.rtl, r.verticalCenter, r.spaceAround, g.profileBox, r.horizCenter]}
            onPress={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.ProfileDetails'
              })
            }}
          >
            <View>
              <FaBold size={20} style={[r.grayDark]}>محمد میرزایی</FaBold>
              <Fa size={11} style={[r.grayLight, r.top10]}>مشاهده و ویرایش پروفایل</Fa>
            </View>
            <Image
              source={require('./imgs/profile.jpg')}
              style={[g.profileThumb, g.profileThumb2]}
            />
          </TouchableOpacity>
          <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
          <ListBTN
            title={'میزبان خانه شو ...'}
            icon={'id-card-alt'}
            onPress={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Profile'
              })
            }}
          />
          {/* <ListBTN
            title={'تنظیمات نوتیفیکشن'}
            icon={'bell'}
            onPress={() => {
              this.props.navigator.showInAppNotification({
            screen: 'mrxrinc.ReportUser',
            passProps: {},
            autoDismissTimerSec: 1
              })
            }}
          /> */}
          <ListBTN
            title={'درباره تورمن'}
            icon={'handshake'}
            onPress={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.About',
              })
            }}
          />
          <ListBTN
            title={'قوانین استفاده'}
            icon={'description-alt'}
            onPress={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Privacy'
              })
            }}
          />
          <ListBTN
            title={'راهنما'}
            icon={'question-alt'}
            onPress={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Help'
              })
            }}
          />
          <ListBTN
            title={'خروج'}
            icon={'rooms'}
            noBottomLine={true}
            onPress={() => null}
          />
          <View style={{ height: 80 }} />
        </ScrollView>
        <Tabs
          active={'profile'}
          profile={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Profile',
              animationType: 'fade'
            })
          }}
          messages={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Messages',
              animationType: 'fade'
            })
          }}
          explore={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Explore',
              animationType: 'fade'
            })
          }}
          favorites={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Favorites',
              animationType: 'fade'
            })
          }}
          trips={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Trips',
              animationType: 'fade'
            })
          }}
        />
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
            style={[r.rtl, r.horizCenter, r.spaceBetween, r.verticalPadd20, r.paddHoriz20]}
            pointerEvents={'box-only'}
          >
            <Fa style={[r.grayDark]} size={14}>{this.props.title}</Fa>
            <AirIcon
              name={this.props.icon}
              size={22}
              style={[g.primary, r.centerText, { width: 40 }]}
            />
          </View>
        </TouchableNativeFeedback>
        {!this.props.noBottomLine && (
          <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
        )}
      </View>
    )
  }
}
