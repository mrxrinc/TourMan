import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Image
} from 'react-native'
import { connect } from 'react-redux'
import r from '../styles/Rinc'
import g from '../styles/General'
import { Fa, FaBold, FaMulti } from '../assets/Font'
import { addHome } from '../../actions/generalActions'
import { NavBar, ReserveFooter } from './ReservationAssets'

class ReservationReviewAndPay extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }

  state={
    rule: 'flexible',
    currentRule: null
  }

  componentWillMount() {
    this.defRule()
  }

  defRule() {
    for (let i = 0; i < rules.length; i++) {
      if (this.props.home.cancelation === rules[i].id) {
        this.setState({ currentRule: rules[i] })
      }
    }
  }

  handlePrice = (totalPrice) => {
    if (totalPrice.toString().length > 3 && totalPrice.toString().length < 5) {
      return ` ${totalPrice.toString().substr(0, 1)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    } else if (totalPrice.toString().length >= 5 && totalPrice.toString().length < 6) {
      return ` ${totalPrice.toString().substr(0, 2)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    } else if (totalPrice.toString().length >= 6 && totalPrice.toString().length < 7) {
      return ` ${totalPrice.toString().substr(0, 3)} میلیون و ${
        totalPrice.toString().substr(1, 3)} هزار تومان`
    }    
    return ` ${totalPrice} هزار تومان`
  }
  
  render() {
    const totalNights = 500
    const totalPrice = this.props.home.price * totalNights
    const titleColor = () => {
      switch (this.props.home.cancelation) {
        case 1:
          return r.red
        case 2:
          return r.grayMid
        case 3:
          return r.green
        default:
          return r.grayMid
      }
    }
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar 
          steps={[4, 4]}
          back={() => this.props.navigator.pop()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark, r.bottom10]}>
              مرور کلی و رزرو
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

            <View style={g.line} />

            <View style={[r.top20]}>
              <View style={[r.rightMargin5, r.rtl, r.horizCenter, r.spaceBetween]}>
                <Fa style={[r.grayMid]} size={12}>
                  {this.props.home.price} {' قیمت واحد '} × {totalNights} {' شب'}
                </Fa>
                <Fa style={[r.grayMid]} size={18}>
                  {totalPrice.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')}
                </Fa>
              </View>
              <View style={[r.rightMargin5, r.rtl, r.horizCenter, r.spaceBetween]}>
                <Fa style={[r.grayLight]} size={12}>هزینه نظافت</Fa>
                <Fa style={[r.grayLight]} size={12}>رایگان</Fa>
              </View>
              <View style={[r.rightMargin5, r.rtl, r.horizCenter, r.spaceBetween]}>
                <Fa style={[r.grayLight]} size={12}>هزینه سرویس ها</Fa>
                <Fa style={[r.grayLight]} size={12}>رایگان</Fa>
              </View>
              <View style={[r.rightMargin5, r.rtl, r.horizCenter, r.spaceBetween, r.top30]}>
                <Fa style={[r.grayDark]} size={12}>مبلغ کل:</Fa>
                <Fa style={[r.grayDark]} size={18}>
                  {this.handlePrice(totalPrice)}
                </Fa>
              </View>
            </View>

            <View style={g.line} />

            <View style={[r.top20]}>
              <FaBold size={14}>
              شرایط لغو رزرو{' : '} 
              <Text style={[titleColor()]}>
                {this.state.currentRule.title}
              </Text>
              </FaBold>
              {this.state.currentRule && (
                <View>
                  <FaMulti size={10}>
                    {this.state.currentRule.rules.r01}
                  </FaMulti>
                  <FaMulti size={10}>
                    {this.state.currentRule.rules.r02}
                  </FaMulti>
                  <FaMulti size={10}>
                    {this.state.currentRule.rules.r03}
                  </FaMulti>
                </View>
              )}
            </View>

            <View style={g.line} />

            <View style={[r.wFull, r.top20]}>
              <FaMulti size={12} style={[r.grayDark, { lineHeight: 10 }]}>
                <Text>من با درخواست رزرو تایید می کنم که همه </Text>
                <Text
                  style={[r.underLine, g.primary]}
                  onPress={() => {
                    this.props.navigator.showModal({
                      screen: 'mrxrinc.Privacy',
                      passProps: { modal: true }
                    })
                  }}
                >شرایط و قوانین تورمن</Text>
                <Text> را خوانده و قبول کرده ام.</Text>
              </FaMulti>
            </View>
          
          </View>
        </ScrollView>

        <ReserveFooter 
          finish
          price={this.props.home.price}
          totalNights={500}
          onPress={() => {
            this.props.navigator.push({
              screen: 'mrxrinc.ReservationPayment'
            })
          }}
        />
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
    addHome: (data, section) => dispatch(addHome(data, section))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationReviewAndPay)

const rules = [
  {
    id: 1,
    key: 'strict',
    title: 'سختگیرانه',
    rules: {
      r01: 'اگر مهمان تا یک هفته مانده به موعد در خواست لغو کند، 50% مبلغ کل پرداخت می شود در غیر این صورت هیچ مبلغی پس داده نخواهد شد. برای مثال اگر برای روز جمعه رزرو کرده باشید تا روز جمعه هفته قبل می توانید درخواست لغو بدید و 50% مبلغ خود را دریافت کنید.',
      r02: 'اگر مهمان تا یک هفته مانده به موعد در خواست لغو کند، هیچ مبلغی پس داده نخواهد شد.',
      r03: 'اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، هیچ مبلغی پس داده نخواهد شد.'
    }
  },
  {
    id: 2,
    key: 'moderate',
    title: 'متعادل',
    rules: {
      r01: 'برای دریافت کل مبلغ پرداختی، باید حداقل پنج روز قبل از موعد مقرر درخواست لغو کنید . برای مثال اگر برای روز جمعه رزرو کرده باشید تا روز یکشنبه می توانید درخواست لغو بدید و کل مبلغ خود را دریافت کنید.',
      r02: 'اگر مهمان در کمتر از پنج روز درخواست لغو کند، مبلغ شب اول پرداخت نشده و 50% مبلغ باقی شبها پرداخت می شود.',
      r03: 'اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، 50% مبلغ شب هایی که نخواهد ماند پس داده می شود.'
    }
  },
  {
    id: 3,
    key: 'flexible',
    title: 'انعطاف پذیر',
    rules: {
      r01: 'برای دریافت کل مبلغ پرداختی، باید حداقل یک روز قبل از موعد مقرر درخواست لغو کنید . برای مثال اگر برای روز جمعه رزرو کرده باشید تا روز پنج شنبه می توانید درخواست لغو بدید و کل مبلغ خود را دریافت کنید.',
      r02: 'اگر مهمان در کمتر از 24 ساعت به موعد رزرو درخواست لغو کند، مبلغ روز اول پس داده نخواهد شد.',
      r03: 'اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، مبلغ شب هایی که نخواهد ماند پس داده می شود.'
    }
  }
]