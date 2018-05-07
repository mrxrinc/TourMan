import React, {Component} from 'react';
import { Animated, View } from 'react-native';
import r from '../styles/Rinc';
import g from '../styles/General';

const LoadColor = '#6b8eaa';
export default class Splash extends Component{
  constructor(props){
    super(props)
    this.state={
      opec01: new Animated.Value(0.1),
      opec02: new Animated.Value(0.1),
      opec03: new Animated.Value(0.1),
      scale01: new Animated.Value(1),
      scale02: new Animated.Value(1),
      scale03: new Animated.Value(1)
    }
  }
  componentDidMount(){
    this.animate()
    setInterval(()=> this.animate(), 1800)
  }

  animate(){
    Animated.sequence([
      Animated.timing(
        this.state.opec01,
        {toValue: 1, duration: 200, useNativeDriver: true},
      ),
      Animated.timing(
        this.state.opec02,
        {toValue: 1, duration: 200, useNativeDriver: true},
      ),
      Animated.timing(
        this.state.opec03,
        {toValue: 1, duration: 200, useNativeDriver: true},
      )
    ]).start()
    setTimeout(()=>{
      Animated.sequence([
        Animated.timing(
          this.state.opec01,
          {toValue: 0.1, duration: 200, useNativeDriver: true}
        ),
        Animated.timing(
          this.state.opec02,
          {toValue: 0.1, duration: 200, useNativeDriver: true}
        ),
        Animated.timing(
          this.state.opec03,
          {toValue: 0.1, duration: 200, useNativeDriver: true}
        )
      ]).start()
    }, 900)
  }

  render(){
    return(
      <View style={[r.full,r.center,]}>
        <View style={[r.row]}>
          <Animated.View
            style={[g.bgPrimary,g.loadingDot,
              {opacity: this.state.opec01,
                transform: [{scale: this.state.scale01}]}]}>
          </Animated.View>
          <Animated.View
            style={[g.bgPrimary,g.loadingDot,
              {opacity: this.state.opec02,
                transform: [{scale: this.state.scale02}]}]}>
          </Animated.View>
          <Animated.View
            style={[g.bgPrimary,g.loadingDot,
              {opacity: this.state.opec03,
                transform: [{scale: this.state.scale03}]}]}>
          </Animated.View>
        </View>
      </View>
    )
  }
}
