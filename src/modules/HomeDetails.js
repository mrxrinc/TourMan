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
import Loading from './assets/Loading'
import NavBar from './assets/NavBar'

const NAVBAR_HEIGHT = 75

class HomeDetails extends Component {
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
    return (
      <View style={[r.full, r.bgWhite]}>
        <Animated.View
          style={[g.homeItemHeader, r.zIndex1,
            { height: NAVBAR_HEIGHT, transform: [{ translateY: navbarTranslate }] }]}
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
          <View style={[r.full, r.bgWhite]}>
            <ScrollView style={[r.full, r.padd20]}>
              <View style={r.bottom50}>
                <FaBold size={25}>جزئیات</FaBold>
                <FaMulti size={12} style={[r.top20, { lineHeight: 25 }]}>
                  {this.props.home.about.details}
                </FaMulti>

                {this.props.home.about.guestAccessibility && (
                  <View>
                    <FaBold size={14} style={r.vertical30}>
                      مهمان ها به چه چیزهایی دسترسی دارند؟
                    </FaBold>
                    <FaMulti size={12} style={[{ lineHeight: 25 }]}>
                      {this.props.home.about.guestAccessibility}
                    </FaMulti>
                  </View>
                )}
                
                {this.props.home.about.neighborhood && (
                  <View>
                    <FaBold size={14} style={r.vertical30}>
                      همسایه ها:
                    </FaBold>
                    <FaMulti size={12} style={[{ lineHeight: 25 }]}>
                      {this.props.home.about.neighborhood}
                    </FaMulti>
                  </View>
                )}

                {this.props.home.about.accessToCityGoods && (
                  <View>
                    <FaBold size={14} style={r.vertical30}>
                      دسترسی به امکانات شهری:
                    </FaBold>
                    <FaMulti size={12} style={[{ lineHeight: 25 }]}>
                      {this.props.home.about.accessToCityGoods}
                    </FaMulti>
                  </View>
                )}

              </View>
            </ScrollView>
          </View>

        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps)(HomeDetails)
