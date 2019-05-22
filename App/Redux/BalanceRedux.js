import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateBalance: ['publicKey'],
  updateSucces: ['balance'],
  updateFailure: null,
  topUpBalance: ['publicKey', 'amount'],
  topUpSucces: null,
  topUpFailure: null
})

export const BalanceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  publicKey: '',
  balance: null,
  updating: null,
  error: null,
  amount: null
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

export const topUp = (state, {publicKey, amount}) =>
  state.merge({ updating: true, publicKey, amount })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_BALANCE]: update,
  [Types.UPDATE_SUCCES]: succes,
  [Types.UPDATE_FAILURE]: failure,
  [Types.TOP_UP_BALANCE]: topUp
})
