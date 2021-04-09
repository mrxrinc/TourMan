import React, { Component } from 'react'
import {
  View,
  TextInput,
  TouchableNativeFeedback,
  ToastAndroid
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import StarRating from 'react-native-star-rating'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from './assets/air_font_config.json'
import r from './styles/Rinc'
import g from './styles/General'
import { FaBold } from './assets/Font'
import { addReview } from '../actions/generalActions'
import { baseURL } from '../constants/api'
import Loading from './assets/Loading'

const AirIcon = createIconSetFromFontello(airConfig)

class ReviewSend extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = { 
    borderColor: '#e6e6e6',
    rate: 0,
    review: ''
  }

  onStarRatingPress(rating) {
    this.setState({ rate: rating })
  }

  submitReview = () => {
    const data = {
      userId: this.props.user._id,
      userFullName: `${this.props.user.firstName} ${this.props.user.lastName}`,
      avatar: this.props.user.avatar,
      parent: this.props.parent,
      comment: this.state.review.trim(),
      rate: this.state.rate
    }
    if (this.state.review.trim() !== '') {
      axios.post(`${baseURL}api/reviews`, data)
        .then(res => {
          this.props.addReview(res.data)
          console.log(res.data)
          ToastAndroid.show('دیدگاه شما دریافت شد.', ToastAndroid.SHORT)
          this.props.navigator.dismissModal()
        })
        .catch(err => {
          ToastAndroid.show('مشکلی در ارتباط با سرور پیش آمد!', ToastAndroid.LONG)
          console.log(err)
        })
    } else {
      this.setState({ borderColor: '#fd5155' })
    }
  }

  render() {
    return (
      <View style={[g.feedBackWrap, r.bgWhite]}>
        <View
          style={[r.rtl, r.spaceBetween, r.topPadd25,
          { height: 75, borderBottomWidth: 1, borderColor: '#dadada' }]}
        >
          <View>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={() => this.props.navigator.dismissModal()}
            >
              <View pointerEvents={'box-only'} style={[r.full, r.center, { width: 60 }]}>
                <AirIcon 
                  name={'left-arrow-bold'} 
                  size={18}
                  style={[r.grayDark, r.flipX, r.centerText, { width: 25 }]}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View>
            <TouchableNativeFeedback
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple('#00000022')}
              onPress={() => this.submitReview()}
            >
              <View pointerEvents={'box-only'} style={[r.full, r.center, { width: 100 }]}>
                <FaBold size={15} style={{ color: '#009689' }}>ارسال دیدگاه</FaBold>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[r.top20, r.spaceAround, r.horizCenter]}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.rate}
            starSize={35}
            halfStarEnabled
            fullStarColor={'#007979'}
            emptyStarColor={'#d3d3d3'}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
          />
        </View>

        <View style={[r.padd20]}>
          <TextInput
            style={[g.feedbackBox, r.rightText, r.grayDark, r.padd20,
              { borderColor: this.state.borderColor }]}
            multiline
            onFocus={() => this.setState({ borderColor: '#0c98a6' })}
            onBlur={() => this.setState({ borderColor: '#e6e6e6' })}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={'#d7d7d7'}
            value={this.state.review}
            placeholder={'دیدگاه من... '}
            onChangeText={value => { this.setState({ review: value }); console.log(value) }}
          />
        </View>

      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    home: state.home
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addReview: (data) => dispatch(addReview(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReviewSend)
