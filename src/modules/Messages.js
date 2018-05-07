import React, { Component } from 'react'
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { MessageItem } from './assets/Assets'
import { Fa, FaBold, FaMulti } from './assets/Font'
import airConfig from './assets/air_font_config.json'
import Tabs from './assets/Tabs'

const AirIcon = createIconSetFromFontello(airConfig)

export default class Messages extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
    // data: [
    //   {
    //     id: 1,
    //     title: 'درخواست اجاره آپارتمان',
    //     description: 'سلام. لطفا شرایط آپارتمان رو برای اجاره کردن 10 روزه بفرمایین.',
    //     date: '1397/4/15',
    //     archive: true,
    //   },
    //   {
    //     id: 2,
    //     title: 'اجاره ویلای چالوس',
    //     description: 'سلام. لطفا شرایط آپارتمان رو برای اجاره کردن 10 روزه بفرمایین.',
    //     date: '1397/4/15',
    //     archive: false,
    //   },
    // ]
    data: null
  }
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        {this.props.page === 'archive' ? (
          <View style={r.full}>
            <View style={[r.rtl, r.topPadd15, { height: 75 }]}>
              <View style={g.regClose}>
                <TouchableNativeFeedback
                  delayPressIn={0}
                  background={TouchableNativeFeedback.Ripple('#00000022')}
                  onPress={() => this.props.navigator.pop()}>
                  <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                    <AirIcon name={'left-arrow-bold'} size={18}
                      style={[r.grayDark, r.flipX, r.centerText, { width: 25 }]}
                    />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            <View style={r.paddHoriz10}>
              <FaBold size={22} style={[r.rightMargin20, r.grayDark, r.bottom20]}>
                آرشیو
              </FaBold>
              {this.state.data === null && (
                <Fa size={11} style={[r.grayLight, r.rightMargin20]}>
                  شما هنوز هیچ پیامی را آرشیو نکرده اید.
                </Fa>
              )}

              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <MessageItem
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    archive={item.archive}
                    archivePress={() => console.log(item.id)}
                  />
                )}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                initialNumToRender={7}
                ListFooterComponent={() => <View style={{ marginTop: 190 }} />}
              />
            </View>
          </View>
        ) : (
          <View style={[r.full]}>
            <View style={[r.topPadd15, { height: 75 }]}>
              <View style={g.regClose}>
                <TouchableNativeFeedback
                  delayPressIn={0}
                  background={TouchableNativeFeedback.Ripple('#00000022')}
                  onPress={() => {
                    this.props.navigator.push({
                      screen: 'mrxrinc.Messages',
                      passProps: {
                        page: 'archive'
                      },
                      animationType: 'fade'
                    })
                  }}>
                  <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                    <AirIcon name={'archive'} size={25} style={[r.grayDark]} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
            {this.state.data !== null ? (
              <View style={[r.paddHoriz10]}>
                <FaBold
                  size={22}
                  style={[r.rightMargin20, r.grayDark, r.bottom20]}
                >
                  پیامهای من
                </FaBold>

                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) => (
                    <MessageItem
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      date={item.date}
                      archive={item.archive}
                      archivePress={() => console.log(item.id)}
                    />
                  )}
                  keyExtractor={item => `${item.id}`}
                  showsVerticalScrollIndicator={false}
                  initialNumToRender={7}
                  ListFooterComponent={() => <View style={{ marginTop: 190 }} />}
                />
              </View>
            ) : (
              <View style={[r.full, r.bgBlack]}>
                <Image
                  style={[g.messagingImage, r.absolute, r.top]}
                  source={require('./imgs/receptionWoman.jpg')}
                  resizeMode={'cover'}
                />
                <FaBold
                  size={23}
                  style={[r.rightMargin20, r.white, r.top10, r.bottom20]}
                >
                  پیامهای من
                </FaBold>
                <View style={[r.horizCenter, r.padd20, g.messagingWhiteBox]}>
                  <FaBold size={13}>فعلا هیچ پیامی ندارید!</FaBold>
                  <FaMulti size={11} style={[r.grayLight, r.top10, r.centerText]}>
                    وقتی خانه مناسبی پیدا می کنید، با میزبان خانه در ارتباط باشید و بهشون از خودتون و هدف از سفرتون بگید.
                  </FaMulti>
                  <TouchableOpacity
                    style={[g.messagingBTN, g.bgAccent, r.center, r.top20]}
                    activeOpacity={0.5}
                    onPress={() => {
                      this.props.navigator.push({
                        screen: 'mrxrinc.Explore',
                        animationType: 'fade'
                      })
                    }}
                  >
                    <FaBold size={15} style={[r.white]}>
                      شروع جستجو
                    </FaBold>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
          <Tabs
            active={'messages'}
            profile={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Profile',
                animationType: 'fade'
              })
            }}
            messages={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Messages',
                animationType: 'fade'
              })
            }}
            explore={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Explore',
                animationType: 'fade'
              })
            }}
            favorites={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Favorites',
                animationType: 'fade'
              })
            }}
            trips={() => {
              this.props.navigator.push({
                screen: 'mrxrinc.Trips',
                animationType: 'fade'
              })
            }}
          />
          </View>
    )
  }
}
