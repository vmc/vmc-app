import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { ImageTypes } from '../Redux/ImageRedux'
import { BalanceTypes } from '../Redux/BalanceRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { postImage } from './ImageSagas'
import { getBalance } from './BalanceSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(ImageTypes.POST_IMAGE, postImage, api),
    takeLatest(BalanceTypes.POST_IMAGE, getBalance, api)
  ])
}
