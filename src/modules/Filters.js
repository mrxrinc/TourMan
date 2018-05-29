import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native'
// import axios from 'axios'
import { connect } from 'react-redux'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import r from './styles/Rinc'
import g from './styles/General'
import { Fa, FaBold } from './assets/Font'
import { Switch, IncDec, Checkbox, CustomMarker } from './assets/Assets'
import Loading from './assets/Loading'
import airConfig from './assets/air_font_config.json'
import lineConfig from './assets/line_font_config.json'
import { filtersToStore, filtersResult } from '../actions/generalActions'


const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)

class Filters extends Component {
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
                onPress={() => this.props.navigator.dismissModal()}
              >
                <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                  <AirIcon name={'close-bold'} size={14} />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View style={{ width: 90, height: 50 }}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', true)}
                onPress={() => {
                  this.props.filtersToStore(null)
                  this.props.navigator.dismissModal()
                }}>
                <View pointerEvents={'box-only'} style={[r.full, r.center]}>
                  <Fa size={12}>حذف همه</Fa>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
          <View style={[r.full, r.padd15]} />
        </View>
        <ScrollView style={r.paddHoriz20}>
          <View style={[r.rtl, r.horizCenter, r.spaceBetween]}>
            <View style={[r.rightMargin5, { flex: 2 }]}>
              <Fa size={15}>رزرو آنی</Fa>
              <Fa style={r.grayLight} size={10}>
                رزروهای بدون نیاز به تایید میزبان
              </Fa>
            </View>
            <View style={[r.center, { flex: 1, height: 75 }]}>
              <Switch
                state={this.props.filters.instanceReserve}
                onPress={() => {
                  this.props.filtersToStore('instanceReserve', !this.props.filters.instanceReserve)
                }}
              />
            </View>
          </View>

          <View style={g.line} />

          <View style={r.top20}>
            <View style={[r.rtl, r.horizCenter, r.spaceBetween]}>
              <Fa size={15}>محدوده قیمت</Fa>
              <View style={[r.rtl, r.center]}>
                <Fa style={[r.grayLight, { height: 25 }]} size={17}>
                  <Text>{this.props.filters.price[0]}</Text>
                  <Text> - </Text>
                  <Text>{this.props.filters.price[1]}</Text>
                </Fa>
                <LineIcon name={'money'} size={20} style={[r.grayLight, r.rightMargin5]} />
              </View>

            </View>
            <View style={[r.top20, r.horizCenter]}>
              <MultiSlider
                values={[this.props.filters.price[0], this.props.filters.price[1]]}
                onValuesChange={(values) => {
                  console.log(values)
                  this.props.filtersToStore('price', values)
                }}
                min={10}
                max={1000}
                step={1}
                customMarker={CustomMarker}
                trackStyle={{ height: 5, backgroundColor: '#ebebeb', marginTop: -2 }}
                selectedStyle={{ backgroundColor: '#039fa4' }}
              />
            </View>
          </View>

          <View style={g.line} />

          <View style={r.top20}>
            <Fa size={15}>نوع رزرو</Fa>
            <View style={[r.rtl, r.top20, r.horizCenter, r.spaceBetween]}>
              <View>
                <Fa style={[r.grayMid]} size={13}>کل ملک</Fa>
                <Fa style={[r.grayMid]} size={10}>
                  کل خانه در اختیار شما باشد.
                </Fa>
              </View>
              <Checkbox
                active={this.props.filters.entire}
                onPress={() => {
                  this.props.filtersToStore('entire', !this.props.filters.entire)
                }}
              />
            </View>
            <View style={[r.rtl, r.top20, r.horizCenter, r.spaceBetween]}>
              <View>
                <Fa style={[r.grayMid]} size={13}>اتاق اختصاصی</Fa>
                <Fa style={[r.grayMid]} size={10}>
                  اتاقتان اختصاصی باشه با چند سرویس اشتراکی.
                </Fa>
              </View>
              <Checkbox
                active={this.props.filters.privateRoom}
                onPress={() => {
                  this.props.filtersToStore('privateRoom', !this.props.filters.privateRoom)
                }}
              />
            </View>

            <View style={[r.rtl, r.top20, r.horizCenter, r.spaceBetween]}>
              <View>
                <Fa style={[r.grayMid]} size={13}>اتاق اشتراکی</Fa>
                <Fa style={[r.grayMid]} size={10}>
                  اتاقهای مشترک با مهمان های دیگر.
                </Fa>
              </View>
              <Checkbox
                active={this.props.filters.sharedRoom}
                onPress={() => {
                  this.props.filtersToStore('sharedRoom', !this.props.filters.sharedRoom)
                }}
              />
            </View>

            <View style={[r.rtl, r.top20, r.horizCenter, r.spaceBetween]}>
              <View>
                <Fa style={[r.grayMid]} size={13}>لاکچری</Fa>
                <Fa style={[r.grayMid]} size={10}>
                  خانه های لاکچری در بهترین نقاط شهر
                </Fa>
              </View>
              <Checkbox
                active={this.props.filters.luxury}
                onPress={() => {
                  this.props.filtersToStore('luxury', !this.props.filters.luxury)
                }}
              />
            </View>
          </View>

          <View style={[g.line, r.top20]} />

          <View style={r.top20}>
            <Fa size={15}>تعداد تخت و سرویس</Fa>
            <IncDec
              title={'اتاق خواب'}
              titleStyle={[r.grayMid, { fontSize: 12 }]}
              height={50}
              count={this.props.filters.rooms}
              incPress={() => {
                if (this.props.filters.rooms < 16) {
                  this.props.filtersToStore('rooms', this.props.filters.rooms + 1)
                }
              }}
              decPress={() => {
                if (this.props.filters.rooms > 1) {
                  this.props.filtersToStore('rooms', this.props.filters.rooms - 1)
                }
              }}
            />
            <IncDec
              title={'تخت خواب'}
              titleStyle={[r.grayMid, { fontSize: 12 }]}
              height={50}
              count={this.props.filters.beds}
              incPress={() => {
                if (this.props.filters.beds < 11) {
                  this.props.filtersToStore('beds', this.props.filters.beds + 1)
                }
              }}
              decPress={() => {
                if (this.props.filters.beds > 1) {
                  this.props.filtersToStore('beds', this.props.filters.beds - 1)
                }
              }}
            />
            <IncDec
              title={'سرویس بهداشتی'}
              titleStyle={[r.grayMid, { fontSize: 12 }]}
              height={50}
              count={this.props.filters.bathrooms}
              incPress={() => {
                if (this.props.filters.bathrooms < 16) {
                  this.props.filtersToStore('bathrooms', this.props.filters.bathrooms + 1)
                }
              }}
              decPress={() => {
                if (this.props.filters.bathrooms > 1) {
                  this.props.filtersToStore('bathrooms', this.props.filters.bathrooms - 1)
                }
              }}
            />
          </View>

          <View style={[g.line]} />

          <View style={r.top20}>
            <Fa size={15}>امکانات</Fa>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>وای فای</Fa>
              <Checkbox
                active={this.props.filters.wifi}
                onPress={() => {
                  this.props.filtersToStore('wifi', !this.props.filters.wifi)
                }}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>تلویزیون</Fa>
              <Checkbox
                active={this.props.filters.tv}
                onPress={() => {
                  this.props.filtersToStore('tv', !this.props.filters.tv)
                }}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>لوازم ضروری استحمام</Fa>
              <Checkbox
                active={this.props.filters.accessories}
                onPress={() => {
                  this.props.filtersToStore('accessories', !this.props.filters.accessories)
                }}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>آشپزخانه</Fa>
              <Checkbox
                active={this.props.filters.kitchen}
                onPress={() => {
                  this.props.filtersToStore('kitchen', !this.props.filters.kitchen)
                }}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>ماشین لباسشویی</Fa>
              <Checkbox
                active={this.props.filters.washingMachine}
                onPress={() => {
                  this.props.filtersToStore('washingMachine', !this.props.filters.washingMachine)
                }}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>کولر</Fa>
              <Checkbox
                active={this.props.filters.cooler}
                onPress={() => {
                  this.props.filtersToStore('cooler', !this.props.filters.cooler)
                }}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>پارکینگ</Fa>
              <Checkbox
                active={this.props.filters.parkingLot}
                onPress={() => {
                  this.props.filtersToStore('parkingLot', !this.props.filters.parkingLot)
                }}
              />
            </View>
          </View>

          <View style={[g.line, r.top20]} />

          <View style={[r.top20, r.bottom10]}>
            <Fa size={15}>قوانین خانه</Fa>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>مناسب برای مراسمات</Fa>
              <Checkbox
                active={this.props.filters.celebrationAllowed}
                onPress={() => {
                  this.props.filtersToStore('celebrationAllowed', !this.props.filters.celebrationAllowed)
                }}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>آوردن حیوان خانگی مجاز باشد</Fa>
              <Checkbox
                active={this.props.filters.petsAllowed}
                onPress={() => {
                  this.props.filtersToStore('petsAllowed', !this.props.filters.petsAllowed)
                }}
              />
            </View>
            <View style={[r.rtl, r.top10, r.horizCenter, r.spaceBetween]}>
              <Fa style={[r.grayMid]} size={13}>سیگار کشیدن مجاز باشد</Fa>
              <Checkbox
                active={this.props.filters.smokingAllowed}
                onPress={() => {
                  this.props.filtersToStore('smokingAllowed', !this.props.filters.smokingAllowed)
                }}
              />
            </View>
          </View>

        </ScrollView>

        <Footer 
          onPress={() => {
            this.props.filtersResult(this.props.filters)
            this.props.navigator.dismissModal()
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
        <View style={[g.bgAccent, r.round5, r.full, { height: 45 }]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple('#ffffff33', false)}
            onPress={this.props.onPress}>
            <View style={[r.full, r.center]} pointerEvents={'box-only'}>
              <FaBold style={[r.white]} size={15}>مشاهده</FaBold>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filtersToStore: (key, value) => dispatch(filtersToStore(key, value)),
    filtersResult: (data) => dispatch(filtersResult(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
