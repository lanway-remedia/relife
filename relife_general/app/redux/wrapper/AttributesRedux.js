/**
 * @author HaPV
 * Task Confirmation
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  attributeContructionListRequest: ['data'],

  attributeFloorListRequest: ['data'],

  attributeStyleListRequest: ['data'],

  attributeHouseIncomeListRequest: ['data'],

  attributeHouseSizeListRequest: ['data'],

  attributePriceListRequest: ['data'],

  attributeCommitmentListRequest: ['data'],

  mostKeywordListRequest: ['data'],

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


export const attributeFloorListRequest = state => {
  return { ...state, processing: true }
}

export const attributeStyleListRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseIncomeListRequest = state => {
  return { ...state, processing: true }
}

export const attributeHouseSizeListRequest = state => {
  return { ...state, processing: true }
}

export const attributePriceListRequest = state => {
  return { ...state, processing: true }
}

export const attributeCommitmentListRequest = state => {
  return { ...state, processing: true }
}

export const mostKeywordListRequest = state => {
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

  [Types.ATTRIBUTE_FLOOR_LIST_REQUEST]: attributeFloorListRequest,

  [Types.ATTRIBUTE_STYLE_LIST_REQUEST]: attributeStyleListRequest,

  [Types.ATTRIBUTE_HOUSE_INCOME_LIST_REQUEST]: attributeHouseIncomeListRequest,

  [Types.ATTRIBUTE_HOUSE_SIZE_LIST_REQUEST]: attributeHouseSizeListRequest,

  [Types.ATTRIBUTE_PRICE_LIST_REQUEST]: attributePriceListRequest,

  [Types.ATTRIBUTE_COMMITMENT_LIST_REQUEST]: attributeCommitmentListRequest,

  [Types.MOST_KEYWORD_LIST_REQUEST]: mostKeywordListRequest,

  [Types.ATTRIBUTE_SUCCESS]: attributeSuccess,
  [Types.ATTRIBUTE_FAILURE]: attributeFailure
})
