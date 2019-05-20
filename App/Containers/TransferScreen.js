import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, Keyboard, Alert } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Button from '../Components/Button'
import * as Keychain from "react-native-keychain"; 
const secp256k1 = require("secp256k1");
// Styles
import styles from './Styles/TransferScreenStyle'
import createTransfer from '../Transforms/createTransfer';

class TransferScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Transfer',
    drawerIcon: ({tintColor}) => (
      <Icon name="swap-horiz" size={20} color={tintColor} />
    ),
  };

  constructor(props) {
      super(props)
      this.state = {
          publicKeyTo: "",
          amountTo: "",
          amount: "100000",
          privateKey: "",
          transferObject: {}
      }
  }

  componentWillMount() {
    this.getPrivateKey();
  }

  getPrivateKey = async () => {
    let credentials = false;
    try {
      // Retreive the credentials
      credentials = await Keychain.getGenericPassword();
      if (credentials) {
        this.setState({ privateKey: credentials.password });
      } else {
        alert("Could not retrieve private key!");
      }
    } catch (error) {
      alert("Keychain couldn't be accessed!", error);
    }
  };


  transferTokens = (amount, publicKeyTo) => {
    try {
      if (amount > Number(this.state.amount)) {
        alert("You do not have enough tokens to do that transfer.");
      } else if (
        (amount > 0) &
        !isNaN(amount) &
        (Math.round(+amount) === +amount) &
        (publicKeyTo.trim() !== "") &
        secp256k1.publicKeyVerify(Buffer.from(publicKeyTo, "hex"))
      ) {
        amount = parseInt(amount);
        Alert.alert(
          "You are about to transfer tokens",
          `Are you sure you want to transfer ${amount} tokens to ${publicKeyTo}?`,
          [
            {
              text: "Cancel",
              onPress: () => {
                return;
              },
              style: "cancel"
            },
            {
              text: "OK",
              onPress: () => {
                  this.setState({transferObject: createTransfer(this.state.privateKey, amount, publicKeyTo)})
              }
            }
          ],
          { cancelable: true }
        );
      } else {
        alert("Please enter a valid amount and public key to transfer to!!");
      }
    } catch (e) {
      alert(e);
    }
  };


  render () {
    return (
        <View>
            <Header {...this.props} />
            <ScrollView style={styles.container}>
                <Text>Balance: {this.state.amount}</Text>
                <View style={styles.publicKeyTo}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.inputField}
                        placeholder="Public key"
                        onChangeText={text => this.setState({ publicKeyTo: text })}
                        value={this.state.publicKeyTo}
                        autoCapitalize={"none"}
                    />
                </View>
                <View style={styles.amountTo}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.inputField}
                        keyboardType="numeric"
                        placeholder="Amount of tokens"
                        onChangeText={text => this.setState({ amountTo: text })}
                        value={this.state.amountTo}
                        onSubmit={Keyboard.dismiss}
                        returnKeyType="done"
                    />
                    <Text style={styles.amountToText}>tokens</Text>
                </View>
                <Button 
                    text="Transfer" 
                    onPress={() => this.transferTokens(this.state.amountTo, this.state.publicKeyTo)}
                />
                <Text>{JSON.stringify(this.state.transferObject)}</Text>
            </ScrollView>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    publicKey: state.key.publicKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferScreen)
