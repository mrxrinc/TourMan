import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import r from './styles/Rinc'
import { ItemBig } from './assets/Assets'
import { Fa, FaMulti, FaBold } from './assets/Font'
import Tabs from './assets/Tabs'


export default class Favorites extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
    // data: [
    //   {
    //     id: 1,
    //     title: 'ویلای فول در شهر نور، مازندران',
    //     image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
    //     price: 1250,
    //     reviews: 152,
    //     stars: 5,
    //     like: true,
    //     verified: true,
    //     type: 'کل ملک'
    //   },
    //   {
    //     id: 2,
    //     title: 'آپارتمان لوکس سعادت آباد',
    //     image: 'https://wallpaperbrowse.com/media/images/cat-1285634_960_720.png',
    //     price: 1250,
    //     reviews: 152,
    //     stars: 5,
    //     like: false,
    //     verified: false,
    //     type: 'کل ملک'
    //   },
    // ]
    data: null
  }
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[r.full]}>
          <FaBold
            size={25}
            style={[r.paddHoriz30, r.grayDark, r.top60, r.bottom20]}
          >
            علاقه مندی ها
          </FaBold>
          {this.state.data !== null ? (
            <FlatList
              data={this.state.data}
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
              initialNumToRender={3}
              ListFooterComponent={() => <View style={{ marginTop: 90 }} />}
            />
          ) : (
            <View style={[r.full, r.bottom50, r.paddHoriz30]}>
              <FaMulti numberOfLines={5} size={11} style={[r.grayLight]}>
                با زدن روی آیکن قلب روی هر خانه می تونید اونرو به لیست علاقه مندی هاتون اضافه کنید.
              </FaMulti>
              <TouchableOpacity
                style={[r.wFull, r.top30]}
                activeOpacity={0.5}
                onPress={() => {
                  this.props.navigator.push({
                    screen: 'mrxrinc.Explore',
                    animationType: 'fade'
                  })
                }}
                >
                <Fa size={13} style={{ color: '#0b9898' }}>شروع جستجو</Fa>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Tabs
          active={'favorites'}
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
