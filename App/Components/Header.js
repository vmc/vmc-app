import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './Styles/HeaderStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Images from '../Themes/Images'

export default class Header extends Component {
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
          <Icon name='menu' size={30} color='white' />
        </TouchableOpacity>
        <Image source={Images.logo_white} style={{height: 25, width: 30}} />
        <View style={styles.rightView} />
      </View>
    )
  }
}
