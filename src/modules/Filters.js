import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import * as asset from './assets/Assets'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'
import lineConfig from './assets/line_font_config.json'


const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)

export default class Filters extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'transparent'
  }
  constructor(props) {
    super(props)
    this.state = {
      bedCount: 1,
      instanseReserve: false,
      checkbox: false,
      priceRange: [10, 1000]
    }
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View
          style={[r.wFull, r.bgWhite,
          { height: 75, borderBottomWidth: 1, borderColor: '#e7e7e7' }]}
        >
          <View style={[r.wFull, r.rtl, r.spaceBetween, { height: 75, paddingTop: 25 }]}>
            <View style={{ width: 60, height: 50 }}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', true)}
                onPress={() => this.props.navigator.dismissModal()}>
                <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                  <AirIcon name={'close-bold'} size={14} />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={{ width: 90, height: 50 }}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', true)}
                onPress={() => this.props.navigator.dismissModal()}>
                <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                  <a.Fa size={12}>حذف همه</a.Fa>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={[r.full, r.padd15]} />
        </View>
        <ScrollView style={r.paddHoriz20}>
          <View style={[r.rtl, r.horizCenter, r.spaceBetween]}>
            <View style={[r.rightMargin5, { flex: 2 }]}>
              <a.Fa size={15}>رزرو آنی</a.Fa>
              <a.Fa style={r.grayLight} size={10}>
                رزروهای بدون نیاز به تایید میزبان
              </a.Fa>
            </View>
            <View style={[r.center, { flex: 1, height: 75 }]}>
              <asset.Switch
                onPress={() => {
                  this.setState({ instanseReserve: !this.state.instanseReserve })
                }}
                state={this.state.instanseReserve}
              />
            </View>
          </View>

          <View style={g.line} />

          <View style={r.top20}>
            <View style={[r.rtl, r.horizCenter, r.spaceBetween]}>
              <a.Fa size={15}>محدوده قیمت</a.Fa>
              <View style={[r.rtl, r.center]}>
                <a.Fa style={[r.grayLight, { height: 25 }]} size={17}>
                  <Text>{this.state.priceRange[0]}</Text>
                  <Text> - </Text>
                  <Text>{this.state.priceRange[1]}</Text>
                </a.Fa>
                <LineIcon name={'money'} size={20} style={[r.grayLight, r.rightMargin5]} />
              </View>

            </View>
            <View style={[r.top20, r.horizCenter]}>
              <MultiSlider
                values={[this.state.priceRange[0], this.state.priceRange[1]]}
                onValuesChange={(values) => this.setState({ priceRange: values })}
                min={10}
                max={1000}
                step={10}
                customMarker={asset.CustomMarker}
                trackStyle={{ height: 5, backgroundColor: '#ebebeb', marginTop: -2 }}
                selectedStyle={{ backgroundColor: '#039fa4' }}
              />
            </View>
          </View>

          <View style={g.line} />

          <View style={r.top20}>
            <a.Fa size={15}>نوع رزرو</a.Fa>
            <View style={[r.rtl, r.top20, r.horizCenter, r.spaceBetween]}>
              <View>
                <a.Fa style={[r.grayMid]} size={13}>کل ملک</a.Fa>
                <a.Fa style={[r.grayMid]} size={10}>
                  کل خانه در اختیار شما باشد.
                </a.Fa>
              </View>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top20, r.horizCenter, r.spaceBetween]}>
              <View>
                <a.Fa style={[r.grayMid]} size={13}>اتاق اختصاصی</a.Fa>
                <a.Fa style={[r.grayMid]} size={10}>
                  اتاقتان اختصاصی باشه با چند سرویس اشتراکی.
                </a.Fa>
              </View>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>

            <View style={[r.rtl, r.top20, r.horizCenter, r.spaceBetween]}>
              <View>
                <a.Fa style={[r.grayMid]} size={13}>اتاق اشتراکی</a.Fa>
                <a.Fa style={[r.grayMid]} size={10}>
                  اتاقهای مشترک با مهمان های دیگر.
                </a.Fa>
              </View>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
          </View>

          <View style={[g.line, r.top20]} />

          <View style={r.top20}>
            <a.Fa size={15}>تعداد تخت و سرویس</a.Fa>
            <asset.IncDec
              title={'اتاق خواب'}
              titleStyle={[r.grayMid, { fontSize: 12 }]}
              height={50}
              count={this.state.bedCount}
              incPress={() => {
                if (this.state.bedCount < 16) {
                  this.setState({ bedCount: this.state.bedCount + 1 })
                }
              }}
              decPress={() => {
                if (this.state.bedCount > 0) {
                  this.setState({ bedCount: this.state.bedCount - 1 })
                }
              }}
            />
            <asset.IncDec
              title={'تخت خواب'}
              titleStyle={[r.grayMid, { fontSize: 12 }]}
              height={50}
              count={this.state.bedCount}
              incPress={() => {
                if (this.state.bedCount < 16) {
                  this.setState({ bedCount: this.state.bedCount + 1 })
                }
              }}
              decPress={() => {
                if (this.state.bedCount > 0) {
                  this.setState({ bedCount: this.state.bedCount - 1 })
                }
              }}
            />
            <asset.IncDec
              title={'سرویس بهداشتی'}
              titleStyle={[r.grayMid, { fontSize: 12 }]}
              height={50}
              count={this.state.bedCount}
              incPress={() => {
                if (this.state.bedCount < 16) {
                  this.setState({ bedCount: this.state.bedCount + 1 })
                }
              }}
              decPress={() => {
                if (this.state.bedCount > 0) {
                  this.setState({ bedCount: this.state.bedCount - 1 })
                }
              }}
            />
          </View>

          <View style={[g.line]} />

          <View style={r.top20}>
            <a.Fa size={15}>امکانات</a.Fa>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>وای فای</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>تلویزیون</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>لوازم ضروری استحمام</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>آشپزخانه</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>ماشین لباسشویی</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>کولر</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>پارکینگ</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
          </View>

          <View style={[g.line, r.top20]} />

          <View style={[r.top20, r.bottom10]}>
            <a.Fa size={15}>قوانین خانه</a.Fa>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>مناسب برای مراسمات</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>آوردن حیوان خانگی مجاز باشد</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <a.Fa style={[r.grayMid]} size={13}>سیگار کشیدن مجاز باشد</a.Fa>
              <asset.Checkbox
                active={this.state.checkbox}
                onPress={() => this.setState({ checkbox: !this.state.checkbox })}
              />
            </View>
          </View>

        </ScrollView>

        <Footer />
      </View>
    )
  }
}

class Footer extends Component {
  render() {
    return (
      <View style={[g.reportFooter, r.wFull, r.padd20, r.bgWhite ]}>
        <View style ={[g.bgAccent, r.round5, r.full, { height:45 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#ffffff33', false)}
            onPress={this.props.onPress}>
            <View style={[r.full, r.center]} pointerEvents={'box-only'}>
              <a.FaBold style={[r.white]} size={15}>مشاهده</a.FaBold>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}
