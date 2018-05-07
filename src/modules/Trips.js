import React, { Component } from 'react'
import {
  FlatList,
  TouchableOpacity
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import { View, createAnimatableComponent } from 'react-native-animatable'
import r from './styles/Rinc'
import g from './styles/General'
import { ItemBig } from './assets/Assets'
import { Fa, FaBold } from './assets/Font'
import airConfig from './assets/air_font_config.json'
import Tabs from './assets/Tabs'

const AirIcon = createIconSetFromFontello(airConfig)

export default class Trips extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
    // data: [
    //   {
    //     id: 1,
    //     title: 'ویلای فول در شهر نور، مازندران',
    //     image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
    //     price: 1250,
    //     reviews: 152,
    //     stars: 5,
    //     like: true,
    //     verified: true,
    //     type: 'کل ملک'
    //   },
    //   {
    //     id: 2,
    //     title: 'آپارتمان لوکس سعادت آباد',
    //     image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
    //     price: 1250,
    //     reviews: 152,
    //     stars: 5,
    //     like: false,
    //     verified: false,
    //     type: 'کل ملک'
    //   },
    // ]
    data: null
  }
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[r.full]}>

          {this.state.data !== null ? (
            <View>
              <FaBold
                size={22}
                style={[r.rightMargin20, r.grayDark, r.top60, r.bottom20]}
              >
                سفرهای من
              </FaBold>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <ItemBig
                    key={item.id}
                    title={item.title}
                    image={item.image}
                    rate={5}
                    reviews={168}
                    price={1260}
                    like={item.like}
                    verified={item.verified}
                    type={item.type}
                    likePress={() => null}
                    onPress={() => console.log(item.id)}
                  />
                )}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                initialNumToRender={3}
                ListFooterComponent={() => <View style={{ marginTop: 190 }} />}
              />
            </View>
          ) : (
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
            this.props.navigator.push({
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

class MovingIcons extends Component {
  state = {
    position: 0
  }
  componentDidMount() {
    setInterval(() => this.movingAnimation(), 2000)
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
      <View
        style={[r.horizCenter, { width: 140, height: 140, paddingTop: 43 }]}
        useNativeDriver
      >
        <View ref={'movingIcons'} style={[]}>
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
