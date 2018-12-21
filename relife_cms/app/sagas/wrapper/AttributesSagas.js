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
          (response.data.isGetListContruction = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getContruction({ data }) {
    try {
      let response = yield call(attributesService.getContruction, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetIdContruction = true)
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
  *getFloor({ data }) {
    try {
      let response = yield call(attributesService.getFloor, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetIdFloor = true)
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
  *getPrice({ data }) {
    try {
      let response = yield call(attributesService.getPrice, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetIdPrice = true)
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
  *getStyle({ data }) {
    try {
      let response = yield call(attributesService.getStyle, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetIdStyle = true)
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
          (response.data.isGetListHI = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getHouseIncome({ data }) {
    try {
      let response = yield call(attributesService.getHouseIncome, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetIdHI = true)
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
          (response.data.isGetListHS = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getHouseSize({ data }) {
    try {
      let response = yield call(attributesService.getHouseSize, data)
      yield put(
        AttributeActions.attributeSuccess(
          response.data,
          (response.data.isGetIdHS = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  }
}

export default AttributesSagas
