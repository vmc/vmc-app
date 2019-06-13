import '../Config'
import '../../shim.js'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import firebase from 'react-native-firebase'
import { Sentry } from 'react-native-sentry'
Sentry.config('https://d453a881fdaa4ed0a48f73daf0978cd2@sentry.io/1480318').install()

firebase.messaging().getToken()
.then(fcmToken => {
  if (fcmToken) {
    console.log(fcmToken)
  } else {
    console.log('no token')
  }
})

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js
 * and index.android.js call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
