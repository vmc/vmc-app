import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../Components/Button'
import styles from './Styles/TicketCardStyles'
import Modal from 'react-native-modal'
import OrderActions from '../Redux/OrderRedux'

class TicketCard extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      isShowingText: true
    }
  }

  buyTicket = (ticketData) => {
    this.props.postOrder(ticketData.ticketReference, this.props.publicKey, 'test')
    this.setState({isVisible: false})
  }

  render () {
    var iconType
    if (this.props.data.company === 'Metro') {
      iconType = 'subway'
    } else if (this.props.data.company === 'Tram') {
      iconType = 'tram'
    } else {
      iconType = 'local-activity'
    }
    return (
      <View>
        <Button
          text={this.props.data.company + ' - ' + this.props.data.title}
          onPress={() => this.setState({isVisible: true})}
          icon={iconType}
        />
        <Modal
          isVisible={this.state.isVisible}
          onSwipeComplete={() => this.setState({ isVisible: false })}
          swipeDirection='down'
          onBackdropPress={() => this.setState({ isVisible: false })}
          useNativeDriver
          style={{borderRadius: 10}}
        >
          <View style={styles.modal}>
            <Text>Company: {this.props.data.company}</Text>
            <Text>Price: {this.props.data.price}</Text>
            <Text>Type: {this.props.data.title}</Text>
            <View style={styles.buttonArea}>
              <Button
                text='Cancel'
                onPress={() => this.setState({isVisible: false})}
              />
              <Button
                text='Buy'
                onPress={() => this.buyTicket(this.props.data)}
                style={styles.buyButton}
              />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ticketTypes: state.ticket.ticketTypes,
    publicKey: state.key.publicKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postOrder: (ticketType, sourceId, signedBatch) => dispatch(OrderActions.postOrder(ticketType, sourceId, signedBatch))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketCard)
