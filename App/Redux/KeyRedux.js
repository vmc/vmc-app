import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  login: ['publicKey'],
  logout: null
})

export const KeyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  publicKey: ''
})

/* ------------- Reducers ------------- */

// request the avatar for a user
export const login = (state, { publicKey }) =>
  state.merge({ publicKey })

export const logout = (state) =>
  state.merge({ publicKey: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout,
})
