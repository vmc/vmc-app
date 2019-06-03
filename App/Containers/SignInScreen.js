/* global alert */
import React from 'react'
import { View, AsyncStorage, TextInput, Image } from 'react-native'
import styles from './Styles/SignInScreenStyle'
import Images from '../Themes/Images'
import * as Keychain from 'react-native-keychain'
import { connect } from 'react-redux'
import KeyActions from '../Redux/KeyRedux'
import BalanceActions from '../Redux/BalanceRedux'
import Button from '../Components/Button'

const secp256k1 = require('secp256k1')

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor (props) {
    super(props)
    this.state = {
      privateKey: '',
      publicKey: ''
    }
  }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
        <Image source={Images.logo_black} style={{height: 100, width: 120}} />
        <TextInput
          underlineColorAndroid='transparent'
          style={styles.inputKey}
          placeholder='Your private key'
          value={this.state.privateKey}
          onChangeText={text => this.setState({ privateKey: text })}
          autoCapitalize='none'
          />
        <Button icon='account-circle' text='Log in' onPress={this._signInAsync} />
        <Button icon='person-add' text='Create account' onPress={() => this.props.navigation.navigate('CreateAccount')} />
      </View>
    )
  }

  _signInAsync = async () => {
    try {
      if (
        secp256k1.privateKeyVerify(Buffer.from(this.state.privateKey, 'hex'))
      ) {
        await Keychain.setGenericPassword('privateKey', this.state.privateKey)
        const publicKey = secp256k1
          .publicKeyCreate(Buffer.from(this.state.privateKey, 'hex'))
          .toString('hex')
        await AsyncStorage.setItem('publicKey', publicKey)
        this.props.login(publicKey)
        this.props.updateBalance(publicKey)
        this.props.navigation.navigate('App')
      } else {
        alert('Please enter a valid private key')
      }
    } catch (e) {
      alert(e)
    }
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBalance: (publicKey) => dispatch(BalanceActions.updateBalance(publicKey)),
    login: (publicKey) => dispatch(KeyActions.login(publicKey))
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
