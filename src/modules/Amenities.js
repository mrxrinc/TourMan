import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Animated
} from 'react-native'
import { connect } from 'react-redux'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold, FaMulti } from './assets/Font'
import NavBar from './assets/NavBar'

const NAVBAR_HEIGHT = 75

class Amenities extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
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
    }
  }

  onScroll(event) {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }]
    )(event)
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
    const empty = () => {
      if (
        this.props.home.amenities.wifi === false &&
        this.props.home.amenities.heat === false &&
        this.props.home.amenities.washingMachine === false &&
        this.props.home.amenities.iron === false &&
        this.props.home.amenities.laptopFriendly === false &&
        this.props.home.amenities.accessories === false &&
        this.props.home.amenities.fireplace === false &&
        this.props.home.amenities.cooler === false &&
        this.props.home.amenities.tv === false &&
        this.props.home.amenities.parkingLot === false &&
        this.props.home.amenities.kitchen === false &&
        this.props.home.amenities.hairDryer === false &&
        this.props.home.amenities.firstAids === false &&
        this.props.home.amenities.smokeDetecto === false 
      ) {
        return true
      }
    }
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
            <FaBold size={25}>امکانات</FaBold>

            {this.props.home.amenities.wifi && (
              <View>
                <View style={[r.vertical10, r.top30]}>
                  <Fa size={15}>وای فای</Fa>
                  <FaMulti size={12} style={[r.top5, r.grayMid]}>
                    دسترسی مستمر به اینترنت
                  </FaMulti>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.heat && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>گرمایش</Fa>
                  <FaMulti size={12} style={[r.top5, r.grayMid]}>
                    مجهز به سیستم گرمایش مرکزی یا مستقل
                  </FaMulti>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.washingMachine && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>شستشو</Fa>
                  <FaMulti size={12} style={[r.top5, r.grayMid]}>
                    ماشین لباسشویی در داخل ساختمان
                  </FaMulti>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.iron && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>اتو</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.laptopFriendly && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>مناسب برای کار با لپ تاپ</Fa>
                  <FaMulti size={12} style={[r.top5, r.grayMid]}>
                    یک میز با فضای کافی برای لپ تاپ به همراه یک صندلی که مناسب کار هستند
                  </FaMulti>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.accessories && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>لوازم ضروری</Fa>
                  <FaMulti size={12} style={[r.top5, r.grayMid]}>
                    حوله، ملافه، صابون، دستمال توالت و ...
                  </FaMulti>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.fireplace && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>شومینه</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.cooler && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>کولر</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.tv && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>تلویزیون</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.parkingLot && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>محل پارک مناسب</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.kitchen && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>آشپزخانه</Fa>
                  <FaMulti size={12} style={[r.top5, r.grayMid]}>
                    مناسب برای پخت غذای دلخواه مهمانان
                  </FaMulti>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.hairDryer && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>سشوار</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.firstAids && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>جعبه کمکهای اولیه</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}

            {this.props.home.amenities.smokeDetector && (
              <View>
                <View style={r.vertical10}>
                  <Fa size={15}>سنسور دود</Fa>
                </View>
                <View style={g.line} />
              </View>
            )}
          </View>

        </ScrollView>
        
        {empty && (
          <View style={[r.full, r.center]}>
            <FaBold size={17} style={[r.light4]}>هیچ امکاناتی برای این خانه مشخص نشده است !</FaBold>
          </View>
        )}

      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps)(Amenities)
