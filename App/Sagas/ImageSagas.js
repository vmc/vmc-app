import { call, put } from 'redux-saga/effects'
import ImageActions from '../Redux/ImageRedux'

export function * postImage (api, action) {
  const { base64 } = action
  // make the call to the api
  const response = yield call(api.postImage, base64)
  if (response.ok) {
    yield put(ImageActions.postSucces())
  } else {
    yield put(ImageActions.postFailure())
  }
}
