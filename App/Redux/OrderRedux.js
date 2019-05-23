import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postOrder: ['ticketType', 'publicKey', 'publicKeyTo', 'price', 'signedBatch'],
  postSucces: ['ticketId'],
  postFailure: ['error']
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  ticketType: '',
  publicKey: '',
  publicKeyTo: '',
  price: null,
  signedBatch: null,
  posting: false,
  error: null,
  ticketId: ''
})

/* ------------- Reducers ------------- */

export const post = (state, action) => {
  const { ticketType, publicKey, publicKeyTo, price, signedBatch } = action
  state.merge({ ticketType, publicKey, publicKeyTo, price, signedBatch, posting: true })
}

export const succes = (state, action) => {
  const { ticketId } = action
  return state.merge({posting: false, error: null, ticketId})
}

export const failure = (state, { error }) =>
  state.merge({ posting: false, error, ticketId: null})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_ORDER]: post,
  [Types.POST_SUCCES]: succes,
  [Types.POST_FAILURE]: failure
})
