import React, { Component } from 'react'
import {
  FlatList,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { View } from 'react-native-animatable'
import r from './styles/Rinc'
import g from './styles/General'
import { ItemBig } from './assets/Assets'
import { Fa, FaBold } from './assets/Font'
import airConfig from './assets/air_font_config.json'
import Tabs from './assets/Tabs'
import Loading from './assets/Loading'
import { baseURL } from '../constants/api'
import { userToStore } from '../actions/userActions'

const AirIcon = createIconSetFromFontello(airConfig)

class Trips extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
    data: [],
    loading: true,
    pullRefresh: false
  }

  componentWillMount() {
    this.listTrips()
  }

  listTrips = () => {
    this.setState({ pullRefresh: true })
    if (this.props.user.trips.length) {
      axios.get(`${baseURL}api/homes/getInArray/${this.props.user.trips}`)
        .then(res => {
          this.setState({
            data: res.data,
            loading: false,
            pullRefresh: false
          })
        })
        .catch(err => {
          ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
          console.log(err)
        })
    } else {
      this.setState({ loading: false, data: [] })
    }
  }

  liked = (item) => {
    if (this.props.user.likes.indexOf(item) === -1) {
      return false
    }
    return true
  }

  handleLike = (homeId) => {
    const sendToServer = (data, status = 'add') => {
      const msg = status === 'remove' ?
        'از لیست علاقه مندی ها حذف شد' :
        'به لیست علاقه مندی های شما اضافه شد'
      axios.put(`${baseURL}api/users/update/${this.props.user._id}`, data)
        .then(res => {
          ToastAndroid.show(msg, ToastAndroid.LONG)
          this.setState({
            loading: false,
            pullRefresh: false
          })
        })
        .catch(err => {
          ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
          console.log(err)
        })
    }
    if (this.props.user.likes.indexOf(homeId) === -1) {
      const likes = this.props.user.likes.map(item => item)
      likes.push(homeId)
      const data = {
        ...this.props.user,
        likes
      }
      this.props.userToStore(data)
      sendToServer(data)
    } else {
      const index = this.props.user.likes.indexOf(homeId)
      const likes = this.props.user.likes.slice(0, index)
        .concat(this.props.user.likes.slice(index + 1))
      const data = {
        ...this.props.user,
        likes
      }
      this.props.userToStore(data)
      sendToServer(data, 'remove')
    }
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[r.full]}>

          {this.state.loading === true && (
            <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
              <Loading />
            </View>
          )}

          {this.state.data.length > 0 && !this.state.loading && (
            <View>
              <FaBold
                size={22}
                style={[r.rightMargin20, r.grayDark, r.top50, r.bottom20]}
              >
                سفرهای من
              </FaBold>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <ItemBig
                    key={item._id}
                    title={item.title}
                    image={item.images[0]}
                    rate={item.overallRate}
                    reviews={item.reviewsCount}
                    price={item.price}
                    verified={item.verified}
                    type={item.homeType}
                    like={this.liked(item._id)}
                    likePress={() => this.handleLike(item._id)}
                    onPress={() => {
                      this.props.navigator.push({
                        screen: 'mrxrinc.HomeItem',
                        passProps: { homeId: item._id }
                      })
                    }}
                  />
                )}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                refreshing={this.state.pullRefresh}
                onRefresh={() => this.listTrips()}
                contentContainerStyle={{ opacity: this.state.pullRefresh ? 0.5 : 1 }}
                initialNumToRender={3}
                ListFooterComponent={() => <View style={{ height: 160 }} />}
              />
            </View>
          )}
          {this.state.data.length === 0 && !this.state.loading && (
            <View style={[r.full, r.horizCenter, r.paddHoriz30]}>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Fa size={16} style={[r.centerText, r.grayLight]}>
                  اولین سفرت قراره کجا باشه؟
                </Fa>
              </View>
              <View style={{ flex: 2 }}>
                <View style={g.tripsLine} />
                <View style={[r.top20, r.center, g.tripsLogoWrap]}>
                  <MovingIcons />
                </View>
                <View style={[r.center, r.top30, r.bgWhite, g.tripsBtnWrap]}>
                  <TouchableOpacity
                    style={[g.tripsBTN, r.bgWhite, r.center]}
                    activeOpacity={0.5}
                    onPress={() => {
                      this.props.navigator.push({
                        screen: 'mrxrinc.Explore',
                        animationType: 'fade'
                      })
                    }}
                  >
                    <Fa size={13} style={{ color: '#00A596' }}>شروع جستجو</Fa>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          )}
        </View>

        <Tabs
          active={'trips'}
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

let interval = null
class MovingIcons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: 0
    }
  }
  componentDidMount() {
    interval = setInterval(() => this.movingAnimation(), 2000)
  }

  componentWillUnmount() {
    clearInterval(interval) // this prevent it of throwing an error in navigator.pop()
  }
  movingAnimation() {
    if (this.state.position > -834) {
      this.refs.movingIcons.transitionTo({
        transform: [{ translateY: this.state.position - 139 }]
      }, 600, 'ease-in-out-cubic')
      this.setState({ position: this.state.position - 139 })
    } else {
      this.refs.movingIcons.transitionTo({
        transform: [{ translateY: 0 }]
      }, 1)
      this.setState({ position: 0 })
    }
  }
  render() {
    return (
      <View style={[r.horizCenter, { width: 140, height: 140, paddingTop: 43 }]} >
        <View ref={'movingIcons'} style={[]} useNativeDriver>
          <AirIcon name={'meetups'} size={45} style={[r.white, g.movingIcon]} />
          <AirIcon name={'camper'} size={45} style={[r.white, g.movingIcon]} />
          <AirIcon name={'plane'} size={45} style={[r.white, g.movingIcon]} />
          <AirIcon name={'cup-alt'} size={45} style={[r.white, g.movingIcon]} />
          <AirIcon name={'boat'} size={45} style={[r.white, g.movingIcon]} />
          <AirIcon name={'comments'} size={45} style={[r.white, g.movingIcon]} />
          <AirIcon
            name={'meetups'}
            size={45}
            //Smoothly replace with the first one
            style={[r.white, g.movingIcon, { top: 6 }]}
          />
        </View>
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
    userToStore: userInfo => dispatch(userToStore(userInfo))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Trips)
