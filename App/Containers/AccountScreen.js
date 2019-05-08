import React, { Component } from 'react'
import { ScrollView, Text, Button, AsyncStorage, Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styles
import styles from './Styles/AccountScreenStyle'

class AccountScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Account',
    drawerIcon: ({tintColor}) => (
      <Icon name="account-circle" size={20} color={tintColor} />
    ),
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <Header {...this.props} />
        <Button title="SIGN OUT" onPress={this._signOutAsync} />
        <Image style={{height: 200}} source={{uri: `data:image/gif;base64,${this.props.base64}`}} />
        <Text>Public key: {this.props.publicKey}</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    base64: state.image.base64,
    publicKey: state.key.publicKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
