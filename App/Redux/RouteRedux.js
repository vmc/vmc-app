import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  routeFind: ['fromCoords', 'toCoords'],
  routeSuccess: ['routes'],
  routeFailure: ['error']
})

export const RouteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fromCoords: [],
  toCoords: [],
  posting: false,
  error: null,
  routes: []
})

/* ------------- Reducers ------------- */

export const post = (state, action) => {
  const { fromCoords, toCoords } = action
  return state.merge({ fromCoords, toCoords, routes: [], posting: true, error: null })
}

export const succes = (state, action) => {
  return state.merge({ posting: false, error: null, routes: action.routes })
}

export const failure = (state, { error }) =>
  state.merge({ posting: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ROUTE_FIND]: post,
  [Types.ROUTE_SUCCESS]: succes,
  [Types.ROUTE_FAILURE]: failure
})
