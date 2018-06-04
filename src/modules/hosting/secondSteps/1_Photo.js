import React, { Component } from 'react'
import {
  View,
  ToastAndroid,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import airConfig from '../../assets/air_font_config.json'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa } from '../../assets/Font'
import { addHome } from '../../../actions/generalActions'
import { baseURL } from '../../../constants/api'
import Loading from '../../assets/Loading'
import { BTN, NavBar } from '../HostAssets'

const AirIcon = createIconSetFromFontello(airConfig)

class HostingHomeTypes extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    images: [],
    imageLoading: false
  }

  componentWillMount() {
    if (this.props.addHomeState.images) {
      const images = this.props.addHomeState.images
      this.setState({ images })
    }
  }

  addPhotos = () => { 
    ImagePicker.openPicker({
      width: 700,
      height: 500,
      cropping: true,
      cropperActiveWidgetColor: '#008A8A',
      cropperStatusBarColor: '#09686c',
      cropperToolbarColor: '#008A8A',
      cropperToolbarTitle: 'ویرایش تصویر',
      mediaType: 'photo'
    }).then(image => {
      console.log(image)
      this.setState({ imageLoading: true })
      const data = new FormData()
      data.append('homeImage', {
        uri: image.path,
        type: image.mime,
        name: `TourMan_image${image.path.substr(-4)}` // adding extention
      })
      axios.post(`${baseURL}api/homes/image`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(res => {
          console.log(res.data)
          const newImages = this.state.images.map(item => item)
          newImages.push(res.data)
          this.setState({ 
            images: newImages,
            imageLoading: false
           }, () => {
            console.log(this.state.images)            
          })
          ToastAndroid.show('آپلود شد', ToastAndroid.SHORT)
        })
        .catch(err => {
          ToastAndroid.show('مشکلی پیش آمد. لطفا مجددا تلاش کنید!', ToastAndroid.LONG)
          console.log(err)
        })
    })
    .catch(err => {
      ToastAndroid.show('تصویر انتخابی قابل استفاده نیست!', ToastAndroid.LONG)
      console.log('canceled! ====', err)
    })
  }

  deletePhoto = (image) => {
    if (this.state.images.length > 1) {
      const index = this.state.images.indexOf(image)
      const newImages = [...this.state.images]
      if (index > -1) newImages.splice(index, 1)
      this.setState({ images: newImages })
    } else {
      ToastAndroid.show('حداقل یک عکس باید باقی بماند!', ToastAndroid.SHORT)
    }
  }

  nextPage = () => {
    const payload = {
      images: this.state.images
    }
    this.props.addHome(payload, 'images')
    this.props.navigator.push({
      screen: 'mrxrinc.HostingAbout'
    })
  }

  render() {
    return (
      <View style={[r.full, r.bgwhite]}>
        <NavBar
          saveAndExit={() => {
            this.nextPage()
            this.props.navigator.dismissModal()
          }}
          addPhotos={() => this.addPhotos()}
          back={() => this.props.navigator.dismissModal()}
        />
        {!this.state.images.length && (
          <View style={[r.center, r.top60]}>
            <AirIcon name={'webcam'} size={180} color={'#fafafa'} />
          </View>
        )}
        {this.state.imageLoading && (
          <View style={[r.absolute, r.hFull, r.wFull, r.center, r.zIndex2]}>
            <Loading />
          </View>
        )}
        <FlatList
          data={this.state.images}
          renderItem={({ item }) => (
            <View style={[g.hostingImages]}>
              <Image  
                source={{ uri: item }}
                style={[r.full]}
              />
              <TouchableOpacity
                style={[r.absolute, r.bgRed, r.center, g.hostingImageDelete]}
                onPress={() => this.deletePhoto(item)}
              >
                <AirIcon name={'remove'} size={20} color={'#fff'} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => `${item}`}
          numColumns={2}
          contentContainerStyle={[g.hostingImagesWrap]}
        />

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>1/3</Fa>
        </View>

        <BTN
          active={this.state.images.length}
          next
          style={[r.absolute, g.hostingStepsNextBTN]}
          onPress={() => this.nextPage()}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    addHomeState: state.addHomeState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addHome: (data, section) => dispatch(addHome(data, section))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostingHomeTypes)
