import { call, put } from 'redux-saga/effects'
import BalanceActions from '../Redux/BalanceRedux'
import showError from '../Services/ErrorToast.js'

export function * getBalance (api, data) {
  const response = yield call(api.getBalance, data.publicKey)
  if (response.ok) {
    const balance = response.data.balance
    yield put(BalanceActions.updateSucces(balance))
  } else {
    // Show error and update state accordingly
    showError(response)
    yield put(BalanceActions.updateFailure())
  }
}

export function * topUp (api, data) {
  const response = yield call(api.topUp, [data.publicKey, data.amount])
  if (response.ok) {
    yield put(BalanceActions.updateBalance(data.publicKey))
  } else {
    yield put(BalanceActions.updateFailure(response.problem))
    showError(response)
  }
}
