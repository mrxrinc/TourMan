import React, { Component } from 'react'
import {
  View,
  TextInput,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBold } from '../../assets/Font'
import { addHome } from '../../../actions/generalActions'
import { BTN, NavBar, SwitchRow } from '../HostAssets'

class HostingHomeRules extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    celebrationAllowed: false,
    petsAllowed: false,
    smokingAllowed: false,
    description: null,
    underLine: '#e6e6e6'
  }

  componentWillMount() {
    if (this.props.addHomeState.homeRules) {
      const { 
        celebrationAllowed,
        petsAllowed,
        smokingAllowed,
        description
       } = this.props.addHomeState.homeRules
      this.setState({ 
        celebrationAllowed,
        petsAllowed,
        smokingAllowed,
        description
       })
    }
  }

  nextPage = () => {
    const payload = {
      celebrationAllowed: this.state.celebrationAllowed,
      petsAllowed: this.state.petsAllowed,
      smokingAllowed: this.state.smokingAllowed,
      description: this.state.description
    }
    this.props.addHome(payload, 'homeRules')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingReservation'
    })
  }

  render() {
    return (
      <View style={[r.full, r.bgwhite]}>
        <NavBar
          saveAndExit={() => {
            this.nextPage()
            this.props.navigator.dismissModal()
          }}
          back={() => this.props.navigator.dismissModal()}
        />
        <FaBold size={20} style={[r.grayDark, r.vertical10, r.paddHoriz20]}>
          قوانین خانه که مهمان ها باید رعایت کنند:
        </FaBold>
        <ScrollView
          style={[r.padd20, r.bottom70]}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
        >
          <View style={[r.bottom50]}>
            <Fa size={12} style={[r.grayLight, r.bottom5]}>قوانین اختصاصی خانه شما:</Fa>
            <TextInput
              style={[r.grayDark, r.bgLight1, g.hostingAboutInputs]}
              onFocus={() => this.setState({ underLine: '#0c98a6' })}
              onBlur={() => this.setState({ underLine: '#e6e6e6' })}
              underlineColorAndroid={this.state.underLine}
              placeholderTextColor={'#d7d7d7'}
              multiline
              value={this.state.description}
              onChangeText={value => this.setState({ description: value })}
            />
          </View>
          <View style={r.padd20}>
            <SwitchRow
              state={this.state.celebrationAllowed}
              title={'برگزاری مراسمات'}
              onPress={() => this.setState({ celebrationAllowed: !this.state.celebrationAllowed })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.smokingAllowed}
              title={'سیگار کشیدن'}
              onPress={() => this.setState({ smokingAllowed: !this.state.smokingAllowed })}
            />
            <View style={g.line} />
            <SwitchRow
              state={this.state.petsAllowed}
              title={'آوردن حیوان خانگی'}
              onPress={() => this.setState({ petsAllowed: !this.state.petsAllowed })}
            />
          </View>
        </ScrollView>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>1/4</Fa>
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
    addHomeState: state.addHomeState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addHome: (data, section) => dispatch(addHome(data, section))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostingHomeRules)
