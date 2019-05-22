import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateBalance: ['publicKey'],
  updateSucces: ['balance'],
  updateFailure: null
})

export const BalanceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  balance: null,
  updating: null,
  error: null
})

/* ------------- Reducers ------------- */

export const update = (state, { publicKey }) =>
  state.merge({ publicKey, updating: true })

export const succes = (state, action) => {
  const { balance } = action
  return state.merge({updating: false, error: null, balance})
}

export const failure = (state) =>
  state.merge({ updating: false, error: true})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_BALACE]: update,
  [Types.SUCCES_BALACE]: succes,
  [Types.FAILURE_BALACE]: failure,
})
