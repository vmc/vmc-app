import { call, put } from 'redux-saga/effects'
import OrderActions from '../Redux/OrderRedux'
import { AsyncStorage } from 'react-native'

export function * postOrder (api, data) {
  const response = yield call(api.postOrder, [data.ticketType, data.publicKey, data.signedBatch])
  if (response.ok) {
    const ticketId = response.data
    try {
      var boughtTickets = yield call([AsyncStorage, 'getItem'], 'boughtTickets')
      if (boughtTickets !== null) {
        boughtTickets = JSON.parse(boughtTickets)
        boughtTickets.push(ticketId)
      } else {
        boughtTickets = [ticketId]
      }
      console.log(boughtTickets)
      yield call([AsyncStorage, 'setItem'], 'boughtTickets', JSON.stringify(boughtTickets))
    } catch (e) {
      alert(e)
    }
    yield put(OrderActions.postSucces(ticketId))
  } else {
    yield put(OrderActions.postFailure('ERROR'))
  }
}
