import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold } from './assets/Font'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

class HomeGallery extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = { current: 0 }    

  pagerPage(e) {
    const index = e.nativeEvent.position
    this.setState({ activeImage: index })
  }

  render() {
    return (
      <View style={[r.full, r.bgBlack]}>
        <View style={[g.navBar, r.top]}>
          <View style={[r.full, r.rtl]}>
            <TouchableNativeFeedback
              onPress={() => {
                this.props.navigator.pop()
              }}
              background={TouchableNativeFeedback.Ripple('#ffffff33',true)}
              delayPressIn={0}
            >
              <View pointerEvents='box-only' style={[g.navBarBtn, r.center]}>
                <Text style={[r.white, r.flipX, g.navBarBtnIcon]}>
                  <AirIcon name={'left-arrow-bold'} size={18} />
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[r.full]}>

          <Swiper
            paginationStyle={{ bottom: 5 }}
            dotStyle={{ 
              backgroundColor: '#ffffff55',
              width: 3,
              height: 3,
              borderRadius: 6
            }}
            activeDotStyle={{
              backgroundColor: '#ffffffdd',
              width: 6,
              height: 6,
              marginHorizontal: 2
            }}
            onIndexChanged={(index) => this.setState({ current: index })}
            loop={false}
            loadMinimal
            loadMinimalSize={3}
            loadMinimalLoader={<Loading />}
          >
            {this.props.home.images.map((item, index) => (
              <View key={index}>
                <Image
                  style={[{ height: '100%' }]}
                  resizeMode={'contain'}
                  source={{ uri: item }}
                />
              </View>
            ))}
          </Swiper>

        </View>
        <View style={[r.absolute, r.bottom, r.padd20, { width: 120 }]}>
          <FaBold style={[r.centerText, { color: '#ffffff88' }]} size={20}>
            <Text>{this.state.current + 1}</Text>
            <Text> / </Text>
            <Text>{this.props.home.images.length}</Text>
          </FaBold>
        </View>

      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps)(HomeGallery)
