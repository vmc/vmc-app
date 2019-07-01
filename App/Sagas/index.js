import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { ImageTypes } from '../Redux/ImageRedux'
import { BalanceTypes } from '../Redux/BalanceRedux'
import { OrderTypes } from '../Redux/OrderRedux'
import { TicketTypes } from '../Redux/TicketRedux'
import { RouteTypes } from '../Redux/RouteRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { postImage } from './ImageSagas'
import { getBalance, topUp } from './BalanceSagas'
import { postOrder } from './OrderSagas'
import { getTicketTypes } from './TicketSagas'
import { findRoute } from './RouteSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ImageTypes.POST_IMAGE, postImage, api),
    takeLatest(BalanceTypes.UPDATE_BALANCE, getBalance, api),
    takeLatest(BalanceTypes.TOP_UP_BALANCE, topUp, api),
    takeLatest(OrderTypes.POST_ORDER, postOrder, api),
    takeLatest(TicketTypes.GET_TICKET, getTicketTypes, api),
    takeLatest(RouteTypes.ROUTE_FIND, findRoute, api)
  ])
}
