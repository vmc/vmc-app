import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import Header from '../Components/Header'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Button from '../Components/Button'

// Styles
import styles from './Styles/TransferScreenStyle'

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
          amountTo: ""
      }
  }

  render () {
    return (
        <View>
            <Header {...this.props} />
            <ScrollView style={styles.container}>
                <Text>Public key: {this.props.publicKey}</Text>
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
                <Button text="Transfer" onPress={() => alert('hi')}/>
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
