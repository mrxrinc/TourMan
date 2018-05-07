import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import { registerScreens } from './screens'
import configureStore from './store/configureStore'

const store = configureStore()
registerScreens(store, Provider)

Navigation.startSingleScreenApp({
  screen: {
    screen: 'mrxrinc.Explore'
  },
  appStyle: {
    orientation: 'portrait',
    statusBarColor: 'rgba(0,0,0,0.7)',
    drawUnderStatusBar: true,
    statusBarTextColorScheme: 'light',
    navigationBarColor: '#000',
    screenBackgroundColor: '#fff',
  },
  animationType: 'fade'
})
