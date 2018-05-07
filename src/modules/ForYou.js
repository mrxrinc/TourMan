import { Navigation } from 'react-native-navigation'
import React, { Component } from 'react'
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import InvertibleScrollView from 'react-native-invertible-scroll-view'
// import * as Animatable from 'react-native-animatable'
// import { createAnimatableComponent } from 'react-native-animatable'
import r from './styles/Rinc'
import g from './styles/General'
import * as a from './assets/Font'
import Loading from './assets/Loading'
import { RowItem, HeartFull, HeartEmpty } from './assets/Assets'
import airConfig from './assets/air_font_config.json'
import lineConfig from './assets/line_font_config.json'

const AirIcon = createIconSetFromFontello(airConfig)
const LineIcon = createIconSetFromFontello(lineConfig)
// const AnimatableLineIcon = createAnimatableComponent(LineIcon);

export default class ForYou extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exItemHeart_01: false,
      debug: 'debug'
    }
  }
  render() {
    return (
      <ScrollView
        style={[r.full, r.bgWhite, r.topPadd20]}
        showsVerticalScrollIndicator={false}
      >

        {/* <View>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <a.FaBold size={15} style={[r.grayDark]}>
              تجربه ها
            </a.FaBold>
            <a.Fa size={13} style={[r.grayLight]}>
              همه
            </a.Fa>
          </View>
          <InvertibleScrollView
            contentContainerStyle={[r.leftPadd15, r.top10]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            inverted
          >
            <View style={[g.exItem]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={() => console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/exTest01.jpg')}
                    style={[g.exItemImg, g.round]}
                    resizeMode={'cover'}
                  />
                  <View style={r.topPadd5}>
                    <a.FaMulti numberOfLines={2} style={r.grayDark}>
                      بالن سواری در ارتفاعات البرز و کوه دماوند
                    </a.FaMulti>
                    <View style={[r.rtl, r.spaceBetween, r.rightPadd5]}>
                      <View style={[r.row]}>
                        <a.FaBold size={19} style={[g.exItemPrice]}>555</a.FaBold>
                        <LineIcon name={'money'} size={20} style={r.gray} />
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
                onPress={() => {
                  this.state.exItemHeart_01 === true ?
                    this.setState({ exItemHeart_01: false }) :
                    this.setState({ exItemHeart_01: true })
                }}
              >
                {this.state.exItemHeart_01 === true ? <HeartFull /> : <HeartEmpty />}
              </TouchableOpacity>
            </View>

            <View style={[g.exItem]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={() => console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/exTest01.jpg')}
                    style={[g.exItemImg, g.round]}
                    resizeMode={'cover'}
                  />
                  <View style={r.topPadd5}>
                    <a.FaMulti numberOfLines={2} style={r.grayDark}>
                      بالن سواری در ارتفاعات البرز و کوه دماوند
                    </a.FaMulti>
                    <View style={[r.rtl, r.spaceBetween, r.rightPadd5]}>
                      <View style={[r.row]}>
                        <a.FaBold size={19} style={[g.exItemPrice]}>555</a.FaBold>
                        <LineIcon name={'money'} size={20} style={r.gray} />
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
        </View> */}

        <View>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <a.FaBold size={15} style={[r.grayDark]}>
              پیشنهاد ویژه
            </a.FaBold>
            <a.Fa size={13} style={[r.grayLight]}>
              همه
            </a.Fa>
          </View>
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
              },
              {
                id: 2,
                title: 'آپارتمان لوکس سعادت آباد',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
              {
                id: 3,
                title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
              {
                id: 4,
                title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
            ]}
            renderItem={({ item }) => (
              <RowItem
                key={item.id}
                title={item.title}
                image={item.image}
                rate={5}
                reviews={168}
                price={1260}
                like={item.like}
                likePress={() => null}
                onPress={() => console.log(item.id)}
              />
            )}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={[r.leftPadd15, r.top10]}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={2}
            keyboardDismissMode={'on-drag'}
            inverted
          />
        </View>

        {/* <View style={r.top40}>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <a.FaBold size={14} style={[r.grayDark]}>
              رزروهای پرطرفدار در کل کشور
            </a.FaBold>
            <TouchableWithoutFeedback
              onPress={()=> console.log('hey')}
            >
              <View style={[r.rtl, r.center]}>
                <a.Fa size={11} style={[r.grayLight]}>مشاهده همه </a.Fa>
                <AirIcon
                  name={'left-chevron-bold'}
                  size={10}
                  style={[r.grayLight, r.rightPadd3]} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <InvertibleScrollView
            contentContainerStyle={[g.popularList, r.leftPadd15, r.top10]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            inverted
          >
            <View style={[g.popularItem]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={()=> console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/popularTest01.jpg')}
                    style={[g.popularItemImg, g.round]}
                    resizeMode={'cover'} />
                  <View style={r.topPadd5}>
                    <a.Fa style={r.gray} size={11}>
                      رزرو
                    </a.Fa>
                    <a.FaBold style={r.grayDark} size={12}>
                      رستوران سالار تجریش
                    </a.FaBold>
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <View style={[g.popularItem]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={()=> console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/popularTest01.jpg')}
                    style={[g.popularItemImg, g.round]}
                    resizeMode={'cover'} />
                  <View style={r.topPadd5}>
                    <a.Fa style={r.red} size={11}>
                      رزرو
                    </a.Fa>
                    <a.FaBold style={r.grayDark} size={12}>
                      رستوران سالار تجریش
                    </a.FaBold>
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <View style={[g.popularItem]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={()=> console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/popularTest01.jpg')}
                    style={[g.popularItemImg, g.round]}
                    resizeMode={'cover'} />
                  <View style={r.topPadd5}>
                    <a.Fa style={r.gray} size={11}>
                      رزرو
                    </a.Fa>
                    <a.FaBold style={r.grayDark} size={12}>
                      رستوران سالار تجریش
                    </a.FaBold>
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <View style={[g.popularItem]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={()=> console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/popularTest01.jpg')}
                    style={[g.popularItemImg, g.round]}
                    resizeMode={'cover'} />
                  <View style={r.topPadd5}>
                    <a.Fa style={r.red} size={11}>
                      رزرو
                    </a.Fa>
                    <a.FaBold style={r.grayDark} size={12}>
                      رستوران سالار تجریش
                    </a.FaBold>
                  </View>
                </View>
              </TouchableHighlight>
            </View>

          </InvertibleScrollView>
        </View> */}

        <View style={r.top40}>
          <View style={[r.rtl, r.paddHoriz15]}>
            <a.FaBold size={14} style={[r.grayDark]}>
              مقاصد منتخب
            </a.FaBold>
          </View>
          <InvertibleScrollView
            contentContainerStyle={[r.leftPadd15, r.top10]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            inverted
          >
            <View style={[g.featuredDest]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={()=> console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/featuredDest01.jpg')}
                    style={[g.featuredDestImg, g.round]}
                    resizeMode={'cover'} />
                  <View style={r.topPadd5}>
                    <a.FaBold style={r.grayDark} size={13}>
                      کیش
                    </a.FaBold>
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <View style={[g.featuredDest]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={()=> console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/featuredDest02.jpg')}
                    style={[g.featuredDestImg, g.round]}
                    resizeMode={'cover'} />
                  <View style={r.topPadd5}>
                    <a.FaBold style={r.grayDark} size={13}>
                      سرعین
                    </a.FaBold>
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <View style={[g.featuredDest]}>
              <TouchableHighlight
                underlayColor={'rgba(0,0,0,0.1)'}
                onPress={()=> console.log('hey')}
              >
                <View>
                  <Image
                    source={require('./imgs/featuredDest03.jpg')}
                    style={[g.featuredDestImg, g.round]}
                    resizeMode={'cover'} />
                  <View style={r.topPadd5}>
                    <a.FaBold style={r.grayDark} size={13}>
                      رامسر
                    </a.FaBold>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </InvertibleScrollView>
        </View>

        <View style={r.top60}>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <a.FaBold size={15} style={[r.grayDark]}>
              خانه های تهران
            </a.FaBold>
            <a.Fa size={13} style={[r.grayLight]}>
              همه
            </a.Fa>
          </View>
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
              },
              {
                id: 2,
                title: 'آپارتمان لوکس سعادت آباد',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
              {
                id: 3,
                title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
              {
                id: 4,
                title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
            ]}
            renderItem={({ item }) => (
              <RowItem
                key={item.id}
                title={item.title}
                image={item.image}
                rate={5}
                reviews={168}
                price={1260}
                like={item.like}
                likePress={() => null}
                onPress={() => console.log(item.id)}
              />
            )}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={[r.leftPadd15, r.top10]}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={2}
            keyboardDismissMode={'on-drag'}
            inverted
          />
        </View>

        <View style={r.top40}>
          <View style={[r.rtl, r.spaceBetween, r.paddHoriz15]}>
            <a.FaBold size={15} style={[r.grayDark]}>
              خانه های مازندران
            </a.FaBold>
            <a.Fa size={13} style={[r.grayLight]}>
              همه
            </a.Fa>
          </View>
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
              },
              {
                id: 2,
                title: 'آپارتمان لوکس سعادت آباد',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
              {
                id: 3,
                title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
              {
                id: 4,
                title: 'ویلای فول در شهر نوربا تمامی امکانات از قبیل: استخر، سونا، جکوزی، سوارکاری، گلف، تنیس',
                image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
                price: 1250,
                reviews: 152,
                stars: 5,
                like: false,
              },
            ]}
            renderItem={({ item }) => (
              <RowItem
                key={item.id}
                title={item.title}
                image={item.image}
                rate={5}
                reviews={168}
                price={1260}
                like={item.like}
                likePress={() => null}
                onPress={() => console.log(item.id)}
              />
            )}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={[r.leftPadd15, r.top10]}
            horizontal
            showsHorizontalScrollIndicator={false}
            initialNumToRender={2}
            keyboardDismissMode={'on-drag'}
            inverted
          />
        </View>

        <View style={{ height: 90 }}></View>
      </ScrollView>

    )
  }
}
