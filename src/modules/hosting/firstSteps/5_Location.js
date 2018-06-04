import React, { Component } from 'react'
import {
  View,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native'
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import Modal from 'react-native-modal'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBold } from '../../assets/Font'
import { addHome, addHomeStepsFunc } from '../../../actions/generalActions'
import provinces from '../../assets/provinces.json'
import { BTN, NavBar, MyMarker } from '../HostAssets'
import { RadioBTN, MapStyle } from '../../assets/Assets'

class HostingLocation extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    province: null,
    location: null,
    region: { 
      latitude: 35.69657412357928,
      longitude: 51.3869989849627,
      latitudeDelta: 0.22889707178593,
      longitudeDelta: 0.19180845469236374
    }
  }

  componentWillMount() {
    if (this.props.addHomeState.province) {
      const province = this.props.addHomeState.province
      const location = this.props.addHomeState.location
      this.setState({ province, location, region: location })
    }
  }

  nextPage = () => {
    const payload = {
      province: this.state.province,
      location: this.state.region,
    }
    this.props.addHome(payload, 'location')
    this.props.navigator.dismissModal()
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar 
          saveAndExit={() => {
            this.state.province !== null ? this.props.addHomeStepsFunc(2) : null
            this.nextPage()
          }}
          back={() => this.props.navigator.pop()}
        />
        <View style={r.full}>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark, r.bottom30]}>
              استان و محل دقیق خانه را مشخص کنید
              </FaBold>

            <View style={r.center}>
              <TouchableNativeFeedback
                delayPressIn={0}
                background={TouchableNativeFeedback.Ripple('#00000011', false)}
                onPress={() => this.setState({ locationModal: true })}
              >
                <View
                  style={[r.center, g.hostingSelectProvince]}
                  pointerEvents={'box-only'}
                >
                  {this.state.province ? (
                    <FaBold style={g.primary} size={18}>
                      {this.state.province}
                    </FaBold>
                  ) : (
                      <Fa style={g.primary} size={18}>
                        انتخاب کنید...
                      </Fa>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>

            <Modal
              isVisible={this.state.locationModal}
              useNativeDriver
              onBackdropPress={() => this.setState({ locationModal: false })}
              onBackButtonPress={() => this.setState({ locationModal: false })}
            >
              <View style={[g.provincesModal]}>
                <ScrollView
                  contentContainerStyle={[r.paddHoriz20, r.bgWhite]}
                  showsVerticalScrollIndicator={false}
                >
                  {provinces.items.map(item => (
                    <View
                      key={item.id}
                      style={[r.rtl, r.spaceBetween, r.horizCenter, { height: 50 }]}
                    >
                      <Fa size={15}>{item.name}</Fa>
                      <RadioBTN
                        active={this.state.province === item.name}
                        onPress={() => {
                          this.setState({ 
                            locationModal: false, 
                            province: item.name,
                            region: item.region
                           })
                        }}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Modal>
          </View>

          <MapView
            style={[r.map]}
            showsCompass={false}
            region={this.state.region}
            customMapStyle={MapStyle}
            loadingEnabled
            onRegionChangeComplete={region => {
              this.setState({ region })  
            }}
          >
            <Marker coordinate={this.state.region} draggable>
              <MyMarker />
            </Marker>
          </MapView>
          
        </View>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>5/5</Fa>
        </View>

        
        {this.state.province && (
          <BTN
            active
            next
            style={[r.absolute, g.hostingStepsNextBTN, { left: 10, bottom: 10 }]}
            onPress={() => {
              this.props.addHomeStepsFunc(2)
              this.nextPage()
            }}
          />
        )}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    addHomeState: state.addHomeState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addHome: (data, section) => dispatch(addHome(data, section)),
    addHomeStepsFunc: (data) => dispatch(addHomeStepsFunc(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostingLocation)

