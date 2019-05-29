import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '../Components/Button'
import styles from './Styles/BoughtTicketCardStyles'
import Modal from 'react-native-modal'
import QRCode from 'react-native-qrcode-svg'

class TicketCard extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      isVisible: false
    }
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
          text={this.props.data.company + ' - ' + this.props.data.title + ' - ' + this.props.data.ticketId}
          onPress={() => this.setState({isVisible: true})}
          icon={iconType}
        />
        <Modal
          isVisible={this.state.isVisible}
          onSwipeComplete={() => this.setState({ isVisible: false })}
          swipeDirection='down'
          onBackdropPress={() => this.setState({ isVisible: false })}
          useNativeDriver={true}
        >
          <View style={styles.modal}>
            <QRCode
              value={this.props.data.ticketId}
              size={200}
            />
            <Text>Company: {this.props.data.company}</Text>
            <Text>Price: {this.props.data.price}</Text>
            <Text>Type: {this.props.data.title}</Text>
            <View style={styles.buttonArea}>
              <Button
                text='Cancel'
                onPress={() => this.setState({isVisible: false})}
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

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketCard)
