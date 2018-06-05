/* eslint-disable */
import React, { Component } from 'react';
import {
  StyleSheet, Dimensions
} from 'react-native';
const window = Dimensions.get('window');

module.exports = StyleSheet.create({
  primary:{ color: '#008489' },
  bgPrimary:{backgroundColor:'#008489'},
  primaryLight:{color:'#16bfc5'},
  bgPrimaryLight:{backgroundColor:'#16bfc5'},
  primaryDark:{color:'#09686c'},
  bgPrimaryDark:{backgroundColor:'#09686c'},
  Accent:{color:'#ff5555'},
  bgAccent:{backgroundColor:'#ff5555'},
  round:{borderRadius: 3},
  bottomSafeSpace:{height: 40},
  tabBox:{
    width: '100%',
    height: 80,
    overflow: 'hidden',
    zIndex: 50
  },
  tabBoxCurve:{
    alignSelf: 'center',
    top: 65,
    zIndex: 0,
    transform: [{'scaleX':10}, {'scaleY':3}],
    textShadowColor: 'rgba(0,0,0,0.07)',
    textShadowOffset: {width: 0, height: -3},
    textShadowRadius: 10
  },
  tabIconContainer:{
    width: '100%',
    zIndex:1
  },
  tabItem:{
    width: 40,
    height:40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c3cdd7'
  },
  tabItemMain:{
    width: 50,
    height:50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#c3cdd7'
  },
  tabItemsMid:{
    top: 10
  },
  tabItemsAround:{
    top: 23
  },
  header:{
    width: '100%',
    height: 125
  },
  headBox:{
    height: 45,
    marginBottom: 15,
    paddingLeft: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3.5
  },
  headClose:{
    height: 25,
    width: 30,
    textAlign:'center',
    marginRight: 10,
    marginTop: -5,
  },
  loadingDot:{
    width: 8,
    height:8,
    borderRadius: 10,
    marginRight:5
  },
  // itemBig:{
  //   width: 180,
  //   flex:1,
  //   marginLeft: 15
  // },
  // itemBigImg:{
  //   height: 250,
  //   width:180,
  // },
  // popularItem:{
  //   width: 130,
  //   flex:1,
  //   marginLeft: 15
  // },
  // popularItemImg:{
  //   height: 130,
  //   width:130,
  // },
  heartWrapper:{
    width: 20,
    height:20,
    margin: 10
  },
  hmItem:{
    width: 250,
    flex:1,
    marginLeft: 15
  },
  hmItemImg:{
    height: 170,
    width:250,
  },
  hmItemPrice:{
    marginRight: 2,
    marginLeft: 5,
    top: -3
  },
  mapHmItem:{
    width: 200,
    flex:1,
    marginLeft: 15
  },
  mapHmItemImg:{
    height: 130,
    width:200,
  },
  hmItemBig:{
    flex: 1,
    height: 300,
    marginBottom: 20,
  },
  hmItemBigImg:{
    height: 230,
    width: '100%'- 30,
    resizeMode:'cover'
  },
  hmItemBigTitle:{
    height:25
  },
  hmItemBigTitleText:{
    paddingLeft:100
  },
  luxuryBadge: {
    backgroundColor: '#e9af00',
    borderRadius: 15,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 10,
    height: 15,
    marginRight: 15,
    top: 1,
    paddingHorizontal: 10
  },
  featuredDest:{
    width: 130,
    flex:1,
    marginLeft: 15
  },
  featuredDestImg:{
    height: 200,
    width:130,
  },
  navBar:{
    height: 75,
    width: '100%',
    marginBottom: 15,
    borderBottomColor: '#cfcfcf',
    paddingTop: 25,
    position: 'absolute',
    zIndex: 10
  },
  navBarBtn:{
    width: 50,
  },
  navBarBtnIcon:{
    width: 25,
    textAlign: 'center'
  },
  navBarGradient:{
    width: '100%',
    height: 75,
    position: 'absolute'
  },
  homeItemHeader:{
    position: 'absolute',
    top:0,
    right: 0,
    left: 0,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  pagerNav:{
    height: 20,
    paddingHorizontal: 30,
    justifyContent: 'space-between'
  },
  pagerNavDot:{
    width: 5,
    height: 5,
    marginHorizontal: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5
  },
  homeItemFooter:{
    height: 80,
    borderTopWidth: 1,
    borderTopColor: '#cfcfcf',
    paddingHorizontal: 18,
  },
  checkAccessBtn:{
    width: 180,
    height: 45,
    borderRadius: 3,
  },
  profileThumb:{
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#bababa'
  },
  thumbBadge:{
    width: 27,
    height: 27,
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor: '#d2d2d2',
    borderRadius: 20,
    right:2,
    bottom: 2,
  },
  line:{
    height: 1,
    backgroundColor: '#eaeff1',
    marginVertical: 8
  },
  homeItemMap:{
    height:200,
  },
  reviewAvatar:{
    width: 50,
    height:50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#c4c4c4'
  },
  reportFooter:{
    height: 90,
    borderTopWidth: 1,
    borderColor: '#d7d7d7'
  },
  increaseDecrease: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#008489',
  },
  switcherWrap: {
    width: 43,
    height: 28,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#008489',
    backgroundColor: '#fff'
  },
  switcherHandle: {
    width: 28,
    height: 28,
    backgroundColor: '#fff',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#008489',
    top: -1,
    transform: [{ translateX: 14 }]
  },
  weekHead: {
    width: (window.width - 20) / 7,
    textAlign: 'center',
  },
  dayItemBox: {
    width: (window.width - 21) / 7,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dayItem: {
    width: 40,
    height: 50,
    fontFamily: 'IRANSansMobile',
    fontSize: 19,
    borderRadius: 50,
    borderWidth: 0,
    borderColor: '#c6c6c6',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 5,
  },
  dayStart: {
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  dayEnd: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
  singleDaySelected: {
    borderRadius: 40
  },
  offDay: {
    textDecorationLine: 'line-through',
    opacity: 0.3
  },
  mapFilter: {
    width: 130,
    height: 30,
    borderRadius: 20,
    alignSelf: 'center',
    bottom: 100,
    borderColor: '#c4c4c4',
    borderWidth: 0.5,
  },
  mapList: {
    height: 190,
    borderTopColor: '#e3e3e3',
    borderTopWidth: 1,
  },
  mapListFocus: {
    height: 3,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    zIndex: 2
  },
  myMarker: {
    borderColor: '#90999f',
    borderRadius: 3,
    paddingHorizontal: 3,
    zIndex: 2,
  },
  myMarkerText: {
    fontFamily: 'IRANSansMobile_Bold',
    fontSize: 11,
    height: 17,
    paddingRight: 2
  },
  myMarkerArrow: {
    width: 5,
    height: 5,
    transform: [{rotate: '45deg'}],
    bottom: 2,
    zIndex:0,
    alignSelf: 'center'
  },
  regClose: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: 'hidden'
  },
  regLogo: {
    width: 200,
    height: 100,
  },
  registerBTN: {
    width: '85%',
    height: 50,
    borderRadius: 30,
    borderColor: '#B2E1E1',
    borderWidth: 2
  },
  loginBTN: {
    width: 60,
    height: 60,
    borderRadius: 60,
    overflow: 'hidden',
    bottom: 30,
    left: 30,
  },
  datePicker: {
    borderWidth: 0,
    borderRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#96E8E8',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    height: 50,
    marginTop: 70
  },
  datePickerText: {
    fontFamily: 'IRANSansMobile_Bold',
    color: '#fff',
    fontSize: 18
  },
  tripsLogoWrap: {
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: '#00A596'
  },
  tripsLogo: {
    width: 100,
    height: 100,
  },
  tripsBtnWrap: {
    width: 150,
    height: 45,
  },
  tripsBTN: {
    width: 140,
    height: 35,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#00A596',
  },
  tripsLine: {
    width: 2,
    height: '70%',
    marginTop: 166,
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: '#e8e8e8',
    zIndex: -1
  },
  movingIcon: {
    marginBottom: 80,
    width: 60,
    textAlign: 'center'
  },
  messageItem: {
    minHeight: 80,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  messagingImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8
  },
  messagingBTN: {
    width: 160,
    height: 45,
    borderRadius: 3,
  },
  messagingWhiteBox: {
    margin: 20,
    position: 'absolute',
    bottom: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.95)'
  },
  profileBox: {
    height: 230,
    marginTop: 25
  },
  profileThumb2: {
    width: 120,
    height: 120,
    borderRadius: 80,
    borderWidth: 6,
    borderColor: 'rgba(241, 241, 241, 0.3)'
  },
  feedbackBox: {
    height: 170,
    borderWidth: 1,
    fontFamily: 'IRANSansMobile',
    textAlignVertical: 'top'
  },
  profileBoxOutline: {
    borderColor: '#e7e7e7',
    borderWidth: 0.5,
  },
  birthdayEdit: {
    borderWidth: 0,
    minWidth: 85,
    marginLeft: 0
  },
  birthdayEditText: {
    fontSize: 14,
    fontFamily: 'IRANSansMobile'
  },
  provincesModal: {
    width: '90%',
    maxHeight: '95%',
    borderRadius: 3,
    alignSelf: 'center',
    overflow: 'hidden'
  },
  filtersActiveDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    position: 'absolute',
    top: -1,
    left: 8,
    zIndex: 2,
  },
  listingThumb: {
    width: 90,
    height: 70,
    borderRadius: 3
  },
  beginHostingBTN: {
    width: 150,
    height: 40,
    borderRadius: 25,
    alignSelf: 'flex-end',
    backgroundColor: '#00a699'
  },
  hostingStepsNextBTN: {
    height: 50,
    left: 20,
    bottom: 20
  },
  hostingMarker: {
    borderColor: '#fff',
    borderRadius: 3,
    backgroundColor: '#08a299',
    borderWidth: 0.5,
    width: 40,
    height: 30
  },
  hostingMarkerArrow: {
    width: 10,
    height: 10,
    transform: [{ rotate: '45deg' }],
    bottom: 5,
    zIndex: 0,
    alignSelf: 'center'
  },
  hostingSelectProvince: { 
    minWidth: 180,
    height: 40,
    borderRadius: 10,
    borderColor: '#e0e0e0', 
    borderWidth: 0.5 
  },
  hostingImagesWrap: {
    padding: 10,
    alignItems: 'center',
    minHeight: '60%'
  },
  hostingImages: {
    minWidth: '49%',
    height: 140,
    borderRadius: 5,
    margin: 2,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  hostingImageDelete: {
    top: 0,
    left:0,
    padding: 5,
    borderRadius: 3,
    width: 40,
  },
  hostingAboutInputs: {
    height: 150,
    fontFamily: 'IRANSansMobile',
    textAlignVertical: 'top',
    textAlign: 'right',
    paddingHorizontal: 10,
  },
  reserveMBox: {
    height: 120
  }






})












/**/
