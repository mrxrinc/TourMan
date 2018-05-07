import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableNativeFeedback
} from 'react-native'
import MapView from 'react-native-maps'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold } from './assets/Font'
import { MapRowItem, MapStyle, MyMarker, FilterInMap } from './assets/Assets'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'
import lineConfig from './assets/line_font_config.json'


const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)

export default class Map extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'transparent'
  }
  constructor(props) {
    super(props)
    this.state = {
      mapCenter: [35.732911, 51.358988],
      items: [
        {
          id: 1,
          title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
          image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
          price: 1250,
          reviews: 152,
          stars: 5,
          like: true,
          verified: true,
          type: 'کل ملک',
          luxury: true,
          focused: true,
          location: [35.733609, 51.365425]
        },
        {
          id: 2,
          title: 'آپارتمان لوکس سعادت آباد',
          image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
          price: 1250,
          reviews: 152,
          stars: 5,
          like: false,
          verified: false,
          type: 'کل ملک',
          luxury: true,
          focused: false,
          location: [35.732911, 51.358988]
        },
        {
          id: 3,
          title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
          image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
          price: 1250,
          reviews: 152,
          stars: 5,
          like: false,
          verified: true,
          type: 'کل ملک',
          luxury: true,
          focused: false,
          location: [35.730890, 51.359331]
        },
        {
          id: 4,
          title: 'ویلای فول در شهر نور',
          image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
          price: 1250,
          reviews: 152,
          stars: 5,
          like: false,
          verified: false,
          type: 'کل ملک',
          luxury: true,
          focused: false,
          location: [35.729774, 51.364009]
        },
      ],
      delta: 0.03,
    }
    //this is for preventing an error at FlatList get current item
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this)
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 60 }
  }

  handleViewableItemsChanged(item) {
    if (item.viewableItems.length > 0) {
      console.log(item.viewableItems[0].key)
    } else {
      console.log('none')
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
            region={{
              latitude: this.state.mapCenter[0],
              longitude: this.state.mapCenter[1],
              latitudeDelta: this.state.delta,
              longitudeDelta: this.state.delta,
            }}
            customMapStyle={MapStyle}
          >
            {this.state.items.map((item) => (
              <MapView.Marker
                coordinate={{
                  latitude: parseFloat(item.location[0]),
                  longitude: parseFloat(item.location[1])
                }}
                key={item.id}
                onPress={() => {
                  console.log(item.title)
                  this.list.scrollToIndex({ index: item.id - 1, viewOffset: 15 })
                }}
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
                onPress={() => console.log(item.id)}
              />
            )}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={[r.leftPadd15, r.top10]}
            horizontal
            ref={ref => { this.list = ref }}
            showsHorizontalScrollIndicator={false}
            initialNumToRender={2}
            keyboardDismissMode={'on-drag'}
            inverted
            onViewableItemsChanged={this.handleViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
          />
        </View>
      </View>
    )
  }
}
