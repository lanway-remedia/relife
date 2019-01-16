/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  exhibitionsListRequest : ['data'],
  exhibitionsListSuccess : ['data'],
  exhibitionsListFailure : ['error'],

  exhibitionsListByRegionRequest : ['data'],
  exhibitionsListByRegionSuccess : ['data'],
  exhibitionsListByRegionFailure : ['error'],
})

export const ExhibitionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */

export const exhibitionsListRequest = state => {
  return { ...state, processing: true }
}

export const exhibitionsListSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exhibitionsListFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const exhibitionsListByRegionRequest = state => {
  return { ...state, processing: true }
}

export const exhibitionsListByRegionSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exhibitionsListByRegionFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXHIBITIONS_LIST_REQUEST]: exhibitionsListRequest,
  [Types.EXHIBITIONS_LIST_SUCCESS]: exhibitionsListSuccess,
  [Types.EXHIBITIONS_LIST_FAILURE]: exhibitionsListFailure,

  [Types.EXHIBITIONS_LIST_BY_REGION_REQUEST]: exhibitionsListByRegionRequest,
  [Types.EXHIBITIONS_LIST_BY_REGION_SUCCESS]: exhibitionsListByRegionSuccess,
  [Types.EXHIBITIONS_LIST_BY_REGION_FAILURE]: exhibitionsListByRegionFailure,
})
