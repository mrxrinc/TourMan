import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBold } from '../../assets/Font'
import { addHome } from '../../../actions/generalActions'
import { BTN, NavBar } from '../HostAssets'

class HostingPrice extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    price: '',
    underLine: '#e6e6e6'
  }

  componentWillMount() {
    if (this.props.addHomeState.price) {
      const price = this.props.addHomeState.price
      this.setState({ price: `${price}` })
    }
  }

  nextPage = () => {
    const payload = {
      price: this.state.price
    }
    this.props.addHome(payload, 'price')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingCancelation'
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
          back={() => this.props.navigator.pop()}
        />
        <FaBold size={20} style={[r.grayDark, r.padd20]}>
          قیمت برای هر شب:
        </FaBold>
        <View style={[r.padd20]}>
          <Fa size={12} style={[r.grayLight, ]}>قیمت پایه که برای هر شب محاسبه خواهد شد</Fa>
          <TextInput
            style={[r.grayDark, r.bold, r.centerText, { fontSize: 30, height: 80 }]}
            onFocus={() => this.setState({ underLine: '#0c98a6' })}
            onBlur={() => this.setState({ underLine: '#e6e6e6' })}
            underlineColorAndroid={this.state.underLine}
            placeholderTextColor={'#d7d7d7'}
            keyboardType={'numeric'}
            maxLength={4}
            onSubmitEditing={() => this.state.price && this.nextPage()}
            value={this.state.price}
            onChangeText={value => this.setState({ price: value })}
          />
        </View>

        {this.state.price !== '' && !isNaN(this.state.price) && (
          <View style={[r.paddHoriz20]}>
            <FaBold size={12} style={[g.primary, r.leftText]}>
              {this.state.price.length > 3 ? (
                `${this.state.price.substr(0, 1)} میلیون و ${
                  this.state.price.substr(1, 3)} هزار تومان`
              ) : (
                  `${this.state.price} هزار تومان`
              )}
            </FaBold>
          </View>
        )}

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>3/4</Fa>
        </View>

        <BTN
          active={this.state.price !== '' && !isNaN(this.state.price)}
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

export default connect(mapStateToProps, mapDispatchToProps)(HostingPrice)
