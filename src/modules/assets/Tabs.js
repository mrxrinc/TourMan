import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import r from '../styles/Rinc'
import g from '../styles/General'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import lineConfig from './line_font_config.json'
const LineIcon = createIconSetFromFontello(lineConfig)
import AwIcon from 'react-native-vector-icons/FontAwesome'

export default class Tabs extends Component {
  constructor(props){
    super(props);
    this.state={
      profileActive: r.gray,
      messagesActive: r.gray,
      exploreActive: r.gray,
      favoritesActive: r.gray,
      tripsActive: r.gray,
    }
  }
  componentWillMount(){
    switch (this.props.active != null) {
      case this.props.active == 'profile':
        this.setState({profileActive: r.red})
        break;
      case this.props.active == 'messages':
        this.setState({messagesActive: r.red})
        break;
      case this.props.active == 'explore':
        this.setState({exploreActive: r.red})
        break;
      case this.props.active == 'favorites':
        this.setState({favoritesActive: r.red})
        break;
      case this.props.active == 'trips':
        this.setState({tripsActive: r.red})
        break;
      default:
        return null
    }
  }
  render() {
    const profile = (this.props.active != 'profile') ? this.props.profile:null
    const messages = (this.props.active != 'messages') ? this.props.messages:null
    const explore = (this.props.active != 'explore') ? this.props.explore:null
    const favorites = (this.props.active != 'favorites') ? this.props.favorites:null
    const trips = (this.props.active != 'trips') ? this.props.trips:null
    return (
      <View style={[g.tabBox, r.absolute, r.bottom]}>
        <AwIcon
          name={'circle'}
          size={55}
          style={[r.absolute, g.tabBoxCurve, r.light1]}
        />
        <View
          style={[r.full, g.tabIconContainer, r.row, r.verticalCenter, r.spaceAround]}>
          <TouchableHighlight
            style={[g.tabItem, r.bgLight1, r.center, g.tabItemsAround]}
            onPress={profile}
            underlayColor={'#ccc'} >
            <LineIcon name={'user'} size={25} style={this.state.profileActive} />
          </TouchableHighlight>

          <TouchableHighlight
            style={[g.tabItem, r.bgLight1, r.center, g.tabItemsMid]}
            onPress={messages}
            underlayColor={'#ccc'} >
            <LineIcon name={'comment'} size={25} style={this.state.messagesActive} />
          </TouchableHighlight>

          <TouchableHighlight
            style={[g.tabItemMain, r.bgLight1, r.center]}
            onPress={explore}
            underlayColor={'#ccc'} >
            <LineIcon name={'search'} size={25} style={this.state.exploreActive} />
          </TouchableHighlight>

          <TouchableHighlight
            style={[g.tabItem, r.bgLight1, r.center, g.tabItemsMid]}
            onPress={favorites}
            underlayColor={'#ccc'} >
            <LineIcon name={'heart-o'} size={25} style={this.state.favoritesActive} />
          </TouchableHighlight>

          <TouchableHighlight
            style={[g.tabItem, r.bgLight1, r.center, g.tabItemsAround]}
            onPress={trips}
            underlayColor={'#ccc'} >
            <LineIcon name={'plane'} size={25} style={this.state.tripsActive} />
          </TouchableHighlight>

        </View>
      </View>
    )
  }
}
