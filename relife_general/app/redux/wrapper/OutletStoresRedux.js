/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  outletStoresGetRequest: ['data'],
  outletStoresGetSuccess: ['data'],
  outletStoresGetFailure: ['error'],

})

export const OutletStoresTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */

export const outletStoresGetRequest = state => {
  return { ...state, processing: true }
}

export const outletStoresGetSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const outletStoresGetFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.OUTLET_STORES_GET_REQUEST]: outletStoresGetRequest,
  [Types.OUTLET_STORES_GET_SUCCESS]: outletStoresGetSuccess,
  [Types.OUTLET_STORES_GET_FAILURE]: outletStoresGetFailure,

})
