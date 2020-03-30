import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold } from './assets/Font'
import { ItemBig } from './assets/Assets'
import airConfig from './assets/air_font_config.json'
import Tabs from './assets/Tabs'
import Loading from './assets/Loading'
import { filtersResult, filtersToStore, homesListReset } from '../actions/generalActions'
import MainHeader from './assets/MainHeader'
import { baseURL } from '../constants/api'
import { userToStore } from '../actions/userActions'

const AirIcon = createIconSetFromFontello(airConfig)

class Search extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  componentDidMount() {
    this.props.filtersResult(this.props.filters)
  }

  componentWillUnmount() {
    this.props.homesListReset()
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
      <View style={[r.full]}>
        <MainHeader 
          // autoOpen
          provincePress={() => {
            this.props.navigator.showModal({
              screen: 'mrxrinc.Where'
            })
          }}
          datePress={() => {
            this.props.navigator.showModal({
              screen: 'mrxrinc.When'
            })
          }}
          capacityPress={() => {
            this.props.navigator.showModal({
              screen: 'mrxrinc.HowMany'
            })
          }}
        />
 
        {this.props.filteredHomesList.length === 0 ? (
          <View style={[r.absolute, r.hFull, r.wFull, r.center]}>
            <Loading />
          </View>
        ) : (
          <FlatList
            data={this.props.filteredHomesList}
            renderItem={({ item }) => (
              <ItemBig
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
            keyExtractor={item => `${item._id}`}
            showsVerticalScrollIndicator={false}
            refreshing={this.props.filteredHomesList.length === 0}
            onRefresh={() => this.props.filtersResult(this.props.filters)}
            initialNumToRender={2}
            ListFooterComponent={() => <View style={{ height: 80 }} />}
          />
        )}

        <View style={[g.mapFilter, r.absolute, r.bgLight1, r.rtl, r.horizCenter]}>
          <View style={[r.full]}>
            {this.props.filters.activeFilterIcon && <View style={[g.filtersActiveDot, g.bgAccent]} />}
            <TouchableOpacity
              onPress={() => {
                this.props.navigator.showModal({
                  screen: 'mrxrinc.Filters'
                })
              }}
            >
              <View style={[r.rtl, r.center]}>
                <FaBold size={11} style={r.leftPadd5}>فیلتر</FaBold>
                <AirIcon name={'filter'} size={12} style={[r.black, { width: 15 }]} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[r.bgGrayLight, { width: 1, height: 18 }]} />
          <View style={[r.full]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.props.navigator.showModal({
                  screen: 'mrxrinc.Map'
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

        <Tabs
          active={'explore'}
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
    filteredHomesList: state.filteredHomesList,
    filters: state.filters,
    date: state.date,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filtersToStore: (key, value) => dispatch(filtersToStore(key, value)),
    filtersResult: data => dispatch(filtersResult(data)),
    homesListReset: () => dispatch(homesListReset()),
    userToStore: (userInfo) => dispatch(userToStore(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
