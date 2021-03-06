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
import { BTN, NavBar, SwitchRow } from '../HostAssets'

class HostingAmenities extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    wifi: false,
    heat: false,
    washingMachine: false,
    iron: false,
    laptopFriendly: false,
    accessories: false,
    fireplace: false,
    cooler: false,
    tv: false,
    parkingLot: false,
    kitchen: false,
    hairDryer: false,
    firstAids: false,
    smokeDetector: false,
  }

  componentWillMount() {
    if (this.props.addHomeState.amenities) {
      const { 
        wifi, heat, washingMachine, iron, laptopFriendly, accessories, 
        fireplace, cooler, tv, parkingLot, kitchen, hairDryer, firstAids, smokeDetector
       } = this.props.addHomeState.amenities
      this.setState({ 
        wifi, 
        heat, 
        washingMachine, 
        iron, 
        laptopFriendly, 
        accessories,
        fireplace, 
        cooler, 
        tv, 
        parkingLot, 
        kitchen, 
        hairDryer, 
        firstAids, 
        smokeDetector
       })
    }
  }

  nextPage = () => {
    const payload = {
      wifi: this.state.wifi,
      heat: this.state.heat,
      washingMachine: this.state.washingMachine,
      iron: this.state.iron,
      laptopFriendly: this.state.laptopFriendly,
      accessories: this.state.accessories,
      fireplace: this.state.fireplace,
      cooler: this.state.cooler,
      tv: this.state.tv,
      parkingLot: this.state.parkingLot,
      kitchen: this.state.kitchen,
      hairDryer: this.state.hairDryer,
      firstAids: this.state.firstAids,
      smokeDetector: this.state.smokeDetector
    }
    this.props.addHome(payload, 'amenities')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingLocation'
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
              ???? ???????????????? ???? ???????????? ?????????? ???? ???????? ???????????? ????????
            </FaBoldMulti>

            <SwitchRow
              state={this.state.wifi}
              title={'?????? ??????'}
              description={'???????????? ?????????? ???? ??????????????'}
              onPress={() => this.setState({ wifi: !this.state.wifi })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.heat}
              title={'????????????'}
              description={'???????? ???? ?????????? ???????????? ?????????? ???? ??????????'}
              onPress={() => this.setState({ heat: !this.state.heat })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.washingMachine}
              title={'??????????'}
              description={'?????????? ???????????????? ???? ???????? ??????????????'}
              onPress={() => this.setState({ washingMachine: !this.state.washingMachine })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.laptopFriendly}
              title={'?????????? ???????? ?????? ???? ???? ??????'}
              description={'???? ?????? ???? ???????? ???????? ???????? ???? ?????? ???? ?????????? ???? ?????????? ???? ?????????? ?????? ??????????'}
              onPress={() => this.setState({ laptopFriendly: !this.state.laptopFriendly })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.accessories}
              title={'?????????? ??????????'}
              description={'?????????? ???????????? ???????????? ???????????? ?????????? ?? ...'}
              onPress={() => this.setState({ accessories: !this.state.accessories })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.kitchen}
              title={'????????????????'}
              description={'?????????? ???????? ?????? ???????? ???????????? ??????????????'}
              onPress={() => this.setState({ kitchen: !this.state.kitchen })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.iron}
              title={'??????'}
              onPress={() => this.setState({ iron: !this.state.iron })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.fireplace}
              title={'????????????'}
              onPress={() => this.setState({ fireplace: !this.state.fireplace })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.cooler}
              title={'????????'}
              onPress={() => this.setState({ cooler: !this.state.cooler })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.tv}
              title={'????????????????'}
              onPress={() => this.setState({ tv: !this.state.tv })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.parkingLot}
              title={'?????? ???????? ??????????'}
              onPress={() => this.setState({ parkingLot: !this.state.parkingLot })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.hairDryer}
              title={'??????????'}
              onPress={() => this.setState({ hairDryer: !this.state.hairDryer })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.firstAids}
              title={'???????? ???????????? ??????????'}
              onPress={() => this.setState({ firstAids: !this.state.firstAids })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.smokeDetector}
              title={'?????????? ??????'}
              onPress={() => this.setState({ smokeDetector: !this.state.smokeDetector })}
            />
            <View style={{ height: 80 }} />
          </View>
        </ScrollView>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>4/5</Fa>
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

export default connect(mapStateToProps, mapDispatchToProps)(HostingAmenities)

