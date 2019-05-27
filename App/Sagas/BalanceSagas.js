import { call, put } from 'redux-saga/effects'
import BalanceActions from '../Redux/BalanceRedux'

export function * getBalance (api, data) {
  const response = yield call(api.getBalance, data.publicKey)
  if (response.ok) {
    balance = response.data
    yield put(BalanceActions.updateSucces(balance))
  } else {
    yield put(BalanceActions.updateFailure())
  }
}

export function * topUp (api, data) {
  const response = yield call(api.topUp, [data.publicKey, data.amount])
  if (response.ok) {
    yield put(BalanceActions.updateBalance(data.publicKey))
  } else {
    yield put(BalanceActions.updateFailure(response.problem))
  }
}
