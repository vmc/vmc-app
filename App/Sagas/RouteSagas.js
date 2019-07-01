import { call, put } from 'redux-saga/effects'
import RouteActions from '../Redux/RouteRedux'
import showError from '../Services/ErrorToast'

export function * findRoute (api, data) {
  const response = yield call(api.findRoute, [data.fromCoords, data.toCoords])
  if (response.ok) {
    const routes = response.data
    yield put(RouteActions.routeSuccess([routes]))
  } else {
    yield put(RouteActions.routeFailure(response.problem))
    showError(response)
  }
}
