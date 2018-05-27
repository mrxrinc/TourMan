import React, { Component } from 'react'
import { View } from 'react-native'
import r from '../styles/Rinc'
import { FaBold } from './Font'
import Loading from './Loading'

export default class Notification extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  render() {
    const bg = this.props.alarm ? '#fc0c48' : '#fff'
    const textColor = this.props.alarm ? '#fff' : '#697989'
    return (
      <View 
        style={[r.notification, r.verticalCenter, r.paddHoriz20, { backgroundColor: bg }]}
      >
        {this.props.message && (
          <FaBold style={{ color: textColor }}>{this.props.message}</FaBold>
        )}
        {this.props.loading && (
          <View style={[r.full, r.center]}>
            <Loading />
          </View>
        )}
      </View>
    )
  }
}
