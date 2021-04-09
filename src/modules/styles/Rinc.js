/* eslint-disable */
import React, { Component } from 'react';
import {StyleSheet,Dimensions} from 'react-native';
// const window = Dimensions.get('window');

module.exports = StyleSheet.create({
  global:{
    flex: 1,
    alignItems: 'stretch'
  },
  full: { flex: 1 },
  wFull: { width: '100%' },
  hFull: { height: '100%' },
  stretchChild:{alignItems:'stretch'},
  white:{color:'#fff'},
  bgWhite:{backgroundColor:'#fff'},
  black:{color:'#000'},
  bgBlack:{backgroundColor:'#000'},
  light1:{color:'#f7f8fa'},
  bgLight1:{backgroundColor:'#f7f8fa'},
  light2:{color:'#eeeff1'},
  bgLight2:{backgroundColor:'#eeeff1'},
  light3:{color:'#e8ebef'},
  bgLight3:{backgroundColor:'#e8ebef'},
  light4:{color:'#e1e2e3'},
  bgLight4:{backgroundColor:'#e1e2e3'},
  grayLight:{color:'#acb9c6'},
  bgGrayLight:{backgroundColor:'#acb9c6'},
  grayMid:{color:'#697989'},
  bgGrayMid:{backgroundColor:'#697989'},
  grayDark:{color:'#515860'},
  bgGrayDark:{backgroundColor:'#515860'},
  green:{color:'#1fc523'},
  bgGreen:{backgroundColor:'#1fc523'},
  red:{color:'#E94F4F'},
  bgRed:{backgroundColor:'#E94F4F'},
  blue:{color:'#3471c2'},
  bgBlue:{backgroundColor:'#3471c2'},
  debug:{
    backgroundColor:'#f9d7e1'
  },
  row:{flexDirection: 'row'},
  rtl:{flexDirection: 'row-reverse'},
  wrap:{flexWrap: 'wrap'},
  font:{
    fontFamily: 'IRANSansMobile',
    fontSize: 11,
    textAlign: 'right'
  },
  bold:{
    fontFamily: 'IRANSansMobile_Bold',
    fontSize: 12,
    textAlign: 'right'
  },
  en:{
    fontFamily: 'Concord',
    fontSize: 12
  },
  enBold:{
    fontFamily: 'Concord_Bold',
    fontSize: 12
  },
  sub:{
    fontWeight: '100',
    fontSize: 10
  },
  topText:{
    textAlignVertical: 'top'
  },
  largeText:{fontSize: 16},
  bigText:{fontSize: 14},
  tinyText:{fontSize: 8},
	text12:{fontSize: 12},
	textOver:{textDecorationLine: 'line-through'},
	underLine:{textDecorationLine: 'underline'},
  rightText:{textAlign: 'right'},
  centerText:{textAlign: 'center'},
  leftText:{textAlign: 'left'},
  padd3:{padding: 3},
  padd5:{padding: 5},
  padd10:{padding:10},
  padd15:{padding:15},
  padd20:{padding:20},
  margin5:{margin:5},
  margin10:{margin:10},
  margin15:{margin:15},
  margin20:{margin:20},
  paddHoriz3:{paddingHorizontal:3},
  paddHoriz5:{paddingHorizontal:5},
  paddHoriz10:{paddingHorizontal:10},
  paddHoriz15:{paddingHorizontal:15},
  paddHoriz20:{paddingHorizontal:20},
  paddHoriz30:{paddingHorizontal:30},
  paddHoriz40:{paddingHorizontal:40},
  paddVertical5:{paddingVertical:5},
  paddVertical10:{paddingVertical:10},
  paddVertical15:{paddingVertical:15},
  paddVertical20:{paddingVertical:20},
  paddVertical30:{paddingVertical:30},
  paddVertical40:{paddingVertical:40},
  rightPadd3:{paddingRight: 3},
  rightPadd5:{paddingRight: 5},
  rightPadd10:{paddingRight: 10},
  rightPadd15:{paddingRight: 15},
  leftPadd5:{paddingLeft: 5},
  leftPadd15:{paddingLeft: 15},
  leftPadd20:{paddingLeft: 20},
  leftPadd30:{paddingLeft: 30},
  leftPadd40:{paddingLeft: 40},
  rightMargin5:{marginRight: 5},
  rightMargin10:{marginRight: 10},
  rightMargin15:{marginRight: 15},
  rightMargin20:{marginRight: 20},
  leftMargin3:{marginLeft: 3},
  leftMargin5:{marginLeft: 5},
  leftMargin10:{marginLeft: 10},
  leftMargin15:{marginLeft: 15},
  leftMargin20:{marginLeft: 20},
  topPadd3:{paddingTop: 3},
  topPadd5:{paddingTop: 5},
  topPadd10:{paddingTop: 10},
  topPadd15:{paddingTop: 15},
  topPadd20:{paddingTop: 20},
  topPadd25:{paddingTop: 25},
	top:{marginTop: 0},
	top3:{marginTop: 3},
	top5:{marginTop: 5},
	top8:{marginTop: 8},
	top10:{marginTop: 10},
	top15:{marginTop: 15},
	top20:{marginTop: 20},
	top30:{marginTop: 30},
	top40:{marginTop: 40},
	top50:{marginTop: 50},
	top60:{marginTop: 60},
	top70:{marginTop: 70},
	bottom5:{marginBottom: 5},
	bottom10:{marginBottom: 10},
	bottom20:{marginBottom: 20},
	bottom30:{marginBottom: 30},
  bottom40: { marginBottom: 40 },
  bottom50: { marginBottom: 50 },
  bottom70: { marginBottom: 70 },
	bottomPadd10:{paddingBottom: 10},
	bottomPadd20:{paddingBottom: 20},
	bottomPadd30:{paddingBottom: 30},
	bottomPadd40:{paddingBottom: 40},
	bottomPadd50:{paddingBottom: 50},
  center:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticalCenter:{justifyContent:'center'},
  vertical10:{marginVertical: 10},
  vertical20:{marginVertical: 20},
  vertical30:{marginVertical: 30},
  verticalPadd10:{paddingVertical: 10},
  verticalPadd20:{paddingVertical: 20},
  verticalPadd30:{paddingVertical: 30},
  horizCenter:{alignItems:'center'},
  selfCenter: { alignSelf: 'center' },
  spaceAround:{justifyContent: 'space-around'},
  spaceBetween:{justifyContent: 'space-between'},
  rightItems: {alignItems: 'flex-end'} ,
  leftItems: {alignItems: 'flex-start'},
  line:{
    height: 1,
    backgroundColor: '#adb9c7'
  },
  absolute:{position: 'absolute'},
  relative:{position: 'relative'},
  top:{top:0},
  left: {left: 0},
  bottom:{bottom: 0},
  right: {right: 0},
  image:{
    width: null, height: null,
    flex: 1, resizeMode: 'cover'
  },
	elevation:{elevation:1.5},
  overhide:{overflow: 'hidden'},
  flipX: {
    transform: [{scaleX:-1}]
  },
  round3: { borderRadius: 3 },
  round5: { borderRadius: 5 },
  round7: { borderRadius: 7 },
  round10: { borderRadius: 10 },
  round15: { borderRadius: 15 },
  round20: { borderRadius: 20 },
  zIndex0:{
    zIndex:0
  },
  zIndex1:{
    zIndex:1
  },
  zIndex2:{
    zIndex:2
  },
  zIndex3:{
    zIndex:3
  },
  zIndex4:{
    zIndex:4
  },
  zIndex5:{
    zIndex:5
  },
  zIndex10:{
    zIndex:10
  },
  map:{
    flex:1,
    position: 'relative',
    top:0, left:0, right:0, bottom:0,
  },
  modal: {
    width: '90%',
    minHeight: 50,
    borderRadius: 3,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingHorizontal: 30
  },
  radioBTN: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#f6f6f6',
    borderWidth: 2,
    borderColor: '#12a1a1',
  },
  radioBTNActive: {
    width: 15,
    height: 15,
    backgroundColor: '#02938e',
    borderRadius: 10,
  },
  notification: {
    minHeight: 100,
    paddingTop: 25,
  }

})











/**/
