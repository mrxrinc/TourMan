import React, { Component } from 'react'
import {
  Text,
} from 'react-native'
import r from '../styles/Rinc'

export class Fa extends Component {
  render() {
    return (
      <Text
        style={[r.font, r.grayDark, { fontSize: this.props.size }, this.props.style]}
        onPress={this.props.onPress}
        numberOfLines={1}
        ref={this.props.refID}
      >
        {this.props.children}
      </Text>
    )
  }
}

export class FaMulti extends Component {
  render() {
    return (
      <Text
        style={[r.font, r.grayDark, this.props.style,
          { fontSize: this.props.size, lineHeight: 30 }]}
        onPress={this.props.onPress}
        numberOfLines={this.props.numberOfLines}
      >
        {this.props.children}
      </Text>
    )
  }
}

export class FaBold extends Component{
  render() {
    return (
      <Text style={[r.bold, r.grayDark, { fontSize: this.props.size }, this.props.style]}
        numberOfLines={1}
        onPress={this.props.onPress}>
        {this.props.children}
      </Text>
    )
  }
}

export class FaBoldMulti extends Component{
  render(){
    return(
      <Text style={[r.bold, r.grayDark, { fontSize: this.props.size }, this.props.style]}
        numberOfLines={this.props.numberOfLines}
        onPress={this.props.onPress}>
        {this.props.children}
      </Text>
    )
  }
}

export class En extends Component{
  render(){
    return(
      <Text style={[r.en, r.grayDark, this.props.style, { fontSize: this.props.size }]}
        onPress={this.props.onPress}>
        {this.props.children}
      </Text>
    )
  }
}

export class EnBold extends Component{
  render() {
    return (
      <Text style={[r.enBold, r.grayDark, this.props.style, { fontSize: this.props.size }]}
        onPress={this.props.onPress}>
        {this.props.children}
      </Text>
    )
  }
}
