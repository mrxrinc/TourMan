import { Navigation } from 'react-native-navigation'

import Explore from './modules/Explore'
import Profile from './modules/Profile'
import Messages from './modules/Messages'
import Favorites from './modules/Favorites'
import Trips from './modules/Trips'
import HomeItem from './modules/HomeItem'
import Host from './modules/Host'
import HomeDetails from './modules/HomeDetails'
import Amenities from './modules/Amenities'
import HomeGallery from './modules/HomeGallery'
import Reviews from './modules/Reviews'
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
import FeedBack from './modules/assets/FeedBack'
import About from './modules/About'
import ProfileDetails from './modules/ProfileDetails'
import ProfileDetailsEdit from './modules/ProfileDetailsEdit'

export function registerScreens(store, Provider) {
  Navigation.registerComponent('mrxrinc.Explore', () => Explore, store, Provider)
  Navigation.registerComponent('mrxrinc.Profile', () => Profile, store, Provider)
  Navigation.registerComponent('mrxrinc.Messages', () => Messages, store, Provider)
  Navigation.registerComponent('mrxrinc.Favorites', () => Favorites, store, Provider)
  Navigation.registerComponent('mrxrinc.Trips', () => Trips, store, Provider)
  Navigation.registerComponent('mrxrinc.HomeItem', () => HomeItem, store, Provider)
  Navigation.registerComponent('mrxrinc.Host', () => Host, store, Provider)
  Navigation.registerComponent('mrxrinc.HomeDetails', () => HomeDetails, store, Provider)
  Navigation.registerComponent('mrxrinc.Amenities', () => Amenities, store, Provider)
  Navigation.registerComponent('mrxrinc.HomeGallery', () => HomeGallery, store, Provider)
  Navigation.registerComponent('mrxrinc.Reviews', () => Reviews, store, Provider)
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
  Navigation.registerComponent('mrxrinc.FeedBack', () => FeedBack, store, Provider)
  Navigation.registerComponent('mrxrinc.About', () => About, store, Provider)
  Navigation.registerComponent('mrxrinc.ProfileDetails', () => ProfileDetails, store, Provider)
  Navigation.registerComponent('mrxrinc.ProfileDetailsEdit', () => ProfileDetailsEdit, store, Provider)
}
