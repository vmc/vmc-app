import { call, put } from 'redux-saga/effects'
import TicketActions from '../Redux/TicketRedux'

export function* getTicketTypes (api, action) {
  const response = yield call(api.getTicketTypes)
  
  if (response.ok) {
    ticketTypes = response.data
    yield put(TicketActions.getSuccess(ticketTypes))
  } else {
    yield put(TicketActions.getFailure(response.problem))
  }
}