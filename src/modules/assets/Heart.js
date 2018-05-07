import React, { Component } from 'react'
import {View} from 'react-native'
import r from '../styles/Rinc'
import g from '../styles/General'
import lineConfig from './line_font_config.json'
import { createIconSetFromFontello } from 'react-native-vector-icons'
const LineIcon = createIconSetFromFontello(lineConfig)
import * as Animatable from 'react-native-animatable'

export class HeartEmpty extends Component{
  render(){
    return(
      <Animatable.View animation={'zoomOut'} duration={100}
        easing={'ease-in-back'} direction={'reverse'}>
        <LineIcon
          name={'heart-o'}
          size={15}
          color={'rgba(255,255,255,0.6)'}
        />
      </Animatable.View>
    )
  }
}

export class HeartFull extends Component{
  render(){
    return(
      <Animatable.View animation={'zoomIn'} duration={200}
        easing={'ease-out-back'}>
        <LineIcon
          name={'heart'}
          size={18}
          style={[r.red]}
        />
        <LineIcon
          name={'heart-o'}
          size={20}
          color={'rgba(255,255,255,0.7)'}
          style={[r.absolute, {top:-1, left:-1}]}
        />
      </Animatable.View>
    )
  }
}
