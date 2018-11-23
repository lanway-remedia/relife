/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  outletStoreListRequest: ['data'],
  outletStoreListSuccess: ['data'],
  outletStoreListFailure: ['error'],
  outletStoreAddRequest: ['data'],
  outletStoreAddSuccess: ['data'],
  outletStoreAddFailure: ['error'],
  outletStoreGetRequest: ['data'],
  outletStoreGetSuccess: ['data'],
  outletStoreGetFailure: ['error'],
  outletStoreEditRequest: ['data'],
  outletStoreEditSuccess: ['data'],
  outletStoreEditFailure: ['error'],
  outletStoreDeleteRequest: ['data'],
  outletStoreDeleteSuccess: ['data'],
  outletStoreDeleteFailure: ['error']
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

export const outletStoreAddRequest = state => {
  return { ...state, processing: true }
}

export const outletStoreAddSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const outletStoreAddFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const outletStoreGetRequest = state => {
  return { ...state, processing: true }
}

export const outletStoreGetSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const outletStoreGetFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const outletStoreEditRequest = state => {
  return { ...state, processing: true }
}

export const outletStoreEditSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const outletStoreEditFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const outletStoreDeleteRequest = state => {
  return { ...state, processing: true }
}

export const outletStoreDeleteSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const outletStoreDeleteFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.OUTLET_STORE_LIST_REQUEST]: outletStoreListRequest,
  [Types.OUTLET_STORE_LIST_SUCCESS]: outletStoreListSuccess,
  [Types.OUTLET_STORE_LIST_FAILURE]: outletStoreListFailure,
  [Types.OUTLET_STORE_ADD_REQUEST]: outletStoreAddRequest,
  [Types.OUTLET_STORE_ADD_SUCCESS]: outletStoreAddSuccess,
  [Types.OUTLET_STORE_ADD_FAILURE]: outletStoreAddFailure,
  [Types.OUTLET_STORE_GET_REQUEST]: outletStoreGetRequest,
  [Types.OUTLET_STORE_GET_SUCCESS]: outletStoreGetSuccess,
  [Types.OUTLET_STORE_GET_FAILURE]: outletStoreGetFailure,
  [Types.OUTLET_STORE_EDIT_REQUEST]: outletStoreEditRequest,
  [Types.OUTLET_STORE_EDIT_SUCCESS]: outletStoreEditSuccess,
  [Types.OUTLET_STORE_EDIT_FAILURE]: outletStoreEditFailure,
  [Types.OUTLET_STORE_DELETE_REQUEST]: outletStoreDeleteRequest,
  [Types.OUTLET_STORE_DELETE_SUCCESS]: outletStoreDeleteSuccess,
  [Types.OUTLET_STORE_DELETE_FAILURE]: outletStoreDeleteFailure
})
