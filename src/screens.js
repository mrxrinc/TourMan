import { Navigation } from 'react-native-navigation'

import Splash from './modules/Splash'
import Explore from './modules/Explore'
import Profile from './modules/Profile'
import Messages from './modules/Messages'
import Favorites from './modules/Favorites'
import Trips from './modules/Trips'
import Search from './modules/Search'
import HomeItem from './modules/HomeItem'
import Host from './modules/Host'
import HomeDetails from './modules/HomeDetails'
import Amenities from './modules/Amenities'
import HomeGallery from './modules/HomeGallery'
import HomeRules from './modules/HomeRules'
import Cancelation from './modules/Cancelation'
import ReportUser from './modules/ReportUser'
import Where from './modules/Where'
import When from './modules/When'
import HowMany from './modules/HowMany'
import Filters from './modules/Filters'
import Map from './modules/Map'
import Registration from './modules/Registration'
import Privacy from './modules/Privacy'
import Help from './modules/Help'
import About from './modules/About'
import ProfileDetails from './modules/ProfileDetails'
import ProfileDetailsEdit from './modules/ProfileDetailsEdit'
import FeedBack from './modules/FeedBack'
import Notification from './modules/assets/Notification'
import Reviews from './modules/Reviews'
import ReviewSend from './modules/ReviewSend'

import Listings from './modules/hosting/Listings'
import BeginHosting from './modules/hosting/BeginHosting'
import HostingHomeTypes from './modules/hosting/firstSteps/1_HomeTypes'
import HostingCapacity from './modules/hosting/firstSteps/2_Capacity'
import HostingRooms from './modules/hosting/firstSteps/3_Rooms'
import HostingAmenities from './modules/hosting/firstSteps/4_Amenities'
import HostingLocation from './modules/hosting/firstSteps/5_Location'
import HostingPhoto from './modules/hosting/secondSteps/1_Photo'
import HostingAbout from './modules/hosting/secondSteps/2_About'
import HostingTitle from './modules/hosting/secondSteps/3_Title'
import HostingHomeRules from './modules/hosting/thirdSteps/1_HomeRules'
import HostingReservation from './modules/hosting/thirdSteps/2_Reservation'
import HostingPrice from './modules/hosting/thirdSteps/3_Price'
import HostingCancelation from './modules/hosting/thirdSteps/4_Cancelation'

export function registerScreens(store, Provider) {
  Navigation.registerComponent('mrxrinc.Splash', () => Splash, store, Provider)
  Navigation.registerComponent('mrxrinc.Explore', () => Explore, store, Provider)
  Navigation.registerComponent('mrxrinc.Profile', () => Profile, store, Provider)
  Navigation.registerComponent('mrxrinc.Messages', () => Messages, store, Provider)
  Navigation.registerComponent('mrxrinc.Favorites', () => Favorites, store, Provider)
  Navigation.registerComponent('mrxrinc.Trips', () => Trips, store, Provider)
  Navigation.registerComponent('mrxrinc.Search', () => Search, store, Provider)
  Navigation.registerComponent('mrxrinc.HomeItem', () => HomeItem, store, Provider)
  Navigation.registerComponent('mrxrinc.Host', () => Host, store, Provider)
  Navigation.registerComponent('mrxrinc.HomeDetails', () => HomeDetails, store, Provider)
  Navigation.registerComponent('mrxrinc.Amenities', () => Amenities, store, Provider)
  Navigation.registerComponent('mrxrinc.HomeGallery', () => HomeGallery, store, Provider)
  Navigation.registerComponent('mrxrinc.HomeRules', () => HomeRules, store, Provider)
  Navigation.registerComponent('mrxrinc.Cancelation', () => Cancelation, store, Provider)
  Navigation.registerComponent('mrxrinc.ReportUser', () => ReportUser, store, Provider)
  Navigation.registerComponent('mrxrinc.Where', () => Where, store, Provider)
  Navigation.registerComponent('mrxrinc.When', () => When, store, Provider)
  Navigation.registerComponent('mrxrinc.HowMany', () => HowMany, store, Provider)
  Navigation.registerComponent('mrxrinc.Filters', () => Filters, store, Provider)
  Navigation.registerComponent('mrxrinc.Map', () => Map, store, Provider)
  Navigation.registerComponent('mrxrinc.Registration', () => Registration, store, Provider)
  Navigation.registerComponent('mrxrinc.Privacy', () => Privacy, store, Provider)
  Navigation.registerComponent('mrxrinc.Help', () => Help, store, Provider)
  Navigation.registerComponent('mrxrinc.About', () => About, store, Provider)
  Navigation.registerComponent('mrxrinc.ProfileDetails', () => ProfileDetails, store, Provider)
  Navigation.registerComponent('mrxrinc.ProfileDetailsEdit', () => ProfileDetailsEdit, store, Provider)
  Navigation.registerComponent('mrxrinc.FeedBack', () => FeedBack, store, Provider)
  Navigation.registerComponent('mrxrinc.Notification', () => Notification, store, Provider)
  Navigation.registerComponent('mrxrinc.Reviews', () => Reviews, store, Provider)
  Navigation.registerComponent('mrxrinc.ReviewSend', () => ReviewSend, store, Provider)
  Navigation.registerComponent('mrxrinc.Listings', () => Listings, store, Provider)
  Navigation.registerComponent('mrxrinc.BeginHosting', () => BeginHosting, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingHomeTypes', () => HostingHomeTypes, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingCapacity', () => HostingCapacity, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingRooms', () => HostingRooms, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingAmenities', () => HostingAmenities, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingLocation', () => HostingLocation, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingPhoto', () => HostingPhoto, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingAbout', () => HostingAbout, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingTitle', () => HostingTitle, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingHomeRules', () => HostingHomeRules, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingReservation', () => HostingReservation, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingPrice', () => HostingPrice, store, Provider)
  Navigation.registerComponent('mrxrinc.HostingCancelation', () => HostingCancelation, store, Provider) 
}
