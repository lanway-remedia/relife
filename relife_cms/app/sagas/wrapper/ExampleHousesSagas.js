/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { exampleHousesService } from '../../services'
import ExampleHouseActions from '../../redux/wrapper/ExampleHousesRedux'

const ExampleHousesSagas = {
  *getHouseList({ data }) {
    try {
      let response = yield call(exampleHousesService.getHouseList, data)
      yield put(
        ExampleHouseActions.exampleHouseSuccess(
          response.data,
          (response.data.isGetHouseList = true)
        )
      )
    } catch (err) {
      yield put(ExampleHouseActions.exampleHouseFailure(err))
    }
  },
  *getHouseById({ data }) {
    try {
      let response = yield call(exampleHousesService.getHouseById, data)
      yield put(
        ExampleHouseActions.exampleHouseSuccess(
          response.data,
          (response.data.isGetHouse = true)
        )
      )
    } catch (err) {
      yield put(ExampleHouseActions.exampleHouseFailure(err))
    }
  },
  *addHouse({ data }) {
    try {
      let response = yield call(exampleHousesService.addHouse, data)
      yield put(
        ExampleHouseActions.exampleHouseSuccess(
          response.data,
          (response.data.isAddHouse = true)
        )
      )
    } catch (err) {
      yield put(ExampleHouseActions.exampleHouseFailure(err))
    }
  },
  *editHouse({ data }) {
    try {
      let response = yield call(exampleHousesService.editHouse, data)
      yield put(
        ExampleHouseActions.exampleHouseSuccess(
          response.data,
          (response.data.isEditHouse = true)
        )
      )
    } catch (err) {
      yield put(ExampleHouseActions.exampleHouseFailure(err))
    }
  },
  *deleteHouse({ data }) {
    try {
      let response = yield call(exampleHousesService.deleteHouse, data)
      yield put(
        ExampleHouseActions.exampleHouseSuccess(
          response.data,
          (response.data.isDeleteHouse = true)
        )
      )
    } catch (err) {
      yield put(ExampleHouseActions.exampleHouseFailure(err))
    }
  }
}

export default ExampleHousesSagas
