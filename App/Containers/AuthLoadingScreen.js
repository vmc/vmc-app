import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  View,
} from 'react-native';
import { connect } from 'react-redux'
import KeyActions from '../Redux/KeyRedux'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const publicKey = await AsyncStorage.getItem('publicKey');
    
    // Check wheter the user is already logged in and perform the login operation if so.
    if(publicKey) {
      this.props.login(publicKey)
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (publicKey) => dispatch(KeyActions.login(publicKey))
  }
}

export default connect(null, mapDispatchToProps)(AuthLoadingScreen)
