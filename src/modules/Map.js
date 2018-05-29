import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { MapRowItem, MapStyle, MyMarker, FilterInMap } from './assets/Assets'
import airConfig from './assets/air_font_config.json'

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
        latitude: 35.732911,
        longitude: 51.358988,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
      items: [],
      scrolling: false,
      scrollItem: null
    }
    //this is for preventing an error at FlatList get current item
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 80 }
  }
  
  componentWillMount() {
    if (this.props.page === 'luxury') {
      this.setState({ items: this.props.luxury })
    } else {
      this.setState({ items: this.props.filteredHomesList })
    }
  }
  
  componentDidMount() {
    timeout = setTimeout(() => this.refs.map.fitToElements(true), 2000) 
  }

  componentWillUnmount() {
    clearTimeout(timeout)
  }

  markerPress = (item) => {
    console.log(item)
    const newRegion = {
      ...this.state.region,
      latitude: item.location[0],
      longitude: item.location[1]
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
          latitude: upperItem.viewableItems[0].item.location[0],
          longitude: upperItem.viewableItems[0].item.location[1]
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
                  latitude: parseFloat(item.location[0]),
                  longitude: parseFloat(item.location[1])
                }}
                key={item._id}
                onPress={() => this.markerPress(item)}
              >
                <MyMarker {...item} />
              </MapView.Marker>
            ))}
          </MapView>
          <FilterInMap {...this.props} />
        </View>
        <View style={[g.mapList, r.wFull]}>
          <FlatList
            data={this.state.items}
            renderItem={({ item }) => (
              <MapRowItem
                {...item}
                likePress={() => null}
                onPress={() => console.log(item._id)}
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
            // onMomentumScrollBegin={() => this.setState({ scrolling: true })}
            // onMomentumScrollEnd={() => this.setState({ scrolling: false })}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    luxury: state.luxury,
    filteredHomesList: state.filteredHomesList
  }
}

export default connect(mapStateToProps)(Map)
