import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getTicket: null,
  getSuccess: ['ticketTypes'],
  getFailure: ['error']
})

export const TicketTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  ticketTypes: null,
  posting: false,
  error: null
})

/* ------------- Reducers ------------- */

export const get = (state) => {
  state.merge({ posting: true })
}

export const success = (state, action) => {
  const { ticketTypes } = action
  return state.merge({posting: false, error: null, ticketTypes})
}

export const failure = (state, { error }) =>
  state.merge({ posting: false, error, ticketTypes: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_TICKET]: get,
  [Types.GET_SUCCESS]: success,
  [Types.GET_FAILURE]: failure
})
