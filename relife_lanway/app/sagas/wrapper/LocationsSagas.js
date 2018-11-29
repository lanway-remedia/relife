/**
 * @author HaPV
 */

import { put, call } from 'redux-saga/effects'

import { locationsService } from '../../services'
import LocationActions from '../../redux/wrapper/LocationsRedux'

const LocationsSagas = {
  *getLocation({ data }) {
    try {
      let response = yield call(locationsService.getLocation, data)
      response.data.listLocation = true
      yield put(LocationActions.locationsSuccess(response.data))
    } catch (err) {
      yield put(LocationActions.locationsFailure(err))
    }
  }
}

export default LocationsSagas
