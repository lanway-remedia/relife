/**
 * @author HaPV
 * Task Confirmation
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  attributeContructionListRequest: ['data'],
  attributeContructionGetRequest: ['data'],
  attributeContructionAddRequest: ['data'],
  attributeContructionEditRequest: ['data'],
  attributeContructionDeleteRequest: ['data'],

  attributeFloorListRequest: ['data'],
  attributeFloorGetRequest: ['data'],
  attributeFloorAddRequest: ['data'],
  attributeFloorEditRequest: ['data'],
  attributeFloorDeleteRequest: ['data'],

  attributeStyleListRequest: ['data'],
  attributeStyleGetRequest: ['data'],
  attributeStyleAddRequest: ['data'],
  attributeStyleEditRequest: ['data'],
  attributeStyleDeleteRequest: ['data'],

  attributeHouseIncomeListRequest: ['data'],
  attributeHouseIncomeGetRequest: ['data'],
  attributeHouseIncomeAddRequest: ['data'],
  attributeHouseIncomeEditRequest: ['data'],
  attributeHouseIncomeDeleteRequest: ['data'],

  attributeHouseSizeListRequest: ['data'],
  attributeHouseSizeGetRequest: ['data'],
  attributeHouseSizeAddRequest: ['data'],
  attributeHouseSizeEditRequest: ['data'],
  attributeHouseSizeDeleteRequest: ['data'],

  attributePriceListRequest: ['data'],
  attributePriceGetRequest: ['data'],
  attributePriceAddRequest: ['data'],
  attributePriceEditRequest: ['data'],
  attributePriceDeleteRequest: ['data'],

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

export const attributeContructionAddRequest = state => {
  return { ...state, processing: true }
}

export const attributeContructionEditRequest = state => {
  return { ...state, processing: true }
}

export const attributeContructionDeleteRequest = state => {
  return { ...state, processing: true }
}

export const attributeFloorListRequest = state => {
  return { ...state, processing: true }
}

export const attributeFloorGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeFloorAddRequest = state => {
  return { ...state, processing: true }
}

export const attributeFloorEditRequest = state => {
  return { ...state, processing: true }
}

export const attributeFloorDeleteRequest = state => {
  return { ...state, processing: true }
}

export const attributeStyleListRequest = state => {
  return { ...state, processing: true }
}

export const attributeStyleGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeStyleAddRequest = state => {
  return { ...state, processing: true }
}

export const attributeStyleEditRequest = state => {
  return { ...state, processing: true }
}

export const attributeStyleDeleteRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseIncomeListRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseIncomeGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseIncomeAddRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseIncomeEditRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseIncomeDeleteRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseSizeListRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseSizeGetRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseSizeAddRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseSizeEditRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseSizeDeleteRequest = state => {
  return { ...state, processing: true }
}

export const attributePriceListRequest = state => {
  return { ...state, processing: true }
}

export const attributePriceGetRequest = state => {
  return { ...state, processing: true }
}

export const attributePriceAddRequest = state => {
  return { ...state, processing: true }
}

export const attributePriceEditRequest = state => {
  return { ...state, processing: true }
}

export const attributePriceDeleteRequest = state => {
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
  [Types.ATTRIBUTE_CONTRUCTION_ADD_REQUEST]: attributeContructionAddRequest,
  [Types.ATTRIBUTE_CONTRUCTION_EDIT_REQUEST]: attributeContructionEditRequest,
  [Types.ATTRIBUTE_CONTRUCTION_DELETE_REQUEST]: attributeContructionDeleteRequest,

  [Types.ATTRIBUTE_FLOOR_LIST_REQUEST]: attributeFloorListRequest,
  [Types.ATTRIBUTE_FLOOR_GET_REQUEST]: attributeFloorGetRequest,
  [Types.ATTRIBUTE_FLOOR_ADD_REQUEST]: attributeFloorAddRequest,
  [Types.ATTRIBUTE_FLOOR_EDIT_REQUEST]: attributeFloorEditRequest,
  [Types.ATTRIBUTE_FLOOR_DELETE_REQUEST]: attributeFloorDeleteRequest,

  [Types.ATTRIBUTE_STYLE_LIST_REQUEST]: attributeStyleListRequest,
  [Types.ATTRIBUTE_STYLE_GET_REQUEST]: attributeStyleGetRequest,
  [Types.ATTRIBUTE_STYLE_ADD_REQUEST]: attributeStyleAddRequest,
  [Types.ATTRIBUTE_STYLE_EDIT_REQUEST]: attributeStyleEditRequest,
  [Types.ATTRIBUTE_STYLE_DELETE_REQUEST]: attributeStyleDeleteRequest,

  [Types.ATTRIBUTE_HOUSE_INCOME_LIST_REQUEST]: attributeHouseIncomeListRequest,
  [Types.ATTRIBUTE_HOUSE_INCOME_GET_REQUEST]: attributeHouseIncomeGetRequest,
  [Types.ATTRIBUTE_HOUSE_INCOME_ADD_REQUEST]: attributeHouseIncomeAddRequest,
  [Types.ATTRIBUTE_HOUSE_INCOME_EDIT_REQUEST]: attributeHouseIncomeEditRequest,
  [Types.ATTRIBUTE_HOUSE_INCOME_DELETE_REQUEST]: attributeHouseIncomeDeleteRequest,

  [Types.ATTRIBUTE_HOUSE_SIZE_LIST_REQUEST]: attributeHouseSizeListRequest,
  [Types.ATTRIBUTE_HOUSE_SIZE_GET_REQUEST]: attributeHouseSizeGetRequest,
  [Types.ATTRIBUTE_HOUSE_SIZE_ADD_REQUEST]: attributeHouseSizeAddRequest,
  [Types.ATTRIBUTE_HOUSE_SIZE_EDIT_REQUEST]: attributeHouseSizeEditRequest,
  [Types.ATTRIBUTE_HOUSE_SIZE_DELETE_REQUEST]: attributeHouseSizeDeleteRequest,

  [Types.ATTRIBUTE_PRICE_LIST_REQUEST]: attributePriceListRequest,
  [Types.ATTRIBUTE_PRICE_GET_REQUEST]: attributePriceGetRequest,
  [Types.ATTRIBUTE_PRICE_ADD_REQUEST]: attributePriceAddRequest,
  [Types.ATTRIBUTE_PRICE_EDIT_REQUEST]: attributePriceEditRequest,
  [Types.ATTRIBUTE_PRICE_DELETE_REQUEST]: attributePriceDeleteRequest,

  [Types.ATTRIBUTE_SUCCESS]: attributeSuccess,
  [Types.ATTRIBUTE_FAILURE]: attributeFailure
})
