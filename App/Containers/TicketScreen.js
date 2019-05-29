import React, { Component } from 'react'
import { View, AsyncStorage, Alert } from 'react-native'
import Header from '../Components/Header'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import OrderActions from '../Redux/OrderRedux'
import Button from '../Components/Button'
import BoughtTicketCard from '../Components/BoughtTicketCard'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { ScrollView } from 'react-native-gesture-handler'

class TicketScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Your tickets',
    drawerIcon: ({tintColor}) => (
      <Icon name='receipt' size={20} color={tintColor} />
    )
  };

  componentWillMount () {

  }

  componentWillUnmount () {

  }

  deleteHistConfirm = () => {
    Alert.alert(
      'Warning!',
      'You are about to delete all your tickets. Are you sure you want to do this?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {text: 'Yes', onPress: () => this.deleteHist()}
      ],
      {cancelable: false}
    )
  }

  deleteHist = async () => {
    await AsyncStorage.removeItem('boughtTickets')
    this.props.deleteHistory()
  }

  render () {
    var tickets
    if (this.props.boughtTickets) {
      tickets = this.props.boughtTickets.map((ticket, i) => {
        return (
          <BoughtTicketCard key={i} data={ticket} />
        )
      })
    } else {
      tickets = null
    }

    return (
      <View style={{flex: 1}}>
        <Header {...this.props} />
        <ScrollView style={[styles.container, {flex: 1}]}>
          {tickets}
          <Button icon='delete' style={{marginBottom: 20, backgroundColor: 'red'}} text='Delete history' onPress={() => this.deleteHistConfirm()} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ticketTypes: state.ticket.ticketTypes,
    boughtTickets: state.order.boughtTickets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteHistory: () => dispatch(OrderActions.postSucces([]))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketScreen)
