/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  exhibitionListRequest: ['data'],
  exhibitionListSuccess: ['data'],
  exhibitionListFailure: ['error'],
  exhibitionAddRequest: ['data'],
  exhibitionAddSuccess: ['data'],
  exhibitionAddFailure: ['error'],
  exhibitionGetRequest: ['data'],
  exhibitionGetSuccess: ['data'],
  exhibitionGetFailure: ['error'],
  exhibitionEditRequest: ['data'],
  exhibitionEditSuccess: ['data'],
  exhibitionEditFailure: ['error'],
  exhibitionDeleteRequest: ['data'],
  exhibitionDeleteSuccess: ['data'],
  exhibitionDeleteFailure: ['error']
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
export const exhibitionListRequest = state => {
  return { ...state, processing: true }
}

export const exhibitionListSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exhibitionListFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const exhibitionAddRequest = state => {
  return { ...state, processing: true }
}

export const exhibitionAddSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exhibitionAddFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const exhibitionGetRequest = state => {
  return { ...state, processing: true }
}

export const exhibitionGetSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exhibitionGetFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const exhibitionEditRequest = state => {
  return { ...state, processing: true }
}

export const exhibitionEditSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exhibitionEditFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const exhibitionDeleteRequest = state => {
  return { ...state, processing: true }
}

export const exhibitionDeleteSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exhibitionDeleteFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXHIBITION_LIST_REQUEST]: exhibitionListRequest,
  [Types.EXHIBITION_LIST_SUCCESS]: exhibitionListSuccess,
  [Types.EXHIBITION_LIST_FAILURE]: exhibitionListFailure,
  [Types.EXHIBITION_ADD_REQUEST]: exhibitionAddRequest,
  [Types.EXHIBITION_ADD_SUCCESS]: exhibitionAddSuccess,
  [Types.EXHIBITION_ADD_FAILURE]: exhibitionAddFailure,
  [Types.EXHIBITION_GET_REQUEST]: exhibitionGetRequest,
  [Types.EXHIBITION_GET_SUCCESS]: exhibitionGetSuccess,
  [Types.EXHIBITION_GET_FAILURE]: exhibitionGetFailure,
  [Types.EXHIBITION_EDIT_REQUEST]: exhibitionEditRequest,
  [Types.EXHIBITION_EDIT_SUCCESS]: exhibitionEditSuccess,
  [Types.EXHIBITION_EDIT_FAILURE]: exhibitionEditFailure,
  [Types.EXHIBITION_DELETE_REQUEST]: exhibitionDeleteRequest,
  [Types.EXHIBITION_DELETE_SUCCESS]: exhibitionDeleteSuccess,
  [Types.EXHIBITION_DELETE_FAILURE]: exhibitionDeleteFailure
})
