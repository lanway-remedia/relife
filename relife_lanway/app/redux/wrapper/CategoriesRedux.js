/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  cateListRequest: ['data'],
  cateListSuccess: ['data'],
  cateListFailure: ['error'],
  cateAddRequest: ['data'],
  cateAddSuccess: ['data'],
  cateAddFailure: ['error'],
  cateGetRequest: ['data'],
  cateGetSuccess: ['data'],
  cateGetFailure: ['error'],
  cateEditRequest: ['data'],
  cateEditSuccess: ['data'],
  cateEditFailure: ['error'],
  cateDeleteRequest: ['data'],
  cateDeleteSuccess: ['data'],
  cateDeleteFailure: ['error']
})

export const CategoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const cateListRequest = state => {
  return { ...state, processing: true }
}

export const cateListSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const cateListFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const cateAddRequest = state => {
  return { ...state, processing: true }
}

export const cateAddSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const cateAddFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const cateGetRequest = state => {
  return { ...state, processing: true }
}

export const cateGetSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const cateGetFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const cateEditRequest = state => {
  return { ...state, processing: true }
}

export const cateEditSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const cateEditFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const cateDeleteRequest = state => {
  return { ...state, processing: true }
}

export const cateDeleteSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const cateDeleteFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATE_LIST_REQUEST]: cateListRequest,
  [Types.CATE_LIST_SUCCESS]: cateListSuccess,
  [Types.CATE_LIST_FAILURE]: cateListFailure,
  [Types.CATE_ADD_REQUEST]: cateAddRequest,
  [Types.CATE_ADD_SUCCESS]: cateAddSuccess,
  [Types.CATE_ADD_FAILURE]: cateAddFailure,
  [Types.CATE_GET_REQUEST]: cateGetRequest,
  [Types.CATE_GET_SUCCESS]: cateGetSuccess,
  [Types.CATE_GET_FAILURE]: cateGetFailure,
  [Types.CATE_EDIT_REQUEST]: cateEditRequest,
  [Types.CATE_EDIT_SUCCESS]: cateEditSuccess,
  [Types.CATE_EDIT_FAILURE]: cateEditFailure,
  [Types.CATE_DELETE_REQUEST]: cateDeleteRequest,
  [Types.CATE_DELETE_SUCCESS]: cateDeleteSuccess,
  [Types.CATE_DELETE_FAILURE]: cateDeleteFailure
})
