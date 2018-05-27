import React, { Component } from 'react'
import {
  View,
  FlatList,
  TextInput,
  TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa } from './assets/Font'
import airConfig from './assets/air_font_config.json'
import provinces from './assets/provinces.json'
import { filterProvince } from '../actions/generalActions'


const AirIcon = createIconSetFromFontello(airConfig)

class Where extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state={
    data: []
  }

  handleSearch = (query) => {
    const cases = provinces.items
    const candidates = []
    for (const i in cases) {
      if (cases[i].name.search(query.trim()) > -1) {
        console.log(cases[i].name)
        candidates.push(cases[i])
        this.setState({ data: candidates })
      }
      if (candidates.length === 0) {
        this.setState({ data: [] })
      }
      if (query.trim() === '') {
        this.setState({ data: [] })
      }
    }
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[r.wFull, { height: 150, elevation: 2, borderRadius: 0.1 }]}>
          <View style={[r.wFull, r.rtl, { height: 75, paddingTop: 25 }]}>
            <View style={{ width: 60, height: 50 }}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', true)}
                onPress={() => this.props.navigator.dismissModal()}
              >
                <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                  <AirIcon name={'close-bold'} size={14} />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={[r.full, r.padd15]}>
            <TextInput
              style={[r.full, r.font, r.bold, r.rightPadd10, r.rightText, { fontSize: 20 }]}
              placeholder={'کجا ؟'}
              placeholderTextColor={'#bebebe'}
              returnKeyType={'search'}
              underlineColorAndroid={'transparent'}
              autoFocus
              onChangeText={(query) => this.handleSearch(query)}
            />
          </View>
        </View>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <Item
                title={item.name}
                onPress={() => {
                  this.props.filterProvince(item.name)
                  this.props.navigator.dismissModal()
                }}
              />
            )}
            keyExtractor={item => `${item.id}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            initialNumToRender={7}
            ListHeaderComponent={() => (
              <View>
                <Item
                  title={'کل کشور'}
                  onPress={() => {
                    this.props.filterProvince('all')
                    this.props.navigator.dismissModal()
                  }}
                />
                <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={[g.line, { marginVertical: 0, marginHorizontal: 15 }]} />
            )}
          />
      </View>
    )
  }
}

class Item extends Component {
  render() {
    return (
      <View>
        <TouchableNativeFeedback
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple('#00000011', false)}
          onPress={this.props.onPress}
        >
          <View
            style={[r.rtl, r.horizCenter, r.verticalPadd20, r.paddHoriz20]}
            pointerEvents={'box-only'}
          >
            <AirIcon name={'map-marker'} size={16} style={[r.grayDark]} />
            <Fa style={[r.grayDark, r.rightMargin5]} size={14}>{this.props.title}</Fa>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    filter: state.filter  
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filterProvince: data => dispatch(filterProvince(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Where)
