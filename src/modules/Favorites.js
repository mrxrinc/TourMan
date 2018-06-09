import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import r from './styles/Rinc'
import { ItemBig } from './assets/Assets'
import { Fa, FaMulti, FaBold } from './assets/Font'
import Tabs from './assets/Tabs'
import Loading from './assets/Loading'
import { baseURL } from '../constants/api'
import { userToStore } from '../actions/userActions'

class Favorites extends Component {
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
    this.listFavorites()
  }

  listFavorites = () => {
    this.setState({ pullRefresh: true })
    if (this.props.user.likes.length) {
      axios.get(`${baseURL}api/homes/getInArray/${this.props.user.likes}`)
        .then(res => {
          this.setState({ 
            data: res.data,
            loading: false, 
            pullRefresh: false 
          })        
          if (res.data.length === 0) {
            this.setState({ data: [] })
          }
        })
        .catch(err => {
          ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
          console.log(err)
        })
    } else {
      this.setState({ data: [], loading: false })
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
          this.listFavorites()
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
          <FaBold
            size={25}
            style={[r.paddHoriz30, r.grayDark, r.top50, r.bottom20]}
          >
            علاقه مندی ها
          </FaBold>
          {this.state.loading === true && (
            <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
              <Loading />
            </View>
          )}
          
          {this.state.data.length > 0 && !this.state.loading && (
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
              onRefresh={() => this.listFavorites()}
              contentContainerStyle={{ opacity: this.state.pullRefresh ? 0.5 : 1 }}
              initialNumToRender={3}
              ListFooterComponent={() => <View style={{ height: 60 }} />}
            />
          )}
          {this.state.data.length === 0 && !this.state.loading && (
            <View style={[r.full, r.bottom50, r.paddHoriz30]}>
              <FaMulti numberOfLines={5} size={11} style={[r.grayLight]}>
                با زدن روی آیکن قلب روی هر خانه می تونید اونرو به لیست علاقه مندی هاتون اضافه کنید.
              </FaMulti>
              <TouchableOpacity
                style={[r.wFull, r.top30]}
                activeOpacity={0.5}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.Explore',
                    animationType: 'fade'
                  })
                }}
              >
                <Fa size={13} style={{ color: '#0b9898' }}>شروع جستجو</Fa>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Tabs
          active={'favorites'}
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
