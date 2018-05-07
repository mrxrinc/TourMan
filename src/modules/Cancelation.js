import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Animated
} from 'react-native'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'

const NAVBAR_HEIGHT = 75

export default class Cancelation extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props) {
    super(props)
    const scrollAnim = new Animated.Value(0)
    const offsetAnim = new Animated.Value(0)
    this.state = {
      scrollY: new Animated.Value(0),
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim
        ),
        0,
        NAVBAR_HEIGHT,
      ),
      rule: 'flexible',
      currentRule: null
    }
  }
  componentWillMount() {
    this.defRule()
  }

  onScroll(event) {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
    )(event)
  }

  defRule() {
    for (let i = 0; i < rules.length; i++) {
      if (this.state.rule === rules[i].key) {
        this.setState({ currentRule: rules[i] })
      }
    }
  }

  render() {
    const DimWhiteNavBar = this.state.scrollY.interpolate({
      inputRange: [0, 0],
      outputRange: [1, 1],
    })
    const { clampedScroll } = this.state
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT)],
      extrapolate: 'clamp',
    })
    return (
      <View style={[r.full, r.bgWhite]}>
        <Animated.View
          style={[g.homeItemHeader, r.zIndex1,
            { height: NAVBAR_HEIGHT, transform: [{ translateY: navbarTranslate }] }
          ]}
        >
          <NavBar
            animate={DimWhiteNavBar}
            back={() => this.props.navigator.pop()}
          />
        </Animated.View>
        <ScrollView
          contentContainerStyle={{ marginTop: NAVBAR_HEIGHT, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={this.onScroll.bind(this)}
        >
          <View style={[r.bottom50, r.padd20]}>
            <a.FaBold size={25}>شرایط لغو رزرو</a.FaBold>
            {this.state.currentRule && (
              <View>
                <a.Fa size={10} style={[r.grayMid, r.top10]}>
                  {this.state.currentRule.title}
                </a.Fa>
                <a.FaMulti size={14} style={[r.top30]}>
                  {this.state.currentRule.rules.r01}
                </a.FaMulti>
                <a.FaMulti size={14} style={[r.top20]}>
                  {this.state.currentRule.rules.r02}
                </a.FaMulti>
                <a.FaMulti size={14} style={[r.top20]}>
                  {this.state.currentRule.rules.r03}
                </a.FaMulti>
              </View>
            )}

            <a.FaMulti size={14} style={[r.top20]}>
              هزینه تمیزکاری محیط همیشه قابل باز پس دهی می باشد.
            </a.FaMulti>
            <a.FaMulti size={14} style={[r.top20]}>
              در صورت بروز هرگونه اختلاف ، طرفین ملزم به اطلاع رسانی حداکثر 24 ساعت پس از تاریخ رزرو به تورمن هستند.
            </a.FaMulti>
            <a.FaMulti size={14} style={[r.top20]}>
              تورمن مجری حل اختلاف خواهد بود و طرفین ملزم به پیروی هستند.
            </a.FaMulti>
            <a.FaMulti size={14} style={[r.top20]}>
              یک رزرو در صورتی کاملا لغو می شود که مهمان مراحل کنسل رزرو را از صفحه سفرهای من ->تغییر یا لغو طی نماید.
            </a.FaMulti>
          </View>

        </ScrollView>
      </View>
    )
  }
}


const rules = [
  {
    id: 1,
    key: 'strict',
    title: 'سختگیرانه',
    rules: {
      r01: 'اگر مهمان تا یک هفته مانده به موعد در خواست لغو کند، 50% مبلغ کل پرداخت می شود در غیر این صورت هیچ مبلغی پس داده نخواهد شد. برای مثال اگر برای روز جمعه رزرو کرده باشید تا روز جمعه هفته قبل می توانید درخواست لغو بدید و 50% مبلغ خود را دریافت کنید.',
      r02: 'اگر مهمان تا یک هفته مانده به موعد در خواست لغو کند، هیچ مبلغی پس داده نخواهد شد.',
      r03: 'اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، هیچ مبلغی پس داده نخواهد شد.'
    }
  },
  {
    id: 2,
    key: 'moderate',
    title: 'در حد متوسط',
    rules: {
      r01: 'برای دریافت کل مبلغ پرداختی، باید حداقل پنج روز قبل از موعد مقرر درخواست لغو کنید . برای مثال اگر برای روز جمعه رزرو کرده باشید تا روز یکشنبه می توانید درخواست لغو بدید و کل مبلغ خود را دریافت کنید.',
      r02: 'اگر مهمان در کمتر از پنج روز درخواست لغو کند، مبلغ شب اول پرداخت نشده و 50% مبلغ باقی شبها پرداخت می شود.',
      r03: 'اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، 50% مبلغ شب هایی که نخواهد ماند پس داده می شود.'
    }
  },
  {
    id: 3,
    key: 'flexible',
    title: 'انعطاف پذیر',
    rules: {
      r01: 'برای دریافت کل مبلغ پرداختی، باید حداقل یک روز قبل از موعد مقرر درخواست لغو کنید . برای مثال اگر برای روز جمعه رزرو کرده باشید تا روز پنج شنبه می توانید درخواست لغو بدید و کل مبلغ خود را دریافت کنید.',
      r02: 'اگر مهمان در کمتر از 24 ساعت به موعد رزرو درخواست لغو کند، مبلغ روز اول پس داده نخواهد شد.',
      r03: 'اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، مبلغ شب هایی که نخواهد ماند پس داده می شود.'
    }
  }
]
