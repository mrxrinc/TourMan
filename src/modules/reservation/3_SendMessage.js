import React, { Component } from 'react'
import {
  View,
  TextInput,
  Image,
  ScrollView,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import r from '../styles/Rinc'
import g from '../styles/General'
import { Fa, FaBold, FaMulti } from '../assets/Font'
import { reserveFunc } from '../../actions/generalActions'
import { NavBar, ReserveFooter } from './ReservationAssets'

class ReservationSendMessage extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = { 
    message: null,
    padder: false
   }
  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({ padder: false })
    })
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({ padder: true })
    })
  }
  componentWillUnmount() {
    this.keyboardDidHideListener.remove()
    this.keyboardDidShowListener.remove()
  }

  handleMessage = () => {
    const payload = {
      message: this.state.message
    }
    this.props.reserveFunc(payload, 'message')
    this.props.navigator.push({
      screen: 'mrxrinc.ReservationReviewAndPay'
    })
  }
  
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar 
          steps={[3, 4]}
          back={() => this.props.navigator.pop()}
        />
        <ScrollView contentContainerStyle={[r.padd20]} >
          <FaBold size={20} style={[r.grayDark, r.bottom10]}>
            {`به میزبانتان ${this.props.home.host.fullName} پیام بفرستید:`}
          </FaBold>
          <Fa size={12} style={r.grayLight}>پیام شما بعد از رزرو خانه ارسال خواهد شد.</Fa>
          
          <View style={[r.rtl, r.vertical20, { alignItems: 'flex-end' }]}>
            <View style={[r.center, { flex: 1, width: 100 }]}>
              <Image
                source={{ uri: this.props.home.host.avatar }}
                style={[r.round20, { width: 40, height: 40 }]}
              />
            </View>
            <View style={[r.bgLight2, r.round5, r.padd10, g.reserveMBox, { flex: 4 }]}>
              <FaMulti size={12} style={[r.grayMid, r.rightText]}>
                سلام 
                {'\n'}
                خوشحالم خونه ی من رو انتخاب کردید :) 
                {'\n'}
                هر سوالی راجع به خونه داشتین برام بنویسین تا در اولین فرصت جواب بدم.
                ممنون.
              </FaMulti>
            </View>
          </View>

          <View style={g.line} />
          <TextInput
            style={[r.top20, r.rightText, r.grayDark, r.padd20, r.font,
            { maxHeight: 150 }]}
            multiline
            underlineColorAndroid={'#0c98a6'}
            placeholder={'با میزبان خود کمی راجع به خود و سفرتان حرف بزنید...'}
            placeholderTextColor={'#d7d7d7'}
            onChangeText={message => this.setState({ message })}
          />
        </ScrollView>
        <View style={{ height: this.state.padder ? 300 : 0 }} />
        <ReserveFooter 
          agree
          price={this.props.home.price}
          totalNights={this.props.reserve.totalNights}
          style={[r.absolute, r.bottom]}
          onPress={() => this.handleMessage()}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    reserve: state.reserve
  }
}

function mapDispatchToProps(dispatch) {
  return {
    reserveFunc: (data, section) => dispatch(reserveFunc(data, section))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationSendMessage)
