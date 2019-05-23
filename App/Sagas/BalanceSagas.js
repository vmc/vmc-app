import { call, put } from 'redux-saga/effects'
import BalanceActions from '../Redux/BalanceRedux'

export function* getBalance(api, action) {
  const { publicKey } = action
  const response = yield call(api.getBalance, publicKey)
  
  if (response.ok) {
    balance = response.data
    yield put(BalanceActions.updateSucces(balance))
  } else {
    yield put(BalanceActions.updateFailure())
  }
}

export function* topUp(api, action) {
  const { publicKey, amount } = action
  const response = yield call(api.topUp, [publicKey, amount])

  if (response.ok) {
    yield put(BalanceActions.updateBalance(publicKey))
  } else {
    yield put(BalanceActions.updateFailure(response.problem))
  }
}