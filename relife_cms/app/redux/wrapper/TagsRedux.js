/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  tagListRequest: ['data'],
  tagSuccess: ['data'],
  tagFailure: ['error']
})

export const TagTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const tagListRequest = state => {
  return { ...state, processing: true }
}

export const tagSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const tagFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.TAG_LIST_REQUEST]: tagListRequest,
  [Types.TAG_SUCCESS]: tagSuccess,
  [Types.TAG_FAILURE]: tagFailure
})
