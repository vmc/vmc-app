import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {AsyncStorage} from 'react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postOrder: ['ticketType', 'publicKey', 'signedBatch'],
  postSucces: ['ticketId'],
  postFailure: ['error']
})

export const OrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  ticketType: '',
  publicKey: '',
  signedBatch: '',
  posting: false,
  error: null,
  ticketId: ''
})

/* ------------- Reducers ------------- */

export const post = (state, action) => {
  console.log(state)
  const { ticketType, publicKey, signedBatch } = action
  console.log(ticketType, publicKey, signedBatch)
  return state.merge({ ticketType, publicKey, signedBatch, posting: true })
}

export const succes = (state, action) => {
  const { ticketId } = action
  return state.merge({ posting: false, error: null, ticketId: ticketId.ticket_id })
}

export const failure = (state, { error }) =>
  state.merge({ posting: false, error, ticketId: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_ORDER]: post,
  [Types.POST_SUCCES]: succes,
  [Types.POST_FAILURE]: failure
})
