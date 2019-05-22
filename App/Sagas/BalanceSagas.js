import { call, put } from 'redux-saga/effects'
import BalanceActions from '../Redux/BalanceRedux'

export function * getBalance (api, action) {
  const { publicKey } = action
  // make the call to the api
  const response = yield call(api.getBalance, publicKey)

  if (response.ok) {
    balance = response.data
    // do data conversion here if needed
    yield put(BalanceActions.updateSucces(balance))
  } else {
    yield put(BalanceActions.updateFailure())
  }
}