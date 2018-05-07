import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold } from './assets/Font'
import Loading from './assets/Loading'
import { ItemBig } from './assets/Assets'
import airConfig from './assets/air_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)

export default class PopularHomes extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  renderHeader() {
    return (
      <FaBold size={15} style={[r.top20, r.rightMargin20]}>خانه های پرطرفدار</FaBold>
    )
  }
  render() {
    return (
      <View style={[r.bgWhite, r.bottom50]}>
        <FlatList
          data={[
            {
              id: 1,
              title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
              image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
              price: 1250,
              reviews: 152,
              stars: 5,
              like: true,
              verified: true,
              type: 'کل ملک'
            },
            {
              id: 2,
              title: 'آپارتمان لوکس سعادت آباد',
              image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
              price: 1250,
              reviews: 152,
              stars: 5,
              like: false,
              verified: false,
              type: 'کل ملک'
            },
            {
              id: 3,
              title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
              image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
              price: 1250,
              reviews: 152,
              stars: 5,
              like: false,
              verified: true,
              type: 'کل ملک'
            },
            {
              id: 4,
              title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
              image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
              price: 1250,
              reviews: 152,
              stars: 5,
              like: false,
              verified: false,
              type: 'کل ملک'
            },
          ]}
          renderItem={({ item }) => (
            <ItemBig
              key={item.id}
              title={item.title}
              image={item.image}
              rate={5}
              reviews={168}
              price={1260}
              like={item.like}
              verified={item.verified}
              type={item.type}
              likePress={() => null}
              onPress={() => console.log(item.id)}
            />
          )}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          initialNumToRender={2}
          ListHeaderComponent={() => this.renderHeader()}
          ListFooterComponent={() => <View style={g.bottomSafeSpace} />}
        />
        <View style={[g.mapFilter, r.absolute, r.bgLight1, r.rtl, r.horizCenter]}>
          <View style={[r.full]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigator.showModal({
                  screen: 'mrxrinc.Filters'
                })
              }}
            >
              <View style={[r.rtl, r.center]}>
                <FaBold size={11} style={r.leftPadd5}>فیلتر</FaBold>
                <AirIcon name={'filter'} size={12} style={[r.black, { width: 15 }]} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[r.bgGrayLight, { width: 1, height: 18 }]} />
          <View style={[r.full]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.props.navigator.showModal({
                  screen: 'mrxrinc.Map'
                })
              }}
            >
              <View style={[r.rtl, r.center]}>
                <FaBold size={11} style={r.leftPadd5}>نقشه</FaBold>
                <AirIcon name={'map-marker-alt'} size={12} style={[r.black, { width: 15 }]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
