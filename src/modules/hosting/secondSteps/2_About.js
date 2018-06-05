import React, { Component } from 'react'
import {
  View,
  TextInput,
  ScrollView,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBold } from '../../assets/Font'
import { addHome } from '../../../actions/generalActions'
import { BTN, NavBar } from '../HostAssets'

class HostingAbout extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    details: null,
    guestAccessibility: null,
    neighborhood: null,
    accessToCityGoods: null,
    underLine01: '#e6e6e6',
    underLine02: '#e6e6e6',
    underLine03: '#e6e6e6',
    underLine04: '#e6e6e6',
    bottomPadder: 0
  }

  componentWillMount() {
    if (this.props.addHomeState.about) {
      const { 
        details, 
        guestAccessibility, 
        neighborhood, 
        accessToCityGoods 
      } = this.props.addHomeState.about
      this.setState({ 
        details, 
        guestAccessibility, 
        neighborhood, 
        accessToCityGoods 
      })
    }
  }

  componentDidMount() {
    Keyboard.addListener('keyboardWillHide', () => {
      this.setState({
        bottomPadder: 0,
        underLine01: '#e6e6e6',
        underLine02: '#e6e6e6',
        underLine03: '#e6e6e6',
        underLine04: '#e6e6e6'
      })
    })
  }

  handlePadder = (index) => {
    switch (index) {
      case 2:
        this.setState({ 
          bottomPadder: 250,
          underLine02: '#0c98a6' 
        })
        break
      case 3:
        this.setState({
          bottomPadder: 250,
          underLine03: '#0c98a6'
        })
        break
      case 4:
        this.setState({
          bottomPadder: 250,
          underLine04: '#0c98a6'
        })
        break
      default:
        this.setState({
          bottomPadder: 0,
          underLine01: '#e6e6e6',
          underLine02: '#e6e6e6',
          underLine03: '#e6e6e6',
          underLine04: '#e6e6e6'
        })
    }
  }

  nextPage = () => {
    const payload = {
      details: this.state.details.trim(),
      guestAccessibility: this.state.guestAccessibility ? this.state.detaiguestAccessibilityls.trim() : null,
      neighborhood: this.state.neighborhood ? this.state.neighborhood.trim() : null,
      accessToCityGoods: this.state.accessToCityGoods ? this.state.accessToCityGoods.trim() : null
    }
    this.props.addHome(payload, 'about')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingTitle'
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
        <FaBold size={20} style={[r.grayDark, r.vertical10, r.paddHoriz20]}>
          توضیحاتی درباره خانه تان بنویسید
        </FaBold>
        <ScrollView 
          style={[r.padd20, { marginBottom: this.state.bottomPadder }]}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
        >
          <View style={r.bottom50}>
            <Fa size={12} style={[r.grayLight, r.bottom5]}>جزئیات خانه:</Fa>
            <TextInput
              style={[r.grayDark, r.bgLight1, g.hostingAboutInputs]}
              onFocus={() => this.setState({ underLine01: '#0c98a6' })}
              onBlur={() => this.setState({ underLine01: '#e6e6e6' })}
              underlineColorAndroid={this.state.underLine01}
              placeholderTextColor={'#d7d7d7'}
              multiline
              value={this.state.details}
              onChangeText={value => { this.setState({ details: value }); console.log(value) }}
            />
          </View>
          <View style={r.bottom50}>
            <Fa size={12} style={[r.grayLight, r.bottom5]}>دسترسی مهمان ها به قسمت های مختلف :</Fa>
            <TextInput
              style={[r.grayDark, r.bgLight1, g.hostingAboutInputs]}
              onFocus={() => this.handlePadder(2)}
              onBlur={() => this.handlePadder()}
              underlineColorAndroid={this.state.underLine02}
              placeholderTextColor={'#d7d7d7'}
              multiline
              value={this.state.guestAccessibility}
              onChangeText={value => { this.setState({ guestAccessibility: value }); console.log(value) }}
            />
          </View>
          <View style={r.bottom50}>
            <Fa size={12} style={[r.grayLight, r.bottom5]}>توضیح راجع به همسایه ها:</Fa>
            <TextInput
              style={[r.grayDark, r.bgLight1, g.hostingAboutInputs]}
              onFocus={() => this.handlePadder(3)}
              onBlur={() => this.handlePadder()}
              underlineColorAndroid={this.state.underLine03}
              placeholderTextColor={'#d7d7d7'}
              multiline
              value={this.state.neighborhood}
              onChangeText={value => { this.setState({ neighborhood: value }); console.log(value) }}
            />
          </View>
          <View style={r.bottom50}>
            <Fa size={12} style={[r.grayLight, r.bottom5]}>دسترسی به امکانات شهری:</Fa>
            <TextInput
              style={[r.grayDark, r.bgLight1, g.hostingAboutInputs]}
              onFocus={() => this.handlePadder(4)}
              onBlur={() => this.handlePadder()}
              underlineColorAndroid={this.state.underLine03}
              placeholderTextColor={'#d7d7d7'}
              multiline
              value={this.state.accessToCityGoods}
              onChangeText={value => { this.setState({ accessToCityGoods: value }); console.log(value) }}
            />
          </View>
          <View style={{ height: 70 }} />

        </ScrollView>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>2/3</Fa>
        </View>

        <BTN
          active={this.state.details}
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

export default connect(mapStateToProps, mapDispatchToProps)(HostingAbout)
