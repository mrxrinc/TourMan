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

const AirIcon = createIconSetFromFontello(airConfig)

class Trips extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
    data: [],
    loading: true
  }

  componentWillMount() {
    if (this.props.user.trips.length) {
      this.props.user.trips.forEach(element => {
        axios.get(`${baseURL}api/homes/${element}`)
          .then(res => {
            this.state.data.push(res.data)
            console.log(this.state.data)
            
            this.setState({ loading: false })
          })
          .catch(err => {
            ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
            console.log(err)
          })
      })
    } else {
      this.setState({ loading: false })
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
                    like={item.like}
                    verified={item.verified}
                    type={item.homeType}
                    likePress={() => null}
                    onPress={() => console.log(item.id)}
                  />
                )}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
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


export default connect(mapStateToProps)(Trips)
