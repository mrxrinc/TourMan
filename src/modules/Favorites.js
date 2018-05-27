import React, { Component } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import r from './styles/Rinc'
import { ItemBig } from './assets/Assets'
import { Fa, FaMulti, FaBold } from './assets/Font'
import Tabs from './assets/Tabs'
import Loading from './assets/Loading'
import { baseURL } from '../constants/api'

class Favorites extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: 'rgba(0, 0, 0, 0.3)'
  }
  state={
    data: [],
    loading: true
  }

  componentWillMount() {
    if (this.props.user.likes.length) {
      this.props.user.likes.forEach(element => {
        axios.get(`${baseURL}api/homes/${element}`)
          .then(res => {
            this.state.data.push(res.data)
            console.log(this.state.data)
            this.setState({ loading: false })
          })
          .catch(err => {
            ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
            console.log(err)
          })
      })
    } else {
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <View style={[r.full]}>
          <FaBold
            size={25}
            style={[r.paddHoriz30, r.grayDark, r.top50, r.bottom20]}
          >
            علاقه مندی ها
          </FaBold>
          {this.state.loading === true && (
            <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex1]}>
              <Loading />
            </View>
          )}
          
          {this.state.data.length > 0 && !this.state.loading && (
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <ItemBig
                  key={item._id}
                  title={item.title}
                  image={item.images[0]}
                  rate={item.overallRate}
                  reviews={item.reviewsCount}
                  price={item.price}
                  like={item.like}
                  verified={item.verified}
                  type={item.homeType}
                  likePress={() => null}
                  onPress={() => console.log(item.id)}
                />
              )}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              initialNumToRender={3}
              ListFooterComponent={() => <View style={{ height: 60 }} />}
            />
          )}
          {this.state.data.length === 0 && !this.state.loading && (
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
            this.props.navigator.resetTo({
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

function mapStateToProps(state) {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(Favorites)
