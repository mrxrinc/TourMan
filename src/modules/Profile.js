import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import Realm from 'realm'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold } from './assets/Font'
import airConfig from './assets/air_font_config.json'
import Tabs from './assets/Tabs'
import { userReset } from '../actions/userActions'
 
const AirIcon = createIconSetFromFontello(airConfig)

class Profile extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
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
              <FaBold size={20} style={[r.grayDark]}>
                <Text>{this.props.user.firstName}</Text>
                <Text>  </Text>
                <Text>{this.props.user.lastName}</Text>
              </FaBold>
              <Fa size={11} style={[r.grayLight, r.top10]}>مشاهده و ویرایش پروفایل</Fa>
            </View>
            <Image
              source={{ uri: this.props.user.avatar }}
              style={[g.profileThumb, g.profileThumb2]}
            />
          </TouchableOpacity>
          <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
          <ListBTN
            title={'میزبان خانه شو ...'}
            icon={'id-card-alt'}
            onPress={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Listings',
                animationType: 'fade'
              })
            }}
          />
          <ListBTN
            title={'درخواستهای رزرو'}
            icon={'host-home-alt'}
            onPress={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.ReserveRequests',
                animationType: 'fade'
              })
            }}
          />
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
            noBottomLine
            onPress={() => {
              ToastAndroid.show('از اکانت خود خارج شدید', ToastAndroid.SHORT)
              Realm.open({
                schema: [{ name: 'localToken', properties: { key: 'string', id: 'string' } }]
              }).then(realm => {
                realm.write(() => {
                  realm.delete(realm.objects('localToken'))
                })
                // console.log('Have realm ? : ', realm.objects('localToken')[0] == null)
                if (realm.objects('localToken')[0] == null) { // must be 2 equal sign OR wont work!
                  this.props.navigator.resetTo({ screen: 'mrxrinc.Registration', passProps: { page: 'SignUp' } })
                  this.props.userReset()
                  // console.log('USER AFTER LOGOUT ==> ', this.props.user)                  
                } else {
                  console.log('Couldnt destroy realm')  
                  ToastAndroid.show('مشکلی پیش آمد، لطفا دوباره تلاش کنید :(', ToastAndroid.LONG)                
                }
              })
            }}
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
            this.props.navigator.resetTo({
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

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userReset: () => dispatch(userReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
