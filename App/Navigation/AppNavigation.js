import React from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { createDrawerNavigator, createAppContainer, createSwitchNavigator, createStackNavigator, DrawerItems } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import LaunchScreen from '../Containers/LaunchScreen'
import AuthLoadingScreen from '../Containers/AuthLoadingScreen'
import SignInScreen from '../Containers/SignInScreen'
import CreateAccountScreen from '../Containers/CreateAccountScreen'
import AccountScreen from '../Containers/AccountScreen'
import CameraScreen from '../Containers/CameraScreen'
import TicketScreen from '../Containers/TicketScreen'
// import TransferScreen from '../Containers/TransferScreen'
import Images from '../Themes/Images'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createDrawerNavigator({
  LaunchScreen: {
    screen: createStackNavigator({
      LaunchScreen: LaunchScreen,
      CameraScreen: CameraScreen
    }, {
      initialRouteName: 'LaunchScreen',
      headerMode: 'none'
    }),
    navigationOptions: {
      drawerLabel: 'Buy a ticket',
      drawerIcon: ({tintColor}) => (
        <Icon name='local-activity' size={20} color={tintColor} />
      )
    }
  },
  AccountScreen: {screen: AccountScreen},
  TicketScreen: {screen: TicketScreen}
  /* TransferScreen: {screen: TransferScreen} */
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  },
  contentOptions: {
    activeTintColor: '#005493'
  },
  contentComponent: props =>
    <View style={styles.drawer}>
      <View>
        <View style={styles.drawerHeader}>
          <Image resizeMode={'contain'} source={Images.logo_black} style={{height: 25, width: 30}} />
          <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => props.navigation.closeDrawer()}>
            <Icon name='clear' size={25} color='#005493' />
          </TouchableOpacity>
        </View>
        <DrawerItems {...props} />
      </View>
      <View style={styles.drawerFooter}>
        <Image style={{width: 280}} source={Images.menu_footer} />
      </View>
    </View>
})

const AuthStack = createStackNavigator({ SignIn: SignInScreen, CreateAccount: CreateAccountScreen })

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: PrimaryNav,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
))
