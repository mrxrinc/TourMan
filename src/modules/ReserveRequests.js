import React, { Component } from 'react'
import {
  View,
  TouchableNativeFeedback, 
  FlatList,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-native-modal'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './assets/air_font_config.json'
import r from './styles/Rinc'
import g from './styles/General'
import Tabs from './assets/Tabs'
import { Fa, FaBold, FaMulti } from './assets/Font'
import { NavBar } from './hosting/HostAssets'
import { filtersResult } from '../actions/generalActions'
import { userToStore } from '../actions/userActions'
import { baseURL } from '../constants/api'
import Loading from './assets/Loading'

const AirIcon = createIconSetFromFontello(airConfig)

class ReserveRequests extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state={
    data: [],
    deleteModal: false,
    deleteId: null,
    onRefresh: false,
    loading: true
  }

  componentWillMount() {
    this.listReservations() 
  }

  listReservations = () => {
    this.setState({ onRefresh: true })
    axios.get(`${baseURL}api/reserve/${this.props.user._id}`)
      .then(res => {
        console.log('API DATA : ', res.data)        
        this.setState({ 
          data: res.data,
          onRefresh: false, 
          loading: false 
        }, () => console.log('STATE : ', this.state))
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
      })
  }

  deleteRequest = (item) => {
    console.log(item)
    this.setState({ data: [], deleteModal: false, loading: true }, () => {
      axios.delete(`${baseURL}api/reserve`, {
        params: { id: item }
      })
        .then(res => {
          console.log('delete response: ', res.data)
          this.listReservations()

          // refreshing new user data to redux
          axios.get(`${baseURL}api/users/${this.props.user._id}`)
            .then(user => {
              this.props.userToStore(user.data)
              ToastAndroid.show('سفارش حذف شد', ToastAndroid.SHORT)
            })
            .catch(err => {
              console.log(err)
              ToastAndroid.show('سفارش حذف شد ولی مشکل کوچکی در بروزرسانی اطلاعات کاربر پیش آمد! ممکن است نیاز به خروج و ورود مجدد به تورمن داشته باشید!', ToastAndroid.LONG)
            })
        })
        .catch(err => {
          console.log(err)
          ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
        })
    })
  }

  handlePrice = (totalPrice) => {
    if (totalPrice.toString().length > 3 && totalPrice.toString().length < 5) {
      return ` ${totalPrice.toString().substr(0, 1)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    } else if (totalPrice.toString().length >= 5 && totalPrice.toString().length < 6) {
      return ` ${totalPrice.toString().substr(0, 2)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    } else if (totalPrice.toString().length >= 6 && totalPrice.toString().length < 7) {
      return ` ${totalPrice.toString().substr(0, 3)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    }
    return ` ${totalPrice} هزار تومان`
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar
          back={() => this.props.navigator.pop()}
        />

        <View style={[r.full, r.top20, r.paddHoriz20]}>
          {this.state.data.length > 0 && (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableNativeFeedback
                  onLongPress={() => this.setState({ deleteModal: true, deleteId: item._id })}
                  background={TouchableNativeFeedback.Ripple('##00848933')}
                  delayPressIn={0}
                  useForeground
                >
                  <View
                    pointerEvents='box-only'
                    style={[r.paddHoriz20, r.bgLight2, r.round10, r.vertical10, r.padd10]}
                  >
                   <FaBold size={18} style={[g.primary]}>{item.homeTitle}</FaBold>
                    <View style={[r.rtl, r.spaceBetween, r.top10]}>
                      <Fa size={16} style={r.grayMid}>نام مهمان: {item.guestName}</Fa>
                      <Fa size={10} style={r.grayMid}>تاریخ رزرو: {item.reservedDate}</Fa>
                    </View>
                    <View style={[r.rtl, r.spaceBetween, r.top10]}>
                      <Fa size={10} style={r.grayMid}>
                        {`به مدت ${item.totalNights} شب  از ${item.reservedDays[0][0]}/${item.reservedDays[0][1]} تا `}
                        {` ${item.reservedDays[item.reservedDays.length - 1][0]}/${item.reservedDays[item.reservedDays.length - 1][1]}`}
                      </Fa>
                      <FaBold size={12} style={g.Accent}>
                        {item.adults &&
                          `${item.adults} بزرگسال `
                        }
                        {item.children !== 0 ?
                          ` - ${item.children} کودک` : null
                        }
                        {item.pets && ' - حیوان خانگی'}
                      </FaBold>
                    </View>
                    <View style={[r.rtl, r.spaceBetween, r.top10]}>
                      <Fa size={13} style={r.grayMid}>مبلغ پرداخت شده: {this.handlePrice(item.totalPrice)}</Fa>
                    </View>
                    {item.message && (
                      <View>
                        <View style={[g.line, r.bgLight4, r.vertical10]} />
                        <View>
                          <Fa size={10} style={r.grayLight}>پیام مهمان:</Fa>
                          <FaMulti size={11} style={[r.grayMid]}>{item.message}</FaMulti>
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableNativeFeedback>
              )}
              keyExtractor={item => `${item._id}`}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              refreshing={this.state.onRefresh}
              onRefresh={() => this.listReservations()}
              contentContainerStyle={{ opacity: this.state.onRefresh ? 0.5 : 1 }}
              ListHeaderComponent={() => (
                <FaBold size={18} style={[r.grayMid, r.bottom10]}>رزروهای درخواست شده:</FaBold>
              )}
              ListFooterComponent={() => <View style={[r.top20, { marginBottom: 70 }]} />}
            />
          )} 
          {this.state.loading && (
            <View style={[r.full, r.center]}>
              <Loading />
            </View>
          )}
          {!this.state.loading && this.state.data.length === 0 && (
            <View style={[r.full, r.center]}>
              <FaBold size={22} style={r.light4}>شما سفارشی ندارید!</FaBold>
            </View>
          )}
        </View>

        <Modal
          isVisible={this.state.deleteModal}
          useNativeDriver
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          onBackdropPress={() => this.setState({ deleteModal: false, deleteId: null })}
          onBackButtonPress={() => this.setState({ deleteModal: false, deleteId: null })}
        >
          <View style={[r.modal]}>
            <Fa size={15}>برای حذف این سفارش مطمئن هستید؟</Fa>
            
            <View style={[g.line, r.bottom20]} />
            <View style={[r.center, { height: 50 }]}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000033')}
                onPress={() => this.deleteRequest(this.state.deleteId)}
              >
                <View
                  pointerEvents={'box-only'}
                  style={[r.center, g.bgAccent, r.round3, { width: '100%', height: 40 }]}
                >
                  <Fa size={18} style={[r.white, r.leftMargin10]}>بله، سفارش را حذف می کنم</Fa>
                  <AirIcon
                    name={'remove'}
                    size={15}
                    color={'#fff'}
                    style={[r.absolute, { left: 10 }]}
                  />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </Modal>

        <Tabs
          active={'profile'}
          profile={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Profile',
              animated: true,
              animationType: 'fade'
            })
          }}
          messages={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Messages',
              animated: true,
              animationType: 'fade'
            })
          }}
          explore={() => {
            this.props.navigator.resetTo({
              screen: 'mrxrinc.Explore',
              animated: true,
              animationType: 'fade'
            })
          }}
          favorites={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Favorites',
              animated: true,
              animationType: 'fade'
            })
          }}
          trips={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.Trips',
              animated: true,
              animationType: 'fade'
            })
          }}
        />
      </View>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userToStore: (data) => dispatch(userToStore(data))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReserveRequests)
