/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { outletStoresService } from '../../services'
import OutletStoresActions from '../../redux/wrapper/OutletStoresRedux'

const OutletStoresSagas = {
  *listStore({ data }) {
    try {
      let response = yield call(outletStoresService.listStore, data)
      yield put(
        OutletStoresActions.outletStoreListSuccess(
          response.data,
          (response.data.isGetStoreList = true)
        )
      )
    } catch (err) {
      yield put(OutletStoresActions.outletStoreListFailure(err))
    }
  },
  *addStore({ data }) {
    try {
      let response = yield call(outletStoresService.addStore, data)
      yield put(
        OutletStoresActions.outletStoreAddSuccess(
          response.data,
          (response.data.isAddStore = true)
        )
      )
    } catch (err) {
      yield put(OutletStoresActions.outletStoreAddFailure(err))
    }
  },
  *deleteStore({ data }) {
    try {
      let response = yield call(outletStoresService.deleteStore, data)
      yield put(
        OutletStoresActions.outletStoreDeleteSuccess(
          response.data,
          (response.data.isDeleteStore = true)
        )
      )
    } catch (err) {
      yield put(OutletStoresActions.outletStoreDeleteFailure(err))
    }
  }
}

export default OutletStoresSagas
