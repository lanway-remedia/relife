/**
 * @author HaPV
 * Task Confirmation
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  locationListRequest: ['data'],
  locationGetRequest: ['data'],
  locationAddRequest: ['data'],
  locationEditRequest: ['data'],
  locationDeleteRequest: ['data'],
  locationSuccess: ['data'],
  locationFailure: ['error']
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
export const locationListRequest = state => {
  return { ...state, processing: true }
}

export const locationGetRequest = state => {
  return { ...state, processing: true }
}

export const locationAddRequest = state => {
  return { ...state, processing: true }
}

export const locationEditRequest = state => {
  return { ...state, processing: true }
}

export const locationDeleteRequest = state => {
  return { ...state, processing: true }
}

export const locationSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const locationFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCATION_LIST_REQUEST]: locationListRequest,
  [Types.LOCATION_GET_REQUEST]: locationGetRequest,
  [Types.LOCATION_ADD_REQUEST]: locationAddRequest,
  [Types.LOCATION_EDIT_REQUEST]: locationEditRequest,
  [Types.LOCATION_DELETE_REQUEST]: locationDeleteRequest,
  [Types.LOCATION_SUCCESS]: locationSuccess,
  [Types.LOCATION_FAILURE]: locationFailure
})
