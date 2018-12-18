/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  exampleHouseListRequest: ['data'],
  exampleHouseAddRequest: ['data'],
  exampleHouseGetRequest: ['data'],
  exampleHouseEditRequest: ['data'],
  exampleHouseDeleteRequest: ['data'],
  exampleHouseSuccess: ['data'],
  exampleHouseFailure: ['error']
})

export const ExampleHouseTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const exampleHouseListRequest = state => {
  return { ...state, processing: true }
}

export const exampleHouseAddRequest = state => {
  return { ...state, processing: true }
}

export const exampleHouseGetRequest = state => {
  return { ...state, processing: true }
}

export const exampleHouseEditRequest = state => {
  return { ...state, processing: true }
}

export const exampleHouseDeleteRequest = state => {
  return { ...state, processing: true }
}

export const exampleHouseSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exampleHouseFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXAMPLE_HOUSE_LIST_REQUEST]: exampleHouseListRequest,
  [Types.EXAMPLE_HOUSE_ADD_REQUEST]: exampleHouseAddRequest,
  [Types.EXAMPLE_HOUSE_GET_REQUEST]: exampleHouseGetRequest,
  [Types.EXAMPLE_HOUSE_EDIT_REQUEST]: exampleHouseEditRequest,
  [Types.EXAMPLE_HOUSE_DELETE_REQUEST]: exampleHouseDeleteRequest,
  [Types.EXAMPLE_HOUSE_SUCCESS]: exampleHouseSuccess,
  [Types.EXAMPLE_HOUSE_FAILURE]: exampleHouseFailure
})
