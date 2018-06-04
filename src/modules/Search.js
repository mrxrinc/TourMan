import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold } from './assets/Font'
import { ItemBig } from './assets/Assets'
import airConfig from './assets/air_font_config.json'
import Tabs from './assets/Tabs'
import Loading from './assets/Loading'
import { homesList } from '../actions/generalActions'
import MainHeader from './assets/MainHeader'

const AirIcon = createIconSetFromFontello(airConfig)

class Search extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  render() {
    return (
      <View style={[r.full]}>
        <MainHeader 
          autoOpen
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
                like={item.like}
                verified={item.verified}
                type={item.homeType}
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
    date: state.date
  }
}

function mapDispatchToProps(dispatch) {
  return {
    homesList: data => dispatch(homesList(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
