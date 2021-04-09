import { Navigation } from 'react-native-navigation'
import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity ,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import { HeartFull, HeartEmpty }from './assets/Heart'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './assets/air_font_config.json'
const AirIcon = createIconSetFromFontello(airConfig)
import lineConfig from './assets/line_font_config.json'
const LineIcon = createIconSetFromFontello(lineConfig)
import InvertibleScrollView from 'react-native-invertible-scroll-view'
import * as Animatable from 'react-native-animatable'
import {createAnimatableComponent} from 'react-native-animatable'
const AnimatableLineIcon = createAnimatableComponent(LineIcon);

export default class ExperienceItem extends Component {
  static navigatorStyle = {
    navBarHidden: true
  };
  constructor(props){
    super(props)
    this.state={
      exItemHeart_01: false,
      debug: 'debug'
    }
  }
  render() {
    return (
      <ScrollView
        style={[r.full, r.bgWhite,]}
        showsVerticalScrollIndicator={false}>


        <View>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <a.FaBold size={15} style={[r.grayDark]}>
              غذا و نوشیدنی
            </a.FaBold>
            <a.Fa size={13} style={[r.grayLight]}>
              همه
            </a.Fa>
          </View>
          <InvertibleScrollView
            contentContainerStyle={[r.leftPadd15, r.top10]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          inverted >
            <View style={[g.exItem]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={()=> console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/exTest01.jpg')}
                    style={[g.exItemImg, g.round]}
                    resizeMode={'cover'} />
                  <View style={r.topPadd5}>
                    <a.FaMulti numberOfLines={2} style={r.grayDark}>
                      بالن سواری در ارتفاعات البرز و کوه دماوند
                    </a.FaMulti>
                    <View style={[r.rtl, r.spaceBetween, r.rightPadd5]}>
                      <View style={[r.row]}>
                        <a.FaBold size={19} style={[g.exItemPrice]}>555</a.FaBold>
                        <LineIcon name={'money'} size={20} style={r.gray}/>
                      </View>
                      <View style={[r.rtl, r.top5]}>
                        <Text>
                          <LineIcon name={'star'} style={g.primary} size={11} />
                          <LineIcon name={'star'} style={g.primary} size={11} />
                          <LineIcon name={'star'} style={g.primary} size={11} />
                          <LineIcon name={'star'} style={g.primary} size={11} />
                          <LineIcon name={'star'} style={g.primary} size={11} />
                        </Text>
                        <a.Fa style={[r.gray, r.rightMargin5]} size={9}>653 نظر</a.Fa>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
              <TouchableOpacity
                activeOpacity={0.5}
                style={[r.absolute, r.left, r.margin5, r.center, g.heartWrapper]}
                onPress={()=>{
                  this.state.exItemHeart_01 == true ?
                    this.setState({exItemHeart_01: false}) :
                    this.setState({exItemHeart_01: true})
                }}
              >
                {this.state.exItemHeart_01 == true ? <HeartFull/> : <HeartEmpty/>}
              </TouchableOpacity>
            </View>
          </InvertibleScrollView>
        </View>

        <Text>{this.state.debug}</Text>
        <View style={{height:150}}></View>
      </ScrollView>

    )
  }
}
