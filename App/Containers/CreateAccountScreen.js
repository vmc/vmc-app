import React from 'react'
import {
  AsyncStorage,
  View,
  Image,
  Text,
  TouchableOpacity,
  Clipboard
} from 'react-native'
import * as Keychain from 'react-native-keychain'
import { CheckBox } from 'react-native-elements'
import Images from '../Themes/Images'
import styles from './Styles/CreateAccountScreenStyle'
import { connect } from 'react-redux'
import KeyActions from '../Redux/KeyRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'

const crypto = require('crypto')
const secp256k1 = require('secp256k1')

class CreateAccountScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked1: false,
      checked2: false,
      checked3: false,
      privateKey: ''
    }
  }

  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
      backgroundColor: 'white'
    },
    headerTintColor: '#11012f'
  }

  componentWillMount () {
    let privateKey
    do {
      privateKey = crypto.randomBytes(32)
    } while (!secp256k1.privateKeyVerify(privateKey))
    this.setState({ privateKey: privateKey.toString('hex') })
  }

  render () {
    return (
      <View style={styles.container}>
        <Image
          source={Images.logo_black}
          style={{ top: 0, position: 'absolute', width: 120, height: 100 }}
        />
        <View
          style={{
            marginTop: 100,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10
          }}
        >
          <Text style={{ color: 'black' }}>YOUR PRIVATE KEY:</Text>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
            {this.state.privateKey}
          </Text>
          <TouchableOpacity
            onPress={() => this.saveToClip()}
            style={{ marginTop: 10 }}
          >
            <Icon name='content-copy' size={25} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <CheckBox
            title='Never share your private key!                                                '
            checked={this.state.checked1}
            onPress={() => this.setState({ checked1: !this.state.checked1 })}
          />
          <CheckBox
            title='Copy your private key and make a backup somewhere safe or make a screenshot!'
            checked={this.state.checked2}
            onPress={() => this.setState({ checked2: !this.state.checked2 })}
          />
          <CheckBox
            title='The private key is your personal login info! Losing this will result in losing your account! '
            checked={this.state.checked3}
            onPress={() => this.setState({ checked3: !this.state.checked3 })}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={
            !(this.state.checked1 && this.state.checked2 && this.state.checked3)
          }
          onPress={() => this._signInAsync()}
        >
          <Text
            style={{
              fontWeight: 'bold',
              color: !(
                this.state.checked1 &&
                this.state.checked2 &&
                this.state.checked3
              )
                ? 'grey'
                : 'white'
            }}
          >
            I UNDERSTAND
          </Text>
        </TouchableOpacity>
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
        this.props.navigation.navigate('App')
      } else {
        alert('Please enter a valid private key')
      }
    } catch (e) {
      alert(e)
    }
  };

  saveToClip = async () => {
    await Clipboard.setString(this.state.privateKey)
    alert('Copied to clipboard!')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (publicKey) => dispatch(KeyActions.login(publicKey))
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountScreen)
