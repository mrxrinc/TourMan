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
import { BTN, NavBar, SwitchRow, CheckboxRow } from '../HostAssets'

class HostingHomeTypes extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    entire: true,
    private: false,
    shared: false,
    luxury: false
  }

  componentWillMount() {
    if (this.props.addHomeState.homeType) {
      const { entire, privateRoom, sharedRoom } = this.props.addHomeState.homeType
      const luxury = this.props.addHomeState.luxury
      this.setState({
        entire, private: privateRoom, shared: sharedRoom, luxury
      })
    }
  }

  handleChoice = (choice) => {
    this.setState({
      entire: choice === 'entire',
      private: choice === 'private',
      shared: choice === 'shared'
    })
  }
  nextPage = () => {
    const payload = {
      host: {
        id: this.props.user._id,
        fullName: `${this.props.user.firstName} ${this.props.user.lastName}`,
        avatar: this.props.user.avatar,
        verified: this.props.user.verified
      },
      homeType: {
        entire: this.state.entire,
        privateRoom: this.state.private,
        sharedRoom: this.state.shared
      },
      luxury: this.state.luxury
    }
    this.props.addHome(payload, 'homeType')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingCapacity'
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
          back={() => this.props.navigator.dismissModal()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark, r.bottom20]}>
              چه نوع خانه ای می خواهید لیست کنید؟
            </FaBold>
            
            <SwitchRow 
              state={this.state.entire}
              title={'کل ملک'}
              onPress={() => this.handleChoice('entire')}  
            />
            <View style={g.line} />

            <SwitchRow
              state={this.state.private}
              title={'اتاق اختصاصی'}
              onPress={() => this.handleChoice('private')}
            />
            <View style={g.line} />

            <SwitchRow
              state={this.state.shared}
              title={'اتاق اشتراکی'}
              onPress={() => this.handleChoice('shared')}
            />
            <View style={g.line} />

            <CheckboxRow
              state={this.state.luxury}
              title={'لاکچری'}
              onPress={() => this.setState({ luxury: !this.state.luxury })}
            />
            <View style={g.line} />
          
          </View>
        </ScrollView>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>1/5</Fa>
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

export default connect(mapStateToProps, mapDispatchToProps)(HostingHomeTypes)
