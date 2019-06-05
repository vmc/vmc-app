import { call, put } from 'redux-saga/effects'
import OrderActions from '../Redux/OrderRedux'
import BalanceActions from '../Redux/BalanceRedux'
import { AsyncStorage } from 'react-native'
import Toast from 'react-native-simple-toast'
import showError from '../Services/ErrorToast'

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
      yield call([AsyncStorage, 'setItem'], 'boughtTickets', JSON.stringify(boughtTickets))
      yield put(OrderActions.postSucces(boughtTickets))
      yield put(BalanceActions.updateBalance(data.publicKey))
      Toast.show('Ticket bought!', Toast.SHORT)
    } catch (e) {
      alert(e)
    }
  } else {
    yield put(OrderActions.postFailure(response.problem))
    showError(response)
  }
}
