import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import ReactNativeComponentTree from
  'react-native/Libraries/Renderer/shims/ReactNativeComponentTree'

import { connect } from 'react-redux'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold } from './assets/Font'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'
import { selectDay, initializeDays, loadDays, resetDays, resetDaysSaveOff } from '../actions/dateActions'

const AirIcon = createIconSetFromFontello(airConfig)

class When extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'transparent'
   }
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount() {
    if (this.props.date.length === 0) {
      this.props.initializeDays()
    } else {
      this.props.loadDays()
    }
  }

  dayPress(event) {
    const element = ReactNativeComponentTree.getInstanceFromNode(event.target)
    this.props.selectDay(element.memoizedProps.uniqueID)
  }

  beginEmptyBoxes(n, active) {
    const empty = []
    const bg = active ? '#11868a' : '#fff'
    for (let i = 0; i < n; i++) {
      empty.push(i)
    }
    return (
      empty.map((key) => (
        <View style={[g.dayItemBox, { backgroundColor: bg }]} key={key} />
      ))
    )
  }

  endEmptyBoxes(firstEmptyBoxes, dayCount, active) {
    const empty = []
    let allBoxes = 35 // considering the minimum amount of boxes
    if (dayCount === 31) { // calculating allBoxes to avoid extra rows
      allBoxes = firstEmptyBoxes >= 5 ? 42 : 35
    } else if (dayCount === 30) {
      allBoxes = firstEmptyBoxes === 6 ? 42 : 35
    }
    const n = allBoxes - (firstEmptyBoxes + dayCount)
    const bg = active ? '#11868a' : '#fff'
    for (let i = 0; i < n; i++) empty.push(i)
    return (
      empty.map((key) => (
        <View style={[g.dayItemBox, { backgroundColor: bg }]} key={key} />
      ))
    )
  }

  renderDate(amount = null) {
    let startPoint = 0
    let endPoint = 2
    if (amount === 'rest') {
      startPoint = 2
      endPoint = 12
    }
    const date = this.props.date.slice(startPoint, endPoint)
    return date.map((month, monthKey) => (
        <View style={[g.dateWrap, r.paddHoriz10, r.paddVertical20]} key={monthKey}>
          <Fa size={13} style={r.rightMargin15}>{month.name}</Fa>
          <View style={[r.rtl, r.wrap, r.top5]}>
            {this.beginEmptyBoxes(
              month.firstDayInWeek,
              month.activeBeginEmptyBoxes
            )}

            {month.days.map((day, dayKey) => (
              <Day
                key={dayKey}
                active={day.active}
                start={day.start}
                end={day.end}
                off={day.off}
                singleDaySelected={this.props.cacheDays.length === 1}
                value={day.value}
                uniqueID={`${monthKey}_${day.value}`}
                onPress={(event) => this.dayPress(event)}
              />
            ))}

            {this.endEmptyBoxes(
              month.firstDayInWeek,
              month.dayCount,
              month.activeEndEmptyBoxes
            )}
          </View>
        </View>
      ))
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[r.wFull, { height: 75 }]}>
          <View
            style={[r.wFull, r.rtl, r.spaceBetween, r.horizCenter, r.rightPadd15,
            { height: 75, paddingTop: 25 }]}
          >
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
            <Fa
              size={11}
              onPress={() => {
                if (Object.keys(this.props.home).length === 0) {
                  this.props.resetDays()
                } else {
                  this.props.resetDaysSaveOff()
                }
              }}
            >
              ?????? ????????
            </Fa>
          </View>
          <View style={[r.full, r.padd15]} />
        </View>

        <View style={[r.padd10, r.rtl, r.center, r.spaceBetween]}>
          <View style={[r.center, { flex: 1 }]}>
            <Fa size={17} style={[r.rtl]}>
            {typeof this.props.startDate === 'object' ?
                this.props.startDate.join(' ') : this.props.startDate
            }
            </Fa>
          </View>
          <View style={[r.center, { flex: 1 }]}>
            <Fa size={45} style={[r.light3, { height: 60, lineHeight: 72 }]}>/</Fa>
          </View>
          <View style={[r.center, { flex: 1 }]}>
            <Fa size={17} style={[r.rtl]}>
              {typeof this.props.endDate === 'object' ?
                  this.props.endDate.join(' ') : this.props.endDate
              }
            </Fa>
          </View>
        </View>
        <View style={[r.rtl, r.center, r.spaceBetween, r.paddHoriz10, r.bottom5]}>
          <Fa size={15} style={g.weekHead}>??</Fa>
          <Fa size={15} style={g.weekHead}>??</Fa>
          <Fa size={15} style={g.weekHead}>??</Fa>
          <Fa size={15} style={g.weekHead}>??</Fa>
          <Fa size={15} style={g.weekHead}>??</Fa>
          <Fa size={15} style={g.weekHead}>??</Fa>
          <Fa size={15} style={g.weekHead}>??</Fa>
        </View>

        <View style={[g.line, { marginVertical: 0 }]} />

        <FlatList
          data={this.props.date}
          renderItem={({ item }) => (
            <View style={[g.dateWrap, r.paddHoriz10, r.paddVertical20]}>
              <Fa size={13} style={r.rightMargin15}>{item.name}</Fa>
              <View style={[r.rtl, r.wrap, r.top5]}>
                {this.beginEmptyBoxes(
                  item.firstDayInWeek,
                  item.activeBeginEmptyBoxes
                )}

                {item.days.map((day, dayKey) => (
                  <Day
                    key={dayKey}
                    active={day.active}
                    start={day.start}
                    end={day.end}
                    off={day.off}
                    singleDaySelected={this.props.cacheDays.length === 1}
                    value={day.value}
                    uniqueID={`${item.id}_${day.value}`}
                    onPress={(event) => this.dayPress(event)}
                  />
                ))}

                {this.endEmptyBoxes(
                  item.firstDayInWeek,
                  item.dayCount,
                  item.activeEndEmptyBoxes
                )}
              </View>
            </View>
          )}
          keyExtractor={item => `${item.value}`}
          initialNumToRender={1}
        />

        <Footer 
          reserve={this.props.reserve}
          active={this.props.startDate !== '?????????? ????????'}
          onPress={() => {
            if (this.props.pushToSearchPage === true) {
              this.props.navigator.push({
                screen: 'mrxrinc.Search',
                animationType: 'fade'
              })
            } else if (this.props.reserve && this.props.startDate !== '?????????? ????????') {
              this.props.navigator.resetTo({
                screen: 'mrxrinc.ReservationReviewYourTrip'
              })
            } else {
              this.props.navigator.dismissModal()
            }
          }}
        />
      </View>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <View style={[g.reportFooter, r.wFull, r.padd20, r.bgWhite]}>
        <View style={[g.bgPrimary, r.round5, r.full, { height: 45, opacity: this.props.active ? 1 : 0.3 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#ffffff33', false)}
            onPress={this.props.onPress}>
            <View 
              style={[r.full, r.center]} 
              pointerEvents={'box-only'}>
              <FaBold style={[r.white]} size={18}>
                {this.props.reserve ? (
                  '???????? ????????'
                ) : (
                  '??????????'
                )}
              </FaBold>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

class Day extends Component {
  render() {
    const bg = this.props.active ? '#11868a' : '#fff'
    const color = this.props.active ? '#fff' : '#515860'
    const bold = this.props.active ?
      'IRANSansMobile_Bold' : 'IRANSansMobile'
    const start = this.props.start ? g.dayStart : null
    const end = this.props.end ? g.dayEnd : null
    const singleDaySelected = this.props.singleDaySelected ?
      g.singleDaySelected : null
    const off = this.props.off ? g.offDay : null
    return (
      <View
        style={[g.dayItemBox, start, end, singleDaySelected,
          { backgroundColor: bg }]}
      >
        <TouchableWithoutFeedback
          onPress={this.props.onPress}
        >
          <View style={r.full}>
            <Text
              style={[g.dayItem, off, { color, fontFamily: bold }]}
              uniqueID={this.props.uniqueID}
              active={this.props.active}
              start={this.props.start}
              end={this.props.end}
              off={this.props.off}
            >
              {` ${this.props.value} `}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}


function mapStateToProps(state) {
  return {
    date: state.date.days,
    cacheDays: state.date.cacheDays,
    startDate: state.date.startDate,
    endDate: state.date.endDate,
    user: state.user,
    home: state.home,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectDay: day => dispatch(selectDay(day)),
    initializeDays: () => dispatch(initializeDays()),
    loadDays: () => dispatch(loadDays()),
    resetDays: () => dispatch(resetDays()),
    resetDaysSaveOff: () => dispatch(resetDaysSaveOff())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(When)

// // List of months
// const months = [
//   { 1: '??????????????' },
//   { 2: '????????????????' },
//   { 3: '??????????' },
//   { 4: '??????' },
//   { 5: '??????????' },
//   { 6: '????????????' },
//   { 7: '??????' },
//   { 8: '????????' },
//   { 9: '??????' },
//   { 10: '????' },
//   { 11: '????????' },
//   { 12: '??????????' }
// ]

// List of months
// const monthes = [
//   [1, 4, '??????????????'],
//   [2, 0, '????????????????'],
//   [3, 3, '??????????'],
//   [4, 6, '??????'],
//   [5, 2, '??????????'],
//   [6, 5, '????????????'],
//   [7, 1, '??????'],
//   [8, 3, '????????'],
//   [9, 5, '??????'],
//   [10, 0, '????'],
//   [11, 2, '????????'],
//   [12, 4, '??????????']
// ]

// const monthes = [
//   [1, 31, '??????????????'],
//   [2, 31, '????????????????'],
//   [3, 31, '??????????'],
//   [4, 31, '??????'],
//   [5, 31, '??????????'],
//   [6, 31, '????????????'],
//   [7, 30, '??????'],
//   [8, 30, '????????'],
//   [9, 30, '??????'],
//   [10, 30, '????'],
//   [11, 30, '????????'],
//   [12, 29, '??????????']
// ]
