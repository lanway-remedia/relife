/**
 * @author HanhTD
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  modelHousesListRequest : ['data'],
  modelHousesListSuccess : ['data'],
  modelHousesListFailure : ['error'],
})

export const ModelHousesTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */

export const modelHousesListRequest = state => {
  return { ...state, processing: true }
}

export const modelHousesListSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const modelHousesListFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.MODEL_HOUSES_LIST_REQUEST]: modelHousesListRequest,
  [Types.MODEL_HOUSES_LIST_SUCCESS]: modelHousesListSuccess,
  [Types.MODEL_HOUSES_LIST_FAILURE]: modelHousesListFailure,
})
