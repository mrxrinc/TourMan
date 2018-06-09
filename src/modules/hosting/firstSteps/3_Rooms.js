import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBoldMulti } from '../../assets/Font'
import { addHome } from '../../../actions/generalActions'
import { BTN, NavBar, IncDecRow } from '../HostAssets'

class HostingRooms extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    rooms: 1,
    bathrooms: 1,
    beds: 1
  }

  componentWillMount() {
    if (this.props.addHomeState.rooms) {
      const { rooms, beds, bathrooms } = this.props.addHomeState
      this.setState({ rooms, beds, bathrooms })
    }
  }

  nextPage = () => {
    const payload = {
      rooms: this.state.rooms,
      bathrooms: this.state.bathrooms,
      beds: this.state.beds
    }
    this.props.addHome(payload, 'rooms')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingAmenities'
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
            <FaBoldMulti size={20} style={[r.grayDark, r.bottom30]}>
              چند اتاق، سرویس بهداشتی و تخت خواب خواهند داشت؟
            </FaBoldMulti>

            <IncDecRow 
              title={'اتاق'}
              count={this.state.rooms}
              incPress={() => {
                if (this.state.rooms < 16) {
                  this.setState({ rooms: this.state.rooms + 1 })
                }
              }}
              decPress={() => {
                if (this.state.rooms > 1) {
                  this.setState({ rooms: this.state.rooms - 1 })
                }
              }}
            />
            <View style={g.line} />

            <IncDecRow
              title={'سرویس بهداشتی'}
              count={this.state.bathrooms}
              incPress={() => {
                if (this.state.bathrooms < 10) {
                  this.setState({ bathrooms: this.state.bathrooms + 1 })
                }
              }}
              decPress={() => {
                if (this.state.bathrooms > 1) {
                  this.setState({ bathrooms: this.state.bathrooms - 1 })
                }
              }}
            />
            <View style={g.line} />

            <IncDecRow
              title={'تخت خواب'}
              count={this.state.beds}
              incPress={() => {
                if (this.state.beds < 10) {
                  this.setState({ beds: this.state.beds + 1 })
                }
              }}
              decPress={() => {
                if (this.state.beds > 0) {
                  this.setState({ beds: this.state.beds - 1 })
                }
              }}
            />
            <View style={g.line} />
          
          </View>
        </ScrollView>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>3/5</Fa>
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

export default connect(mapStateToProps, mapDispatchToProps)(HostingRooms)

