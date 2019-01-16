import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  exampleHousesListRequest: ['data'],
  exampleHousesGetRequest: ['data'],
  exampleHousesSuccess: ['data'],
  exampleHousesFailure: ['error'],
  
  exampleHousesListByStoreRequest: ['data'],
  exampleHousesListByStoreSuccess: ['data'],
  exampleHousesListByStoreFailure: ['error']
})

export const ExampleHousesTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

export const exampleHousesListRequest = state => {
  return { ...state, processing: true}
}

export const exampleHousesGetRequest = state => {
  return { ...state, processing: true}
}

export const exampleHousesSuccess = (state, { data }) => {
  return { ...state, processing: true, data, error: null}
}

export const exampleHousesFailure = (state, { error }) => {
  return { ...state, processing: true, error}
}

export const exampleHousesListByStoreRequest = state => {
  return { ...state, processing: true }
}

export const exampleHousesListByStoreSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const exampleHousesListByStoreFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXAMPLE_HOUSES_LIST_REQUEST] : exampleHousesListRequest,
  [Types.EXAMPLE_HOUSES_GET_REQUEST] : exampleHousesGetRequest,
  [Types.EXAMPLE_HOUSES_SUCCESS] : exampleHousesSuccess,
  [Types.EXAMPLE_HOUSES_FAILURE] : exampleHousesFailure,

  [Types.EXAMPLE_HOUSES_LIST_BY_STORE_REQUEST] : exampleHousesListByStoreRequest,
  [Types.EXAMPLE_HOUSES_LIST_BY_STORE_SUCCESS] : exampleHousesListByStoreSuccess,
  [Types.EXAMPLE_HOUSES_LIST_BY_STORE_FAILURE] : exampleHousesListByStoreFailure,
})
