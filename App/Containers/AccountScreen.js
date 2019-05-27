import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage, Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Button from '../Components/Button'
import BalanceActions from '../Redux/BalanceRedux'
// Styles
import styles from './Styles/AccountScreenStyle'

class AccountScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Account',
    drawerIcon: ({tintColor}) => (
      <Icon name='account-circle' size={20} color={tintColor} />
    )
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  };

  render () {
    return (
      <View>
        <Header {...this.props} />
        <ScrollView style={styles.container}>
          <Button text='SIGN OUT' onPress={this._signOutAsync} />
          <Button text='Balance update' onPress={() => this.props.updateBalance(this.props.publicKey)} />
          <Button text='Balance top up' onPress={() => this.props.topUp(this.props.publicKey, 10)} />
          <Image style={{height: 200}} source={{uri: `data:image/gif;base64,${this.props.base64}`}} />
          <Text>Public key: {this.props.publicKey}</Text>
          <Text>Balance: {this.props.balance}</Text>
          <Text>Error: {JSON.stringify(this.props.error)}</Text>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    base64: state.image.base64,
    publicKey: state.key.publicKey,
    balance: state.balance.balance,
    error: state.balance.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    topUp: (publicKey, amount) => dispatch(BalanceActions.topUpBalance(publicKey, amount)),
    updateBalance: (publicKey) => dispatch(BalanceActions.updateBalance(publicKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
