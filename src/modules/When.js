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

// import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
// import * as asset from './assets/Assets'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'
import { selectDay, initializeDays, loadDays, resetDays } from '../actions/dateActions'
// import configureStore from '../store/configureStore'
//
// const store = configureStore()
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
          <a.Fa size={13} style={r.rightMargin15}>{month.name}</a.Fa>
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
            <a.Fa
              size={11}
              onPress={() => this.props.resetDays()}
            >
              پاک کردن
            </a.Fa>
          </View>
          <View style={[r.full, r.padd15]} />
        </View>

        <View style={[r.padd10, r.rtl, r.center, r.spaceBetween]}>
          <View style={[r.center, { flex: 1 }]}>
            <a.Fa size={17} style={[r.rtl]}>{
              typeof this.props.startDate === 'object' ?
                this.props.startDate.join(' / ') : this.props.startDate
            }</a.Fa>
          </View>
          <View style={[r.center, { flex: 1 }]}>
            <a.Fa size={45} style={[r.light3, { height: 60, lineHeight: 72 }]}>/</a.Fa>
          </View>
          <View style={[r.center, { flex: 1 }]}>
            <a.Fa size={17} style={[r.rtl]}>{
              typeof this.props.endDate === 'object' ?
                this.props.endDate.join(' / ') : this.props.endDate
            }</a.Fa>
          </View>
        </View>
        <View style={[r.rtl, r.center, r.spaceBetween, r.paddHoriz10, r.bottom5]}>
          <a.Fa size={15} style={g.weekHead}>ش</a.Fa>
          <a.Fa size={15} style={g.weekHead}>ی</a.Fa>
          <a.Fa size={15} style={g.weekHead}>د</a.Fa>
          <a.Fa size={15} style={g.weekHead}>س</a.Fa>
          <a.Fa size={15} style={g.weekHead}>چ</a.Fa>
          <a.Fa size={15} style={g.weekHead}>پ</a.Fa>
          <a.Fa size={15} style={g.weekHead}>ج</a.Fa>
        </View>

        <View style={[g.line, { marginVertical: 0 }]} />

        <FlatList
          data={this.props.date}
          renderItem={({ item }) => (
            <View style={[g.dateWrap, r.paddHoriz10, r.paddVertical20]}>
              <a.Fa size={13} style={r.rightMargin15}>{item.name}</a.Fa>
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

        <Footer onPress={() => this.props.loadDays()}/>
      </View>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <View style={[g.reportFooter, r.wFull, r.padd20, r.bgWhite ]}>
        <View style ={[g.bgPrimary, r.round5, r.full, { height:45 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#ffffff33', false)}
            onPress={this.props.onPress}>
            <View style={[r.full, r.center]} pointerEvents={'box-only'}>
              <a.FaBold style={[r.white]} size={18}>ذخیره</a.FaBold>
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
              {this.props.value}
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
    loading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectDay: day => dispatch(selectDay(day)),
    initializeDays: () => dispatch(initializeDays()),
    loadDays: () => dispatch(loadDays()),
    resetDays: () => dispatch(resetDays())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(When)

// // List of months
// const months = [
//   { 1: 'فروردین' },
//   { 2: 'اردیبهشت' },
//   { 3: 'خرداد' },
//   { 4: 'تیر' },
//   { 5: 'مرداد' },
//   { 6: 'شهریور' },
//   { 7: 'مهر' },
//   { 8: 'آبان' },
//   { 9: 'آذر' },
//   { 10: 'دی' },
//   { 11: 'بهمن' },
//   { 12: 'اسفند' }
// ]

// List of months
// const monthes = [
//   [1, 4, 'فروردین'],
//   [2, 0, 'اردیبهشت'],
//   [3, 3, 'خرداد'],
//   [4, 6, 'تیر'],
//   [5, 2, 'مرداد'],
//   [6, 5, 'شهریور'],
//   [7, 1, 'مهر'],
//   [8, 3, 'آبان'],
//   [9, 5, 'آذر'],
//   [10, 0, 'دی'],
//   [11, 2, 'بهمن'],
//   [12, 4, 'اسفند']
// ]

// const monthes = [
//   [1, 31, 'فروردین'],
//   [2, 31, 'اردیبهشت'],
//   [3, 31, 'خرداد'],
//   [4, 31, 'تیر'],
//   [5, 31, 'مرداد'],
//   [6, 31, 'شهریور'],
//   [7, 30, 'مهر'],
//   [8, 30, 'آبان'],
//   [9, 30, 'آذر'],
//   [10, 30, 'دی'],
//   [11, 30, 'بهمن'],
//   [12, 29, 'اسفند']
// ]
