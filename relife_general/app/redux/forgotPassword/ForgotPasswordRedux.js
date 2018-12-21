/**
 * @author HaPV
 * Task Confirmation
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  forgotRequest: ['email'],
  forgotSuccess: ['data'],
  forgotFailure: ['error']
})

export const ForgotTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORGOT_REQUEST]: request,
  [Types.FORGOT_SUCCESS]: success,
  [Types.FORGOT_FAILURE]: failure
})
