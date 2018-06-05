import React, { Component } from 'react'
import {
  View,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBold } from '../../assets/Font'
import { addHome, addHomeStepsFunc } from '../../../actions/generalActions'
import { BTN, NavBar } from '../HostAssets'

class HostingTitle extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    title: null,
    underLine: '#e6e6e6'
  }

  componentWillMount() {
    if (this.props.addHomeState.title) {
      const title = this.props.addHomeState.title
      this.setState({ title })
    }
  }

  nextPage = () => {
    const payload = {
      title: this.state.title
    }
    this.props.addHome(payload, 'title')
    this.props.addHomeStepsFunc(3)
    this.props.navigator.dismissModal()
  }

  render() {
    return (
      <View style={[r.full, r.bgwhite]}>
        <NavBar
          saveAndExit={() => {
            this.state.title !== null ? this.props.addHomeStepsFunc(3) : null
            this.nextPage()
            this.props.navigator.dismissModal()
          }}
          back={() => this.props.navigator.pop()}
        />
        <FaBold size={20} style={[r.grayDark, r.vertical20, r.paddHoriz20]}>
          تیتر خانه :
        </FaBold>
        <View style={[r.padd20]} >
          <TextInput
            style={[r.grayDark, r.bold, r.largeText]}
            onFocus={() => this.setState({ underLine: '#0c98a6' })}
            onBlur={() => this.setState({ underLine: '#e6e6e6' })}
            underlineColorAndroid={this.state.underLine}
            placeholderTextColor={'#d7d7d7'}
            onSubmitEditing={() => this.state.title && this.nextPage()}
            value={this.state.title}
            onChangeText={value => this.setState({ title: value })}
          />
        </View>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>3/3</Fa>
        </View>

        <BTN
          active={this.state.title}
          next
          style={[r.absolute, g.hostingStepsNextBTN]}
          onPress={() => {
            this.props.addHomeStepsFunc(3)
            this.nextPage()
          }}
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
    addHome: (data, section) => dispatch(addHome(data, section)),
    addHomeStepsFunc: (data) => dispatch(addHomeStepsFunc(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostingTitle)
