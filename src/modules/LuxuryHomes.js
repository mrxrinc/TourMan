import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold } from './assets/Font'
import Loading from './assets/Loading'
import { ItemBig } from './assets/Assets'
import airConfig from './assets/air_font_config.json'
import { baseURL } from '../constants/api'
import { luxuryList } from '../actions/generalActions'
import { userToStore } from '../actions/userActions'

const AirIcon = createIconSetFromFontello(airConfig)

class LuxuryHomes extends Component {

  componentWillMount() {
    axios.get(`${baseURL}api/homes`, { params: { luxury: true } })
      .then(res => {
        this.props.luxuryList(res.data)
      })
      .catch(err => {
        ToastAndroid.show('مشکلی در دریافت اطلاعات پیش آمد', ToastAndroid.LONG)
        console.log(err)
      })
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
    // this.props.user is passed from Explore page coz of ...this.props on line 84-86
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

  renderHeader() {
    return (
      <FaBold size={15} style={[r.top20, r.rightMargin20]}>خانه های لاکچری</FaBold>
    )
  }
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        {this.props.luxury.length === 0 ? (
          <View style={[r.absolute, r.hFull, r.wFull, r.center]}>
            <Loading />
          </View>
        ) : (
            <FlatList
              data={this.props.luxury}
              renderItem={({ item }) => (
                <ItemBig
                  title={item.title}
                  image={item.images[0]}
                  rate={item.overallRate}
                  reviews={item.reviewsCount}
                  price={item.price}
                  verified={item.verified}
                  type={item.homeType}
                  luxury={item.luxury}
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
              keyExtractor={item => `${item._id}`}
              showsVerticalScrollIndicator={false}
              initialNumToRender={2}
              ListHeaderComponent={() => this.renderHeader()}
              ListFooterComponent={() => <View style={{ height: 80 }} />}
            />
          )}

        <View
          style={[g.mapFilter, r.absolute, r.bgLight1, r.rtl, r.horizCenter,
          { width: 70 }]}
        >
          <View style={[r.full]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.props.navigator.showModal({
                  screen: 'mrxrinc.Map',
                  passProps: { page: 'luxury' }
                })
              }}
            >
              <View style={[r.rtl, r.center]}>
                <FaBold size={11} style={r.leftPadd5}>نقشه</FaBold>
                <AirIcon name={'map-marker-alt'} size={12} style={[r.black, { width: 15 }]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    luxury: state.luxury
  }
}

function mapDispatchToProps(dispatch) {
  return {
    luxuryList: (data) => dispatch(luxuryList(data)),
    userToStore: (userInfo) => dispatch(userToStore(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LuxuryHomes)
