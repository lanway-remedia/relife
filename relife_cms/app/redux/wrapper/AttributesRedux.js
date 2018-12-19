/**
 * @author HaPV
 * Task Confirmation
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  attributeContructionListRequest: ['data'],
  attributeContructionGetRequest: ['data'],

  attributeFloorListRequest: ['data'],
  attributeFloorGetRequest: ['data'],

  attributeStyleListRequest: ['data'],
  attributeStyleGetRequest: ['data'],

  attributeHouseIncomeListRequest: ['data'],
  attributeHouseIncomeGetRequest: ['data'],

  attributeHouseSizeListRequest: ['data'],
  attributeHouseSizeGetRequest: ['data'],

  attributePriceListRequest: ['data'],
  attributePriceGetRequest: ['data'],

  attributeSuccess: ['data'],
  attributeFailure: ['error']
})

export const AttributeTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const attributeContructionListRequest = state => {
  return { ...state, processing: true }
}

export const attributeContructionGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeFloorListRequest = state => {
  return { ...state, processing: true }
}

export const attributeFloorGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeStyleListRequest = state => {
  return { ...state, processing: true }
}

export const attributeStyleGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseIncomeListRequest = state => {
  return { ...state, processing: true }
}
export const attributeHouseIncomeGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseSizeListRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseSizeGetRequest = state => {
  return { ...state, processing: true }
}

export const attributePriceListRequest = state => {
  return { ...state, processing: true }
}

export const attributePriceGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const attributeFailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ATTRIBUTE_CONTRUCTION_LIST_REQUEST]: attributeContructionListRequest,
  [Types.ATTRIBUTE_CONTRUCTION_GET_REQUEST]: attributeContructionGetRequest,
  
  [Types.ATTRIBUTE_FLOOR_LIST_REQUEST]: attributeFloorListRequest,
  [Types.ATTRIBUTE_FLOOR_GET_REQUEST]: attributeFloorGetRequest,

  [Types.ATTRIBUTE_STYLE_LIST_REQUEST]: attributeStyleListRequest,
  [Types.ATTRIBUTE_STYLE_GET_REQUEST]: attributeStyleGetRequest,

  [Types.ATTRIBUTE_HOUSE_INCOME_LIST_REQUEST]: attributeHouseIncomeListRequest,
  [Types.ATTRIBUTE_HOUSE_INCOME_GET_REQUEST]: attributeHouseIncomeGetRequest,

  [Types.ATTRIBUTE_HOUSE_SIZE_LIST_REQUEST]: attributeHouseSizeListRequest,
  [Types.ATTRIBUTE_HOUSE_SIZE_GET_REQUEST]: attributeHouseSizeGetRequest,

  [Types.ATTRIBUTE_PRICE_LIST_REQUEST]: attributePriceListRequest,
  [Types.ATTRIBUTE_PRICE_GET_REQUEST]: attributePriceGetRequest,

  [Types.ATTRIBUTE_SUCCESS]: attributeSuccess,
  [Types.ATTRIBUTE_FAILURE]: attributeFailure
})
