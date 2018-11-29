/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  tagListRequest: ['data'],
  tagListSuccess: ['data'],
  tagListFailure: ['error'],
  tagAddRequest: ['data'],
  tagAddSuccess: ['data'],
  tagAddFailure: ['error'],
  tagGetRequest: ['data'],
  tagGetSuccess: ['data'],
  tagGetFailure: ['error'],
  tagEditRequest: ['data'],
  tagEditSuccess: ['data'],
  tagEditFailure: ['error'],
  tagDeleteRequest: ['data'],
  tagDeleteSuccess: ['data'],
  tagDeleteFailure: ['error']
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

export const tagListSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const tagListFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const tagAddRequest = state => {
  return { ...state, processing: true }
}

export const tagAddSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const tagAddFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const tagGetRequest = state => {
  return { ...state, processing: true }
}

export const tagGetSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const tagGetFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const tagEditRequest = state => {
  return { ...state, processing: true }
}

export const tagEditSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const tagEditFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const tagDeleteRequest = state => {
  return { ...state, processing: true }
}

export const tagDeleteSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const tagDeleteFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.TAG_LIST_REQUEST]: tagListRequest,
  [Types.TAG_LIST_SUCCESS]: tagListSuccess,
  [Types.TAG_LIST_FAILURE]: tagListFailure,
  [Types.TAG_ADD_REQUEST]: tagAddRequest,
  [Types.TAG_ADD_SUCCESS]: tagAddSuccess,
  [Types.TAG_ADD_FAILURE]: tagAddFailure,
  [Types.TAG_GET_REQUEST]: tagGetRequest,
  [Types.TAG_GET_SUCCESS]: tagGetSuccess,
  [Types.TAG_GET_FAILURE]: tagGetFailure,
  [Types.TAG_EDIT_REQUEST]: tagEditRequest,
  [Types.TAG_EDIT_SUCCESS]: tagEditSuccess,
  [Types.TAG_EDIT_FAILURE]: tagEditFailure,
  [Types.TAG_DELETE_REQUEST]: tagDeleteRequest,
  [Types.TAG_DELETE_SUCCESS]: tagDeleteSuccess,
  [Types.TAG_DELETE_FAILURE]: tagDeleteFailure
})
