import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableNativeFeedback, 
  FlatList,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-native-modal'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from '../assets/air_font_config.json'
import r from '../styles/Rinc'
import g from '../styles/General'
import Tabs from '../assets/Tabs'
import { NavBar } from './HostAssets'
import { Fa, FaBold } from '../assets/Font'
import { filtersResult } from '../../actions/generalActions'
import { baseURL } from '../../constants/api'
import Loading from '../assets/Loading'

const AirIcon = createIconSetFromFontello(airConfig)

class Listings extends Component {
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
    this.listOwnedHomes()
    console.log('addHome data after publish : ===> ', this.props.addHomeState)    
  }

  listOwnedHomes = () => {
    this.setState({ onRefresh: true })
    axios.get(`${baseURL}api/homes`, {
      params: { host: this.props.user._id }
    })
      .then(res => {
        this.setState({ onRefresh: false, loading: false })      
        this.setState({ data: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  editHome = (item) => {
    this.props.navigator.push({
      screen: 'mrxrinc.BeginHosting',
      passProps: { editItem: item }
    })
  }

  deleteHome = (item) => {
    console.log(item)
    this.setState({ data: [], deleteModal: false }, () => {
      axios.delete(`${baseURL}api/homes`, {
        params: { id: item }
      })
        .then(res => {
          console.log(res.data)
          this.listOwnedHomes()
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
  
  listHeader = () => (
    <FaBold size={20} style={[r.grayDark, r.bottom20, r.rightMargin20]}>خانه های من</FaBold>
  )

  listFooter = () => (
    <View style={[r.top20, { marginBottom: 90 }]}>
      <TouchableNativeFeedback
        onPress={() => {
          this.props.navigator.push({
            screen: 'mrxrinc.BeginHosting'
          })
        }}
        background={TouchableNativeFeedback.Ripple('#00000011')}
        delayPressIn={0}
        useForeground
      >
        <View
          pointerEvents='box-only'
          style={[r.rtl, r.spaceBetween, r.paddHoriz40, r.horizCenter, { height: 50 }]}
        >
          <Fa size={14} style={g.primary}>افزودن مورد جدید</Fa>
          <Text style={[g.primary, g.navBarBtnIcon, { transform: [{ rotate: '45deg' }] }]}>
            <AirIcon name={'close-bold'} size={18} />
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar
          back={() => this.props.navigator.pop()}
          addHome={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.BeginHosting'
            })
          }}
        />

        <View style={[r.full, r.top30]}>
          {this.state.data.length > 0 && (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableNativeFeedback
                  onPress={() => this.editHome(item)}
                  onLongPress={() => this.setState({ deleteModal: true, deleteId: item._id })}
                  background={TouchableNativeFeedback.Ripple('##00848933')}
                  delayPressIn={0}
                  useForeground
                >
                  <View
                    pointerEvents='box-only'
                    style={[r.rtl, r.spaceBetween, r.paddHoriz20, { height: 100 }]}
                  >
                    <View style={[r.full, r.padd10, r.verticalCenter]}>
                      <FaBold size={18} style={[r.grayDark]}>{item.title}</FaBold>
                      <Fa size={13} style={r.top10}>{item.about.details}</Fa>
                    </View>
                    <View style={[r.center, { width: 100 }]}>
                      <Image
                        source={{ uri: item.images[0] }}
                        style={[g.listingThumb]}
                      />
                    </View>
                  </View>
                </TouchableNativeFeedback>
              )}
              keyExtractor={item => `${item._id}`}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              refreshing={this.state.onRefresh}
              onRefresh={() => this.listOwnedHomes()}
              contentContainerStyle={{ opacity: this.state.onRefresh ? 0.5 : 1 }}
              ItemSeparatorComponent={() => <View style={g.line} />}
              ListHeaderComponent={() => this.listHeader()}
              ListFooterComponent={() => this.listFooter()}
            />
          )} 
          {this.state.loading && (
            <View style={[r.full, r.center]}>
              <Loading />
            </View>
          )}
          {!this.state.loading && this.state.data.length === 0 && (
            <View style={[r.full, r.center]}>
              <FaBold size={22} style={r.light4}>اولین خانه تان را ثبت کنید</FaBold>
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
            <Fa size={15}>برای حذف مطمئن هستید؟</Fa>
            
            <View style={[g.line, r.bottom20]} />
            <View style={[r.center, { height: 50 }]}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000033')}
                onPress={() => this.deleteHome(this.state.deleteId)}
              >
                <View
                  pointerEvents={'box-only'}
                  style={[r.center, g.bgAccent, r.round3, { width: '100%', height: 40 }]}
                >
                  <Fa size={18} style={[r.white, r.leftMargin10]}>بله، خانه را حذف می کنم</Fa>
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
    addHomeState: state.addHomeState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filtersResult: (data) => dispatch(filtersResult(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings)
