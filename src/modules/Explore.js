import React, { Component } from 'react'
import {
  View
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import r from './styles/Rinc'
import g from './styles/General'
import ForYou from './ForYou'
import PopularHomes from './PopularHomes'
import LuxuryHomes from './LuxuryHomes'
import Tabs from './assets/Tabs'
import MainHeader from './assets/MainHeader'
import { filtersToStore, filtersResult } from '../actions/generalActions'
// import Loading from './assets/Loading'

const TabBar = require('./assets/ScrollableTabBar')


class Explore extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  constructor(props) {
    super(props)
    this.state = {
      contentProps: {
        style: { flex: 1 }
      }
    }
    //this will prevent scrollable-tab-view causing problem on pop navigator
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'willAppear':
        this.setState({ contentProps: { style: { flex: 1 } } })
        break
      case 'willDisappear':
        this.setState({ contentProps: { style: { flex: 0 } } })
        break
      default: return null
    }
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <MainHeader
          exploreHeader
          moneyGuid
          provincePress={() => {
            this.props.navigator.showModal({
              screen: 'mrxrinc.Where',
              passProps: { pushToSearchPage: true }
            })
          }}
          datePress={() => {
            this.props.navigator.showModal({
              screen: 'mrxrinc.When',
              passProps: { pushToSearchPage: true }
            })
          }}
          capacityPress={() => {
            this.props.navigator.showModal({
              screen: 'mrxrinc.HowMany',
              passProps: { pushToSearchPage: true }
            })
          }}
        />

        <View style={r.full}>
          <ScrollableTabView
            renderTabBar={() => <TabBar />}
            initialPage={2}
            contentProps={this.state.contentProps}
            locked
            tabBarActiveTextColor={'rgba(255,255,255,1)'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.7)'}
            tabBarTextstyle={[r.bold]}
            style={[{ marginTop: -30 }]}
          >
            <LuxuryHomes tabLabel='لاکچری' {...this.props} />
            <PopularHomes tabLabel='پرطرفدار' {...this.props} />
            <ForYou tabLabel='برای شما' {...this.props} />
          </ScrollableTabView>
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
              screen: 'mrxrinc.HomeItem',
              passProps: { homeId: '5b032f6cb33fc62ba879cd56' },
              animated: true,
              // animationType: 'fade'
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
    user: state.user,
    date: state.date,
    filters: state.filters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filtersToStore: (key, value) => dispatch(filtersToStore(key, value)),
    filtersResult: (data) => dispatch(filtersResult(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
