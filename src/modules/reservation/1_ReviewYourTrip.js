import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Image,
  Text
} from 'react-native'
import { connect } from 'react-redux'
import jalaali from 'jalaali-js'
import r from '../styles/Rinc'
import g from '../styles/General'
import { Fa, FaBold } from '../assets/Font'
import { reserveFunc } from '../../actions/generalActions'
import { NavBar, ReserveFooter } from './ReservationAssets'

const year = jalaali.toJalaali(new Date()).jy
const month = jalaali.toJalaali(new Date()).jm
const day = jalaali.toJalaali(new Date()).jd
const reservedDate = `${year}/${month}/${day}`

class ReservationReviewYourTrip extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state={ totalNights: 1, reservedDays: [] }

  componentDidMount() {
    this.daysCount()
  }
  daysCount = () => {
    const rawData = this.props.date.days
    const reservedDays = []
    rawData.map(month => {
      month.days.map(day => {
        if (day.active) {
          reservedDays.push([month.value, day.value])
        }
      })
    })
    this.setState({ 
      reservedDays,
      totalNights: reservedDays.length - 1 // nights always are 1 less than days
     })
  }

  createReserve = () => {
    const payload = {
      homeId: this.props.home._id,
      homeTitle: this.props.home.title,
      hostId: this.props.home.host.id,
      hostName: this.props.home.host.fullName,
      guestId: this.props.user._id,
      guestName: `${this.props.user.firstName} ${this.props.user.lastName}`,
      adults: this.props.filters.adults,
      children: this.props.filters.children,
      pets: this.props.filters.petsAllowed,
      reservedDays: this.state.reservedDays,
      price: this.props.home.price,
      totalNights: this.state.totalNights,
      totalPrice: this.state.totalNights * this.props.home.price,
      reservedDate
    }
    this.props.reserveFunc(payload, 'create')    
    this.props.navigator.push({
      screen: 'mrxrinc.ReservationReviewHomeRules'
    })
  }
  
  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar 
          steps={[1, 4]}
          back={() => this.props.navigator.dismissModal()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark, r.bottom10]}>
              مرور جزئیات سفر
            </FaBold>
            
            <View style={[r.rtl, r.spaceBetween, r.paddHoriz10, { height: 100 }]} >
              <View style={[r.full, r.verticalCenter]}>
                <FaBold size={18} style={[r.grayDark]}>{this.props.home.title}</FaBold>
                <Fa size={11} style={r.top10}>{this.props.home.about.details}</Fa>
              </View>
              <View style={[r.center, { width: 100 }]}>
                <Image
                  source={{ uri: this.props.home.images[0] }}
                  style={[r.round3, r.wFull, { height: 80 }]}
                />
              </View>
            </View>

            <View style={[r.rtl, r.horizCenter, r.spaceBetween, r.top20, { height: 55 }]}>
              <View style={[r.rightMargin5]}>
                <Fa style={[r.grayMid]} size={15}>تاریخ</Fa>
              </View>
              <View style={[r.center]}>
                <Fa 
                  style={[g.primary]} 
                  size={15}
                  onPress={() => this.props.navigator.showModal({ screen: 'mrxrinc.When' })}
                >
                  {this.props.date ? (
                    <Text>
                      {typeof this.props.date.startDate === 'object' ?
                        this.props.date.startDate.join(' ') : null
                      }
                      {typeof this.props.date.endDate === 'object' ?
                        `  تا  ${this.props.date.endDate.join(' ')}` : null
                      }
                    </Text>
                  ) : (
                      <Text>انتخاب کنید...</Text>
                  )}
                </Fa>
              </View>
            </View>

            <View style={g.line} />

            <View style={[r.rtl, r.horizCenter, r.spaceBetween, { height: 55 }]}>
              <View style={[r.rightMargin5]}>
                <Fa style={[r.grayMid]} size={15}>تعداد مهمان ها</Fa>
              </View>
              <View style={[r.center]}>
                {this.props.filters && (
                  <Fa 
                    style={[g.primary]} 
                    size={15} 
                    onPress={() => {
                      this.props.navigator.showModal({ 
                        screen: 'mrxrinc.HowMany',
                        passProps: {
                          homeMaxCapacity: this.props.home.capacity.adults
                        }
                       })
                    }}
                  >
                    {this.props.filters.adults &&
                      `${this.props.filters.adults} بزرگسال `
                    }
                    {this.props.filters.children !== 0 ?
                      ` - ${this.props.filters.children} کودک` : null
                    }
                    {this.props.filters.petsAllowed && ' - حیوان خانگی'}
                  </Fa>
                )}
              </View>
            </View>
          
          </View>
        </ScrollView>

        <ReserveFooter 
          price={this.props.home.price}
          totalNights={this.state.totalNights}
          onPress={() => this.createReserve()}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    filters: state.filters,
    date: state.date,
    user: state.user,
    reserve: state.reserve
  }
}

function mapDispatchToProps(dispatch) {
  return {
    reserveFunc: (data, section) => dispatch(reserveFunc(data, section))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationReviewYourTrip)
