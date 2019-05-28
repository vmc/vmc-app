import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {AsyncStorage} from 'react-native';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  postOrder: ['ticketType', 'publicKey', 'signedBatch'],
  postSucces: ['boughtTickets'],
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
  boughtTickets: ''
})

/* ------------- Reducers ------------- */

export const post = (state, action) => {
  const { ticketType, publicKey, signedBatch } = action
  return state.merge({ ticketType, publicKey, signedBatch, posting: true, error: null })
}

export const succes = (state, action) => {
  return state.merge({ posting: false, error: null, boughtTickets: action.boughtTickets })
}

export const failure = (state, { error }) =>
  state.merge({ posting: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POST_ORDER]: post,
  [Types.POST_SUCCES]: succes,
  [Types.POST_FAILURE]: failure
})
