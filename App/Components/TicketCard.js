import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Components/Button'
import styles from './Styles/TicketCardStyles'

export default class TicketCard extends Component {
  static propTypes = {
    data: PropTypes.object
  }

  render () {
    return (
      <Button text={this.props.data.company} onPress={() => alert(JSON.stringify(this.props.data))} />
    )
  }
}
