/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { attributesService } from '../../services'
import AttributeActions from '../../redux/wrapper/AttributesRedux'

const AttributesSagas = {
  *listContruction({ data }) {
    try {
      let response = yield call(attributesService.listContruction, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetListConstrution = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listFloor({ data }) {
    try {
      let response = yield call(attributesService.listFloor, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetListFloor = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listPrice({ data }) {
    try {
      let response = yield call(attributesService.listPrice, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetListPrice = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listStyle({ data }) {
    try {
      let response = yield call(attributesService.listStyle, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetListStyle = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listHouseIncome({ data }) {
    try {
      let response = yield call(attributesService.listHouseIncome, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetListHouseIncome = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listHouseSize({ data }) {
    try {
      let response = yield call(attributesService.listHouseSize, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetListHouseSize = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listMostKeywordSearch({ data }) {
    try {
      let response = yield call(attributesService.listKeyword, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetKeyword = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  }
}

export default AttributesSagas
