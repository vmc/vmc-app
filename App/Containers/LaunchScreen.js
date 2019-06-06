import React, { Component } from 'react'
import { View, Text, RefreshControl, ScrollView } from 'react-native'
import Header from '../Components/Header'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TicketActions from '../Redux/TicketRedux'
import TicketCard from '../Components/TicketCard'
// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Buy a ticket',
    drawerIcon: ({tintColor}) => (
      <Icon name='local-activity' size={20} color={tintColor} />
    )
  }

  componentWillMount () {
    this.props.getTicketTypes()
  }

  componentWillUnmount () {

  }

  _onRefresh = () => {
    this.props.getTicketTypes()
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
      <View style={{flex: 1}}>
        <Header {...this.props} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.posting}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.container}>
            {tickets}
            <Text style={{color: 'black'}}>Balance: {this.props.balance}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ticketTypes: state.ticket.ticketTypes,
    error: state.order.error,
    balance: state.balance.balance,
    posting: state.ticket.posting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTicketTypes: () => dispatch(TicketActions.getTicket())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
