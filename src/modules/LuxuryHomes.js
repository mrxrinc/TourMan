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
                  like={item.like}
                  verified={item.verified}
                  type={item.homeType}
                  luxury={item.luxury}
                  likePress={() => null}
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
    luxuryList: (data) => dispatch(luxuryList(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LuxuryHomes)
