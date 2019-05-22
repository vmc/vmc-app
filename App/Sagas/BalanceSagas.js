import { call, put } from 'redux-saga/effects'
import BalanceActions from '../Redux/BalanceRedux'

export function * getBalance (api, action) {
  const { publicKey } = action
  // make the call to the api
  const response = yield call(api.getBalance, publicKey)
  console.log('WHOO')
  if (response.ok) {
    balance = response.data
    console.log(balance)
    // do data conversion here if needed
    yield put(BalanceActions.updateSucces(balance))
  } else {
    yield put(BalanceActions.updateFailure())
  }
}

export function * topUp (api, action) {
  const { publicKey, amount } = action
  // make the call to the api
  const response = yield call(api.topUp, [publicKey, amount])

  console.log(publicKey)
  if (response.ok) {
    console.log(response)
    yield put(BalanceActions.updateBalance(publicKey))
  } else {
    yield put(BalanceActions.updateFailure())
  }
}