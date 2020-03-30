import React, { Component } from 'react'
import {
  View,
  FlatList,
  ToastAndroid,
  TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import MapView from 'react-native-maps'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { MapRowItem, MapStyle, MyMarker, FilterInMap } from './assets/Assets'
import airConfig from './assets/air_font_config.json'
import { baseURL } from '../constants/api'
import { userToStore } from '../actions/userActions'

const AirIcon = createIconSetFromFontello(airConfig)
let timeout 

class Map extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'transparent'
  }
  constructor(props) {
    super(props)
    this.state = {
      region: { // just for initializing region (has no effect after data been recieved)
        latitude: 32.719657, 
        longitude: 53.583574,
        latitudeDelta: 13,
        longitudeDelta: 13
      },
      items: [],
      scrolling: false,
      scrollItem: null
    }
    //this is for preventing an error at FlatList get current item
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 80, minimumViewTime: 100 }
  }
  
  componentWillMount() {
    const newItems = (propName) => propName.map(item => (
      { ...item, focused: false }
    ))
    if (this.props.page === 'luxury') {
      this.setState({ items: newItems(this.props.luxury) })
    } else {
      this.setState({ items: newItems(this.props.filteredHomesList) })
    }
  }
  
  componentDidMount() {
    timeout = setTimeout(() => this.refs.map.fitToElements(true), 2000)
  }

  componentWillUnmount() {
    clearTimeout(timeout)
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

  markerPress = (item) => {
    console.log(item)
    const newRegion = {
      ...this.state.region,
      latitude: item.location.latitude,
      longitude: item.location.longitude
    }
    this.setState({ scrolling: true }, () => {
      this.list.scrollToItem({ item, viewOffset: 15 })
      setTimeout(() => {
        this.setState({ scrolling: false, region: newRegion }, () => {
          const newItems = this.state.items.map((element, key) => {
            if (key === item._id) {
              element.focused = true
              return element
            }
            element.focused = false
            return element
          })
          this.setState({ items: newItems })
        })
      }, 0)
    })
  }

  handleViewableItemsChanged(upperItem) {
    if (upperItem.viewableItems.length > 0 && !this.state.scrolling) {      
      const item = upperItem.viewableItems[0].item
      this.list.scrollToItem({ item, viewOffset: 15 }) // must be named "item" !
      const newItems = this.state.items.map((element, key) => {
        if (key === upperItem.viewableItems[0].index) {
          element.focused = true
          return element
        }
        element.focused = false
        return element
      })
      this.setState({ items: newItems }, () => {
        const newRegion = {
          ...this.state.region,
          latitude: upperItem.viewableItems[0].item.location.latitude,
          longitude: upperItem.viewableItems[0].item.location.longitude
        }
        this.refs.map.animateToRegion(newRegion)
      })
    } else {
      console.log('FlatList items inbetween space')
    }
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>

        <View style={[r.absolute, r.right, r.zIndex1, { width: 60, height: 50, top: 25 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#00000011', true)}
            onPress={() => this.props.navigator.dismissModal()}
          >
            <View pointerEvents={'box-only'} style={[r.full, r.center]}>
              <AirIcon name={'close-bold'} size={14} />
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={[r.full]}>
          <MapView
            ref={'map'}
            style={r.map}
            showsCompass={false}
            region={this.state.region}
            customMapStyle={MapStyle}
            loadingEnabled
            onRegionChangeComplete={region => this.setState({ region })}
            mapPadding={{
              top: 50,
              right: 50,
              bottom: 50,
              left: 50
            }}
          >
            {this.state.items.map((item) => (
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat(item.location.latitude),
                  longitude: parseFloat(item.location.longitude)
                }}
                key={item._id}
                onPress={() => this.markerPress(item)}
              >
                <MyMarker {...item} />
              </MapView.Marker>
            ))}
          </MapView>

          {/*this.props.page !== 'luxury' ? <FilterInMap {...this.props} /> : null*/}
          
        </View>
        <View style={[g.mapList, r.wFull]}>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <MapRowItem
                {...item}
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
            inverted
            showsHorizontalScrollIndicator={false}
            ref={ref => { this.list = ref }}
            initialNumToRender={3}
            onViewableItemsChanged={this.handleViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    luxury: state.luxury,
    filteredHomesList: state.filteredHomesList,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userToStore: (userInfo) => dispatch(userToStore(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
