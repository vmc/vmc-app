import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postImage: ['base64'],
  postSucces: null,
  postFailure: null
})

export const ImageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  base64: '',
  posting: false,
  error: 'test'
})

/* ------------- Reducers ------------- */

export const post = (state, { base64 }) => {
  return state.merge({ posting: true, base64 })
}

export const succes = (state) => {
  return state.merge({ posting: false, error: 'succes' })
}

export const failure = (state) => {
  return state.merge({ posting: false, error: 'fail' })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_IMAGE]: post,
  [Types.POST_SUCCES]: succes,
  [Types.POST_FAILURE]: failure
})
