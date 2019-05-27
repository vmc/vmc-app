import React, { Component } from 'react'
import { View, AsyncStorage, Text } from 'react-native'
import Header from '../Components/Header'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TicketActions from '../Redux/TicketRedux'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { ScrollView } from 'react-native-gesture-handler';

class TicketScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Your tickets',
    drawerIcon: ({tintColor}) => (
      <Icon name='receipt' size={20} color={tintColor} />
    )
  };

  constructor (props) {
    super(props)

    this.state = {
      boughtTickets: null
    }
  }

  componentWillMount () {
    this.props.getTicketTypes()
    this.getTickets()
  }

  componentWillUnmount () {

  }

  getTickets = async () => {
    const boughtTickets = await AsyncStorage.getItem('boughtTickets')
    if (boughtTickets !== null) {
      this.setState({boughtTickets: boughtTickets})
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Header {...this.props} />
        <ScrollView style={[styles.container, {flex: 1}]}>
          <Text style={{marginBottom: 20}}>{this.state.boughtTickets}</Text>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ticketTypes: state.ticket.ticketTypes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTicketTypes: () => dispatch(TicketActions.getTicket())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketScreen)
