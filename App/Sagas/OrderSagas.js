import { call, put } from 'redux-saga/effects'
import OrderActions from '../Redux/OrderRedux'

export function* postOrder (api, action) {
  const { ticketType, publicKey, publicKeyTo, price, signedBatch } = action
  const response = yield call(api.postOrder, ticketType, publicKey, publicKeyTo, price, signedBatch)
  
  if (response.ok) {
    ticketId = response.data
    yield put(OrderActions.postSucces(ticketId))
  } else {
    yield put(OrderActions.postFailure(response.problem))
  }
}