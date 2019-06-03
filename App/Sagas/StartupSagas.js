// process STARTUP actions

import { call, put } from 'redux-saga/effects'
import OrderActions from '../Redux/OrderRedux'
import BalanceActions from '../Redux/BalanceRedux'
import { AsyncStorage } from 'react-native'

export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')
  }
  try {
    var boughtTickets = yield call([AsyncStorage, 'getItem'], 'boughtTickets')
    var publicKey = yield call([AsyncStorage, 'getItem'], 'publicKey')
    if (boughtTickets !== null) {
      yield put(OrderActions.postSucces(JSON.parse(boughtTickets)))
    } else {
      yield put(OrderActions.postSucces([]))
    }
    yield put(BalanceActions.updateBalance(publicKey))
  } catch (e) {
    alert(e)
  }
}
