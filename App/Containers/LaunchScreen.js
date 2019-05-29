import React, { Component } from 'react'
import { View, Text, ToastAndroid } from 'react-native'
import Header from '../Components/Header'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TicketActions from '../Redux/TicketRedux'
import TicketCard from '../Components/TicketCard'
// Styles
import styles from './Styles/LaunchScreenStyles'
import { ScrollView } from 'react-native-gesture-handler';

class LaunchScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Buy a ticket',
    drawerIcon: ({tintColor}) => (
      <Icon name='local-activity' size={20} color={tintColor} />
    )
  }

  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentWillMount () {
    this.props.getTicketTypes()
  }

  componentWillUnmount () {

  }

  render () {
    var tickets
    if (this.props.ticketTypes) {
      tickets = this.props.ticketTypes.map((ticket, i) => {
        return (
          <TicketCard key={i} data={ticket} />
        )
      })
    } else {
      tickets = null
    }

    return (
      <View>
        <Header {...this.props} />
        <ScrollView style={styles.container}>
          {tickets}
          <Text style={{color: 'black'}}>Balance: {this.props.balance}</Text>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ticketTypes: state.ticket.ticketTypes,
    error: state.order.error,
    balance: state.balance.balance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTicketTypes: () => dispatch(TicketActions.getTicket())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
