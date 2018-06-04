import React, { Component } from 'react'
import {
  View,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import r from '../../styles/Rinc'
import g from '../../styles/General'
import { Fa, FaBold, FaMulti } from '../../assets/Font'
import { addHome, addHomeStepsFunc } from '../../../actions/generalActions'
import { BTN, NavBar, SwitchRow } from '../HostAssets'

class HostingCancelation extends Component {
  static navigatorStyle = {
    navBarHidden: true
  }
  state = {
    cancelation: 3
  }

  componentWillMount() {
    if (this.props.addHomeState.cancelation) {
      const cancelation = this.props.addHomeState.cancelation
      this.setState({ cancelation })
    }
  }

  nextPage = () => {
    const payload = {
      cancelation: this.state.cancelation     
    }
    this.props.addHomeStepsFunc(4)
    this.props.addHome(payload, 'cancelation')
    this.props.navigator.dismissModal()
  }

  render() {
    return (
      <View style={[r.full, r.bgWhite]}>
        <NavBar 
          saveAndExit={() => {
            this.nextPage()
            this.props.navigator.dismissModal()
          }}
          back={() => this.props.navigator.pop()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[r.padd20]}>
            <FaBold size={20} style={[r.grayDark, r.bottom20]}>
              شرایط لغو رزرو چگونه خواهد بود؟
            </FaBold>
            
            <SwitchRow 
              state={this.state.cancelation === 3}
              title={'انعطاف پذیر'}
              onPress={() => this.setState({ cancelation: 3 })}  
            />
            <View style={g.line} />

            <SwitchRow
              state={this.state.cancelation === 2}
              title={'متعادل'}
              onPress={() => this.setState({ cancelation: 2 })}  
            />
            <View style={g.line} />

            <SwitchRow
              state={this.state.cancelation === 1}
              title={'سختگیرانه'}
              onPress={() => this.setState({ cancelation: 1 })}  
            />
            <View style={g.line} />

            <View style={[r.top20, r.bottom50]}>
              {this.state.cancelation === 3 && (
                <FaMulti size={10} style={[g.primary]}>
                  برای دریافت کل مبلغ پرداختی، باید حداقل یک روز قبل از موعد مقرر درخواست لغو کنند . برای مثال اگر برای روز جمعه رزرو کرده باشند تا روز پنج شنبه می توانند درخواست لغو بدهند و کل مبلغ را دریافت کنند.
                  اگر مهمان در کمتر از 24 ساعت به موعد رزرو درخواست لغو کند، مبلغ روز اول پس داده نخواهد شد.
                  اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، مبلغ شب هایی که نخواهد ماند پس داده می شود.
                  
                </FaMulti>
              )}
              {this.state.cancelation === 2 && (
                <FaMulti size={10} style={[r.grayMid]}>
                  برای دریافت کل مبلغ پرداختی، باید حداقل پنج روز قبل از موعد مقرر درخواست لغو کنند . برای مثال اگر برای روز جمعه رزرو کرده باشند تا روز یکشنبه می توانند درخواست لغو بدهند و کل مبلغ را دریافت کنند.
                  اگر مهمان در کمتر از پنج روز درخواست لغو کند، مبلغ شب اول پرداخت نشده و 50% مبلغ باقی شبها پرداخت می شود.
                  اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، 50% مبلغ شب هایی که نخواهد ماند پس داده می شود.
                </FaMulti>
              )}
              {this.state.cancelation === 1 && (
                <FaMulti size={10} style={[g.Accent]}>
                  اگر مهمان تا یک هفته مانده به موعد در خواست لغو کند، 50% مبلغ کل پرداخت می شود در غیر این صورت هیچ مبلغی پس داده نخواهد شد. برای مثال اگر برای روز جمعه رزرو کرده باشد تا روز جمعه هفته قبل می تواند درخواست لغو بدهد و 50% مبلغ خود را دریافت کند. 
                  اگر مهمان تا یک هفته مانده به موعد در خواست لغو کند، هیچ مبلغی پس داده نخواهد شد. 
                  اگر مهمان تصمیم بگیرد که زودتر از موعد اتمام دوره رزرو ، خانه را ترک کند، هیچ مبلغی پس داده نخواهد شد.
                </FaMulti>
              )}
            </View>
          
          </View>
        </ScrollView>

        <View style={[r.absolute, r.right, r.bottom, r.zIndex2, r.padd15]}>
          <Fa size={16} style={[r.grayLight]}>4/4</Fa>
        </View>

        <BTN
          active
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
    addHome: (data, section) => dispatch(addHome(data, section)),
    addHomeStepsFunc: (data) => dispatch(addHomeStepsFunc(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HostingCancelation)
