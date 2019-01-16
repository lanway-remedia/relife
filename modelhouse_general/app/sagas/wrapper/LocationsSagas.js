/**
 * @author HaPV
 */

import { put, call } from 'redux-saga/effects'

import { locationsService } from '../../services'
import LocationActions from '../../redux/wrapper/LocationsRedux'

const LocationsSagas = {
  *listLocation({ data }) {
    try {
      let response = yield call(locationsService.listLocation, data)
      yield put(
        LocationActions.locationSuccess(
          response.data,
          (response.data.isGetListLocation = true)
        )
      )
    } catch (err) {
      yield put(LocationActions.locationFailure(err))
    }
  },
  *getLocation({ data }) {
    try {
      let response = yield call(locationsService.getLocation, data)
      response.data.listLocation = true
      yield put(LocationActions.locationSuccess(response.data))
    } catch (err) {
      yield put(LocationActions.locationFailure(err))
    }
  },
  *addLocation({ data }) {
    try {
      let response = yield call(locationsService.addLocation, data)
      yield put(
        LocationActions.locationSuccess(
          response.data,
          (response.data.isAdd = true)
        )
      )
    } catch (err) {
      yield put(LocationActions.locationFailure(err))
    }
  },
  *editLocation({ data }) {
    try {
      let response = yield call(locationsService.editLocation, data)
      yield put(
        LocationActions.locationSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(LocationActions.locationFailure(err))
    }
  },
  *deleteLocation({ data }) {
    try {
      let response = yield call(locationsService.deleteLocation, data)
      yield put(
        LocationActions.locationSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(LocationActions.locationFailure(err))
    }
  }
}

export default LocationsSagas
