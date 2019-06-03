import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage, Image, Alert } from 'react-native'
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

  _signOutAsyncConfirm = () => {
    Alert.alert(
      'Warning!',
      'You are about to log out and remove all your data. Are you sure you want to do this?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {text: 'Yes', onPress: () => this._signOutAsync()}
      ],
      {cancelable: false}
    )
  }

  _signOutAsync = async () => {
    this.props.reset()
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  };

  render () {
    return (
      <View>
        <Header {...this.props} />
        <ScrollView style={styles.container}>
          <Button icon='exit-to-app' text='SIGN OUT' onPress={this._signOutAsyncConfirm} />
          <Button icon='refresh' text='Balance update' onPress={() => this.props.updateBalance(this.props.publicKey)} />
          <Button icon='euro-symbol' text='Balance top up' onPress={() => this.props.topUp(this.props.publicKey, 10)} />
          <Image style={{height: 200}} source={{uri: `data:image/gif;base64,${this.props.base64}`}} />
          <Text>Public key: {this.props.publicKey}</Text>
          <Text>Balance: {JSON.stringify(this.props.balance)}</Text>
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
    updateBalance: (publicKey) => dispatch(BalanceActions.updateBalance(publicKey)),
    reset: () => dispatch({ type: 'RESET_STORE' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
