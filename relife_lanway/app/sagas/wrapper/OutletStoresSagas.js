/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { outletStoresService } from '../../services'
import OutletStoresActions from '../../redux/wrapper/OutletStoresRedux'

const OutletStoresSagas = {
  *listUser({ data }) {
    try {
      let response = yield call(outletStoresService.listStore, data)
      yield put(OutletStoresActions.outletStoreListSuccess(response.data))
    } catch (err) {
      yield put(OutletStoresActions.outletStoreListFailure(err))
    }
  }
}

export default OutletStoresSagas
