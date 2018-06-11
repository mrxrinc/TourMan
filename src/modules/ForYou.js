import React, { Component } from 'react'
import {
  ScrollView,
  Image,
  FlatList,
  TouchableHighlight,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import { View } from 'react-native-animatable'
import axios from 'axios'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold } from './assets/Font'
import Loading from './assets/Loading'
import { baseURL } from '../constants/api'
import { RowItem } from './assets/Assets'
import { userToStore } from '../actions/userActions'
import { exploreFunc, filtersToStore, filtersResult } from '../actions/generalActions'


class ForYou extends Component {

  componentWillMount() {
    this.props.exploreFunc()
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

  render() {
    return (
      <ScrollView
        style={[r.full, r.bgWhite, r.topPadd20]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 270 }}>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <FaBold size={15} style={[r.grayDark]}>
              پیشنهاد ویژه
            </FaBold>
          </View>
          {this.props.explore.specialOffers.length === 0 ? (
            <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
              <Loading />
            </View>
          ) : (
            <FlatList
              data={this.props.explore.specialOffers}
              renderItem={({ item }) => (
                <RowItem
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
              contentContainerStyle={[r.leftPadd15, r.top10]}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={2}
              inverted
            />
          )}
        </View>

       
        <View style={r.top40}>
          <View style={[r.rtl, r.paddHoriz15]}>
            <FaBold size={14} style={[r.grayDark]}>
              مقاصد منتخب
            </FaBold>
          </View>
          {this.props.explore.promotedCities.length === 0 ? (
            <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
              <Loading />
            </View>
          ) : (
            <FlatList
              data={this.props.explore.promotedCities}
              renderItem={({ item }) => (
                <View 
                  style={[g.featuredDest]}
                  animation={'fadeIn'}
                  duration={1000}
                  easing={'ease-out-back'}
                  useNativeDriver
                >
                  <TouchableHighlight
                    underlayColor={'rgba(0,0,0,0.1)'}
                    onPress={() => {
                      this.props.filtersToStore('province', item.province)
                      this.props.filtersResult(this.props.filters)
                      this.props.navigator.push({
                        screen: 'mrxrinc.Search'
                      })
                    }}
                  >
                    <View>
                      <Image
                        source={{ uri: item.image }}
                        style={[g.featuredDestImg, g.round, r.bgLight2]}
                        resizeMode={'cover'} 
                      />
                      <View style={r.topPadd5}>
                        <FaBold style={[r.grayDark, r.rightPadd5]} size={15}>{item.name}</FaBold>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
              keyExtractor={item => `${item._id}`}
              contentContainerStyle={[r.leftPadd15, r.top10]}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={4}
              inverted
            />
          )}
        </View>

        <View style={[r.top60, { height: 270 }]}>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <FaBold size={15} style={[r.grayDark]}>
              خانه های تهران
            </FaBold>
            <Fa 
              size={13} 
              style={[r.grayLight]}
              onPress={() => {
                this.props.filtersToStore('province', 'تهران')
                this.props.filtersResult(this.props.filters)
                this.props.navigator.push({ screen: 'mrxrinc.Search' })
              }}
            >
              همه
            </Fa>
          </View>
          {this.props.explore.city01.length === 0 ? (
            <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
              <Loading />
            </View>
          ) : (
            <FlatList
              data={this.props.explore.city01}
              renderItem={({ item }) => (
                <RowItem
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
              contentContainerStyle={[r.leftPadd15, r.top10]}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={2}
              inverted
            />
          )}
        </View>

        <View style={[r.top40, { height: 270 }]}>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <FaBold size={15} style={[r.grayDark]}>
              خانه های مازندران
            </FaBold>
            <Fa
              size={13}
              style={[r.grayLight]}
              onPress={() => {
                this.props.filtersToStore('province', 'مازندران')
                this.props.navigator.push({ screen: 'mrxrinc.Search' })
              }}
            >
              همه
            </Fa>
          </View>
          {this.props.explore.city02.length === 0 ? (
            <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
              <Loading />
            </View>
          ) : (
            <FlatList
              data={this.props.explore.city02}
              renderItem={({ item }) => (
                <RowItem
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
              contentContainerStyle={[r.leftPadd15, r.top10]}
              horizontal
              showsHorizontalScrollIndicator={false}
              initialNumToRender={2}
              inverted
            />
          )}
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    explore: state.explore,
    filters: state.filters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userToStore: (userInfo) => dispatch(userToStore(userInfo)),
    exploreFunc: (data) => dispatch(exploreFunc(data)),
    filtersToStore: (key, value) => dispatch(filtersToStore(key, value)),
    filtersResult: (data) => dispatch(filtersResult(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForYou)
