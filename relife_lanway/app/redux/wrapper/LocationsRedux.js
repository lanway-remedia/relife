/**
 * @author HaPV
 * Task Confirmation
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  locationsRequest: ['data'],
  locationsSuccess: ['data'],
  locationsFailure: ['error']
})

export const LocationTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const locationsRequest = state => {
  return { ...state, processing: true }
}

export const locationsSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const locationsFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCATIONS_REQUEST]: locationsRequest,
  [Types.LOCATIONS_SUCCESS]: locationsSuccess,
  [Types.LOCATIONS_FAILURE]: locationsFailure
})
