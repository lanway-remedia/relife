/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  outletStoreListRequest: ['data'],
  outletStoreListSuccess: ['data'],
  outletStoreListFailure: ['error']
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
export const outletStoreListRequest = state => {
  return { ...state, processing: true }
}

export const outletStoreListSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const outletStoreListFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.OUTLET_STORE_LIST_REQUEST]: outletStoreListRequest,
  [Types.OUTLET_STORE_LIST_SUCCESS]: outletStoreListSuccess,
  [Types.OUTLET_STORE_LIST_FAILURE]: outletStoreListFailure
})
