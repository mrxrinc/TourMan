import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBold } from '../../assets/Font'
import { addHome } from '../../../actions/generalActions'
import { BTN, NavBar, IncDecRow } from '../HostAssets'


class HostingCapacity extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    adults: 1,
    children: 0
  }

  componentWillMount() {
    if (this.props.addHomeState.capacity) {
      const { adults, children } = this.props.addHomeState.capacity
      this.setState({ adults, children })
    }
  }

  nextPage = () => {
    const payload = {
      adults: this.state.adults,
      children: this.state.children
    }
    this.props.addHome(payload, 'capacity')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingRooms'
    })
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar 
          saveAndExit={() => {
            this.nextPage()
            this.props.navigator.dismissModal()
          }}
          back={() => this.props.navigator.pop()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark, r.bottom30]}>
              تعداد مهمان ها تا چند نفر می تواند باشد؟
            </FaBold>

            <IncDecRow 
              title={'بزرگسال'}
              count={this.state.adults}
              incPress={() => {
                if (this.state.adults < 16) {
                  this.setState({ adults: this.state.adults + 1 })
                }
              }}
              decPress={() => {
                if (this.state.adults > 1) {
                  this.setState({ adults: this.state.adults - 1 })
                }
              }}
            />
            <View style={g.line} />

            <IncDecRow
              title={'کودک'}
              count={this.state.children}
              incPress={() => {
                if (this.state.children < 10) {
                  this.setState({ children: this.state.children + 1 })
                }
              }}
              decPress={() => {
                if (this.state.children > 0) {
                  this.setState({ children: this.state.children - 1 })
                }
              }}
            />
            <View style={g.line} />
          
          </View>
        </ScrollView>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>2/5</Fa>
        </View>

        <BTN
          active
          next
          style={[r.absolute, g.hostingStepsNextBTN]}
          onPress={() => this.nextPage()}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    addHomeState: state.addHomeState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addHome: (data, section) => dispatch(addHome(data, section))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostingCapacity)

